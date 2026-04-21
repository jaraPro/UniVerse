require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const path = require('path');
const fs = require('fs');
const QRCode = require('qrcode');
const jwt = require('jsonwebtoken');

const {
  grantSubscription,
  hasSubscription,
  listPayments,
  listActiveSubscriptions,
} = require('./utils/subscriptionStore');
const { authenticateToken } = require('./backend/middleware/auth');
const User = require('./backend/models/User');

const app = express();
const APP_BASE_URL = process.env.APP_BASE_URL || 'http://localhost:5000';

function isPlaceholderValue(value) {
  if (!value || typeof value !== 'string') {
    return true;
  }
  return value.includes('REPLACE_WITH') || value.includes('xxxxxxxx') || value.includes('change_me');
}

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || '';
const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY || '';
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_REPLACE_WITH_YOUR_WEBHOOK_SECRET';

const KASPI_PAYMENT_LINK = process.env.KASPI_PAYMENT_LINK || '';
const KASPI_PHONE = process.env.KASPI_PHONE || '';
const KASPI_MERCHANT_NAME = process.env.KASPI_MERCHANT_NAME || '';
const KASPI_QR_IMAGE_URL = process.env.KASPI_QR_IMAGE_URL || '';

const stripeKeysConfigured = !isPlaceholderValue(STRIPE_SECRET_KEY) && !isPlaceholderValue(STRIPE_PUBLISHABLE_KEY);

let stripe = null;
if (stripeKeysConfigured) {
  stripe = require('stripe')(STRIPE_SECRET_KEY);
} else {
  console.warn('WARNING: Stripe keys are not configured. Set STRIPE_PUBLISHABLE_KEY and STRIPE_SECRET_KEY in .env');
}

// Для правильной работы хидера в продакшн через прокси (например, Heroku/Nginx)
app.set('trust proxy', 1);

// Безопасные заголовки
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://accounts.google.com", "https://js.stripe.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
      imgSrc: ["'self'", "data:", "https:", "https://lh3.googleusercontent.com"],
      connectSrc: ["'self'", "https://accounts.google.com", "https://api.stripe.com", "https://r.stripe.com"],
      frameSrc: ["https://accounts.google.com", "https://js.stripe.com", "https://hooks.stripe.com"]
    }
  },
  hsts: {
    maxAge: 63072000,
    includeSubDomains: true,
    preload: true
  }
}));

// Предупреждение для разработки о секретах
if (!process.env.JWT_SECRET) {
  console.warn('WARNING: JWT_SECRET не задан, используется fallback. Установите переменную окружения для безопасности.');
}

// Заголовки дополнительной защиты
app.use((req, res, next) => {
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('Permissions-Policy', 'geolocation=(), camera=()');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});

function safePathInput(value) {
  return typeof value === 'string' && value.startsWith('/univer/') && value.endsWith('.html');
}

function safeUniversityId(value) {
  return typeof value === 'string' && /^[\w\-/ .]+$/i.test(value) && value.startsWith('univer/') && value.endsWith('1');
}

function safeClientId(value) {
  return typeof value === 'string' && /^[a-zA-Z0-9_-]{6,120}$/.test(value);
}

async function optionalAuthenticateToken(req, _res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    if (!authHeader.startsWith('Bearer ')) {
      return next();
    }

    const token = authHeader.slice('Bearer '.length);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (user) {
      req.user = user;
    }
  } catch (_error) {
    // Guest flow is allowed, ignore auth parse failures.
  }

  return next();
}

function resolveOwnerId(req, clientId) {
  if (req.user?._id) {
    return `user:${String(req.user._id)}`;
  }
  if (safeClientId(clientId)) {
    return `guest:${clientId}`;
  }
  return null;
}

function stripeReady(req, res, next) {
  if (!stripe) {
    return res.status(500).json({
      error: 'Stripe не настроен. Добавьте реальные STRIPE_PUBLISHABLE_KEY и STRIPE_SECRET_KEY в .env',
      code: 'stripe_not_configured',
    });
  }
  return next();
}

const adminEmails = (process.env.ADMIN_EMAILS || '')
  .split(',')
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

function requireAdmin(req, res, next) {
  const userEmail = (req.user?.email || '').trim().toLowerCase();
  if (!userEmail || !adminEmails.includes(userEmail)) {
    return res.status(403).json({ error: 'Admin access required' });
  }
  return next();
}

// Webhook использует raw body, поэтому должен быть объявлен до express.json().
app.post('/api/payments/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  if (!stripe || isPlaceholderValue(STRIPE_WEBHOOK_SECRET)) {
    return res.status(200).json({
      received: true,
      ignored: true,
      reason: 'webhook_not_configured',
    });
  }

  const signature = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, signature, STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    console.error('Stripe webhook signature error:', error.message);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const metadata = session.metadata || {};

    if (session.payment_status === 'paid' && metadata.ownerId && metadata.universityId) {
      grantSubscription(
        {
          id: metadata.ownerId,
          email: metadata.userEmail,
        },
        metadata.universityId,
        {
        provider: 'stripe',
        paymentFlow: metadata.paymentFlow || 'card',
        visaType: metadata.visaType || 'us',
        sessionId: session.id,
        }
      );
    }
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    const metadata = paymentIntent.metadata || {};

    if (metadata.ownerId && metadata.universityId) {
      grantSubscription(
        {
          id: metadata.ownerId,
          email: metadata.userEmail,
        },
        metadata.universityId,
        {
          provider: 'stripe',
          paymentFlow: metadata.paymentFlow || 'card',
          visaType: metadata.visaType || 'us',
          paymentIntentId: paymentIntent.id,
        }
      );
    }
  }

  return res.json({ received: true });
});

// Включаем CORS явно, ограничивая домены
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:3000,http://localhost:5000').split(',');
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.get('/api/payments/config', (req, res) => {
  return res.json({
    publishableKey: stripeKeysConfigured ? STRIPE_PUBLISHABLE_KEY : '',
    configured: stripeKeysConfigured,
    webhookConfigured: !isPlaceholderValue(STRIPE_WEBHOOK_SECRET),
  });
});

app.get('/api/payments/kaspi-config', (req, res) => {
  return res.json({
    configured: Boolean(KASPI_PAYMENT_LINK || KASPI_QR_IMAGE_URL || KASPI_PHONE),
    merchantName: KASPI_MERCHANT_NAME,
    phone: KASPI_PHONE,
    paymentLink: KASPI_PAYMENT_LINK,
    qrImageUrl: KASPI_QR_IMAGE_URL,
  });
});

app.post('/api/payments/create-checkout-session', optionalAuthenticateToken, stripeReady, async (req, res) => {
  try {
    const {
      universityId,
      premiumPath,
      previewPath,
      paymentFlow,
      visaType,
      clientId,
      cardLast4,
    } = req.body || {};

    if (!safeUniversityId(universityId) || !safePathInput(premiumPath) || !safePathInput(previewPath)) {
      return res.status(400).json({ error: 'Некорректные параметры оплаты' });
    }

    const ownerId = resolveOwnerId(req, clientId);
    if (!ownerId) {
      return res.status(400).json({ error: 'Нужен clientId или авторизация' });
    }

    const query = new URLSearchParams({
      universityId,
      premiumPath,
      previewPath,
    }).toString();

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            unit_amount: 100,
            product_data: {
              name: `FindU2 subscription: ${universityId}`,
              description: 'Доступ к полной информации конкретного университета',
            },
          },
        },
      ],
      success_url: `${APP_BASE_URL}/payment-success.html?${query}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${APP_BASE_URL}${previewPath}`,
      metadata: {
        universityId,
        ownerId,
        userEmail: req.user?.email || '',
        premiumPath,
        previewPath,
        paymentFlow: paymentFlow === 'qr' ? 'qr' : 'card',
        visaType: visaType === 'kz' ? 'kz' : 'us',
        cardLast4: typeof cardLast4 === 'string' ? cardLast4.slice(-4) : '',
      },
    });

    let qrDataUrl = null;
    if (paymentFlow === 'qr') {
      qrDataUrl = await QRCode.toDataURL(session.url, {
        errorCorrectionLevel: 'M',
        width: 280,
      });
    }

    return res.json({
      sessionId: session.id,
      checkoutUrl: session.url,
      qrDataUrl,
    });
  } catch (error) {
    console.error('create-checkout-session error:', error);
    return res.status(500).json({ error: 'Не удалось создать платежную сессию' });
  }
});

app.post('/api/payments/create-payment-intent', optionalAuthenticateToken, stripeReady, async (req, res) => {
  try {
    const {
      universityId,
      premiumPath,
      previewPath,
      visaType,
      clientId,
    } = req.body || {};

    if (!safeUniversityId(universityId) || !safePathInput(premiumPath) || !safePathInput(previewPath)) {
      return res.status(400).json({ error: 'Некорректные параметры оплаты' });
    }

    const ownerId = resolveOwnerId(req, clientId);
    if (!ownerId) {
      return res.status(400).json({ error: 'Нужен clientId или авторизация' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 100,
      currency: 'usd',
      payment_method_types: ['card'],
      metadata: {
        ownerId,
        universityId,
        userEmail: req.user?.email || '',
        premiumPath,
        previewPath,
        paymentFlow: 'card',
        visaType: visaType === 'kz' ? 'kz' : 'us',
      },
    });

    return res.json({
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('create-payment-intent error:', error);
    return res.status(500).json({ error: 'Не удалось создать PaymentIntent' });
  }
});

app.post('/api/payments/confirm-payment-intent', optionalAuthenticateToken, stripeReady, async (req, res) => {
  try {
    const { paymentIntentId, universityId, clientId } = req.body || {};

    if (!paymentIntentId || !universityId) {
      return res.status(400).json({ error: 'Не хватает параметров подтверждения' });
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    const metadata = paymentIntent.metadata || {};
    const requesterOwnerId = resolveOwnerId(req, clientId);

    if (paymentIntent.status !== 'succeeded') {
      return res.status(402).json({ error: 'Платеж не подтвержден' });
    }

    if (metadata.universityId !== universityId || !requesterOwnerId || metadata.ownerId !== requesterOwnerId) {
      return res.status(403).json({ error: 'Платеж не принадлежит этому пользователю или странице' });
    }

    grantSubscription({ id: requesterOwnerId, email: req.user?.email || metadata.userEmail || '' }, universityId, {
      provider: 'stripe',
      paymentFlow: metadata.paymentFlow || 'card',
      visaType: metadata.visaType || 'us',
      paymentIntentId: paymentIntent.id,
    });

    return res.json({ success: true });
  } catch (error) {
    console.error('confirm-payment-intent error:', error);
    return res.status(500).json({ error: 'Не удалось подтвердить PaymentIntent' });
  }
});

app.get('/api/payments/session-status', optionalAuthenticateToken, stripeReady, async (req, res) => {
  try {
    const sessionId = req.query.sessionId;
    const clientId = req.query.clientId;
    if (!sessionId) {
      return res.status(400).json({ error: 'sessionId обязателен' });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const paid = session.payment_status === 'paid';
    const metadata = session.metadata || {};
    const requesterOwnerId = resolveOwnerId(req, clientId);

    if (paid) {
      if (!requesterOwnerId || metadata.ownerId !== requesterOwnerId) {
        return res.status(403).json({ error: 'Платеж не принадлежит текущему пользователю' });
      }

      if (metadata.ownerId && metadata.universityId) {
        grantSubscription(
          {
            id: metadata.ownerId,
            email: metadata.userEmail,
          },
          metadata.universityId,
          {
          provider: 'stripe',
          paymentFlow: metadata.paymentFlow || 'card',
          visaType: metadata.visaType || 'us',
          sessionId: session.id,
          }
        );
      }
    }

    return res.json({
      paid,
      status: session.status,
      paymentStatus: session.payment_status,
    });
  } catch (error) {
    console.error('session-status error:', error);
    return res.status(500).json({ error: 'Не удалось проверить статус оплаты' });
  }
});

app.post('/api/payments/confirm-session', optionalAuthenticateToken, stripeReady, async (req, res) => {
  try {
    const { sessionId, universityId, clientId } = req.body || {};
    if (!sessionId || !universityId) {
      return res.status(400).json({ error: 'Не хватает параметров подтверждения' });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const metadata = session.metadata || {};

    if (session.payment_status !== 'paid') {
      return res.status(402).json({ error: 'Платеж не подтвержден' });
    }

    const requesterOwnerId = resolveOwnerId(req, clientId);

    if (metadata.universityId !== universityId || !requesterOwnerId || metadata.ownerId !== requesterOwnerId) {
      return res.status(403).json({ error: 'Платеж не принадлежит этому пользователю или странице' });
    }

    grantSubscription({ id: requesterOwnerId, email: req.user?.email || '' }, universityId, {
      provider: 'stripe',
      paymentFlow: metadata.paymentFlow || 'card',
      visaType: metadata.visaType || 'us',
      sessionId: session.id,
    });

    return res.json({ success: true });
  } catch (error) {
    console.error('confirm-session error:', error);
    return res.status(500).json({ error: 'Не удалось подтвердить платеж' });
  }
});

app.get('/api/subscriptions/status', optionalAuthenticateToken, (req, res) => {
  const universityId = req.query.universityId;
  const clientId = req.query.clientId;

  if (!universityId) {
    return res.status(400).json({ error: 'universityId обязателен' });
  }

  const ownerId = resolveOwnerId(req, clientId);
  if (!ownerId) {
    return res.json({ active: false });
  }

  return res.json({
    active: hasSubscription(ownerId, universityId),
  });
});

app.get('/api/admin/payments', authenticateToken, requireAdmin, (req, res) => {
  const limit = Number(req.query.limit || 500);
  return res.json({ items: listPayments(limit) });
});

app.get('/api/admin/subscriptions', authenticateToken, requireAdmin, (req, res) => {
  return res.json({ items: listActiveSubscriptions() });
});

// Автоматически подключаем общий paywall-скрипт на все страницы университетов.
app.get(/^\/univer\/.*\.html$/i, (req, res, next) => {
  const universityRoot = path.join(__dirname, 'univer');
  const filePath = path.join(__dirname, decodeURIComponent(req.path));

  if (!filePath.startsWith(universityRoot)) {
    return res.status(403).send('Forbidden');
  }

  fs.readFile(filePath, 'utf8', (error, html) => {
    if (error) {
      return next();
    }

    let updated = html;
    if (!updated.includes('/subscription/paywall.js')) {
      if (updated.includes('</body>')) {
        updated = updated.replace('</body>', '<script src="/subscription/paywall.js"></script>\n</body>');
      } else {
        updated += '\n<script src="/subscription/paywall.js"></script>';
      }
    }

    return res.type('html').send(updated);
  });
});

// Служим статичные файлы (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Защита от NoSQL-инъекций
app.use(mongoSanitize());

// Защита от XSS
app.use(xssClean());

// rate limit для всех роутов
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100,
  message: 'Слишком много запросов, попробуйте позже.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/universe';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

const backendAuthRoute = path.join(__dirname, 'backend', 'routes', 'auth.js');
const rootAuthRoute = path.join(__dirname, 'routes', 'auth.js');

// Prefer backend auth routes because they issue JWTs compatible with backend/middleware/auth.
if (fs.existsSync(backendAuthRoute)) {
  app.use('/api/auth', require('./backend/routes/auth'));
} else if (fs.existsSync(rootAuthRoute)) {
  app.use('/api/auth', require('./routes/auth'));
} else {
  console.warn('WARNING: auth route not found (./routes/auth.js or ./backend/routes/auth.js).');
}

// 404 обработчик
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});