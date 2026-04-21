// Service Worker for UniVerse Pro PWA
const CACHE_NAME = 'universe-pro-v1.0.0';
const urlsToCache = [
  '/',
  '/index2.html',
  '/index5.html',
  '/profile.html',
  '/auth.js',
  '/style.css',
  '/manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Install Service Worker
self.addEventListener('install', (event) => {
  console.log('Service Worker installing.');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating.');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event - Serve from cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
      .catch(() => {
        // Return offline fallback for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match('/index2.html');
        }
      })
  );
});

// Push Notifications
self.addEventListener('push', (event) => {
  console.log('Push message received:', event);

  let data = {};
  if (event.data) {
    data = event.data.json();
  }

  const options = {
    body: data.body || 'У вас новое уведомление от UniVerse Pro!',
    icon: '/image/icon-192.png',
    badge: '/image/icon-192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: data.primaryKey || 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Посмотреть',
        icon: '/image/icon-192.png'
      },
      {
        action: 'close',
        title: 'Закрыть'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(
      data.title || 'UniVerse Pro',
      options
    )
  );
});

// Notification Click Event
self.addEventListener('notificationclick', (event) => {
  console.log('Notification click received.');

  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/index5.html')
    );
  } else {
    event.waitUntil(
      clients.openWindow('/index2.html')
    );
  }
});

// Background Sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('Background sync triggered:', event.tag);

  if (event.tag === 'background-sync-favorites') {
    event.waitUntil(syncFavorites());
  }
});

// Sync favorites when back online
async function syncFavorites() {
  try {
    const cache = await caches.open('universe-sync');
    const requests = await cache.keys();

    const syncPromises = requests.map(async (request) => {
      try {
        const response = await fetch(request);
        if (response.ok) {
          await cache.delete(request);
          console.log('Synced:', request.url);
        }
      } catch (error) {
        console.error('Sync failed for:', request.url, error);
      }
    });

    await Promise.all(syncPromises);
  } catch (error) {
    console.error('Background sync error:', error);
  }
}

// Periodic background sync for updates
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'update-universities') {
    event.waitUntil(updateUniversitiesCache());
  }
});

async function updateUniversitiesCache() {
  try {
    const cache = await caches.open(CACHE_NAME);
    // Update universities data in background
    console.log('Updating universities cache...');
    // Implementation would fetch latest university data
  } catch (error) {
    console.error('Periodic sync error:', error);
  }
}
