/**
 * Утилиты для управления избранным
 * Используйте на страницах университетов
 */

const FAVORITES_API = 'http://localhost:5000/api/auth';

/**
 * Добавить университет в избранное
 * @param {string} universityId - Уникальный ID университета
 * @param {string} universityName - Название университета
 * @param {string} universityLink - Ссылка на университет (опционально)
 * @param {string} city - Город (опционально)
 */
async function addToFavorites(universityId, universityName, universityLink = '', city = '') {
  const token = localStorage.getItem('token');

  if (!token) {
    alert('Пожалуйста, войдите в аккаунт, чтобы добавить в избранное');
    window.location.href = 'login.html';
    return false;
  }

  try {
    const response = await fetch(`${FAVORITES_API}/favorites/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        universityId,
        universityName,
        universityLink,
        city
      })
    });

    const data = await response.json();

    if (response.ok) {
      alert('✅ ' + data.message);
      return true;
    } else {
      alert('❌ ' + (data.message || 'Ошибка добавления в избранное'));
      return false;
    }
  } catch (err) {
    console.error('Error adding to favorites:', err);
    alert('❌ Ошибка при добавлении в избранное');
    return false;
  }
}

/**
 * Удалить университет из избранного
 * @param {string} universityId - Уникальный ID университета
 */
async function removeFromFavorites(universityId) {
  const token = localStorage.getItem('token');

  if (!token) {
    alert('Пожалуйста, войдите в аккаунт');
    return false;
  }

  try {
    const response = await fetch(`${FAVORITES_API}/favorites/${universityId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (response.ok) {
      alert('✅ ' + data.message);
      return true;
    } else {
      alert('❌ ' + (data.message || 'Ошибка удаления'));
      return false;
    }
  } catch (err) {
    console.error('Error removing from favorites:', err);
    alert('❌ Ошибка при удалении');
    return false;
  }
}

/**
 * Получить список избранного
 */
async function getFavorites() {
  const token = localStorage.getItem('token');

  if (!token) {
    return [];
  }

  try {
    const response = await fetch(`${FAVORITES_API}/favorites`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      return await response.json();
    }
    return [];
  } catch (err) {
    console.error('Error getting favorites:', err);
    return [];
  }
}

/**
 * Проверить, находится ли университет в избранном
 * @param {string} universityId - Уникальный ID университета
 */
async function isFavorited(universityId) {
  const favorites = await getFavorites();
  return favorites.some(fav => fav.universityId === universityId);
}

/**
 * Обновить кнопку избранного на основе статуса
 * @param {string} buttonId - ID кнопки для обновления
 * @param {string} universityId - ID университета
 */
async function updateFavoriteButton(buttonId, universityId) {
  const button = document.getElementById(buttonId);
  const isFav = await isFavorited(universityId);

  if (button) {
    if (isFav) {
      button.classList.add('favorited');
      button.textContent = '⭐ В избранном';
    } else {
      button.classList.remove('favorited');
      button.textContent = '☆ Добавить в избранное';
    }
  }
}

// Пример использования:
/*

// HTML кнопка:
<button id="favBtn" onclick="toggleFavorite('univ123', 'МГУ', 'http://msu.ru', 'Москва')">
  ☆ Добавить в избранное
</button>

// JavaScript функция для toggle:
async function toggleFavorite(universityId, universityName, universityLink, city) {
  const button = event.target;
  const isFav = await isFavorited(universityId);

  if (isFav) {
    await removeFromFavorites(universityId);
    button.textContent = '☆ Добавить в избранное';
    button.classList.remove('favorited');
  } else {
    await addToFavorites(universityId, universityName, universityLink, city);
    button.textContent = '⭐ В избранном';
    button.classList.add('favorited');
  }
}

*/
