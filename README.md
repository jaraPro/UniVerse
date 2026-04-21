# University Selection Platform - Google OAuth & JWT Authentication Setup

## 📋 Краткое описание

Это веб-приложение для выбора университетов с полной интеграцией Google OAuth и JWT аутентификацией.

## 🚀 Требования

- Node.js >= 14.0.0
- MongoDB >= 4.0
- npm или yarn

## 📦 Установка

### 1. Установите зависимости
```bash
npm install
```

### 2. Настройте Google OAuth

#### На Google Cloud Console:

1. Перейдите на [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Создайте новый проект или выберите существующий
3. Перейдите в "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
4. Выберите "Web application"
5. Добавьте "Authorized JavaScript origins":
   - `http://localhost:5000`
   - `http://localhost:3000`
   - Ваш домен в production
6. Добавьте "Authorized Redirect URIs":
   - `http://localhost:5000/` (или ваш URL)
7. Скопируйте Client ID
8. Обновите `GOOGLE_CLIENT_ID` в файле `.env`

### 3. Настройте переменные окружения

Создайте или отредактируйте `.env` файл:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/universeDB
JWT_SECRET=ваш_секретный_ключ_минимум_32_символа
GOOGLE_CLIENT_ID=ваш_google_client_id
CORS_ORIGIN=http://localhost:3000,http://localhost:5000
NODE_ENV=development
```

### 4. Убедитесь, что MongoDB запущена

```bash
# На macOS с Homebrew
brew services start mongodb-community

# Или запустите MongoDB вручную
mongod
```

## 🎯 Запуск приложения

### Режим разработки (с автоперезагрузкой):
```bash
npm run dev
```

### Обычный запуск:
```bash
npm start
```

Сервер запустится на `http://localhost:5000`

## 📝 API Endpoints

### POST /api/auth/register
Регистрация с email/телефоном и паролем. После регистрации отправляется код подтверждения на email или SMS.
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+7 701 123 4567",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "message": "Пользователь создан, код отправлен для проверки",
  "verificationRequired": true,
  "emailSent": true,
  "smsSent": true,
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+7 701 123 4567"
  }
}
```

### POST /api/auth/verify-code
Подтверждение кода при регистрации/восстановлении. Возвращает JWT при успехе.
```json
{
  "email": "john@example.com",
  "code": "123456"
}
```

**Response:**
```json
{
  "message": "Проверка прошла успешно",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+7 701 123 4567"
  }
}
```

### POST /api/auth/resend-code
Повторная отправка кода подтверждения.
```json
{
  "email": "john@example.com"
}
```

**Response:**
```json
{ "message": "Код отправлен повторно" }
```

### POST /api/auth/login  
Вход с email/телефоном и паролем
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```


### POST /api/auth/login  
Вход с email и паролем
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:** (То же, что при регистрации)

### POST /api/auth/google
Google OAuth аутентификация
```json
{
  "idToken": "google_id_token_from_client"
}
```

**Response:** (То же, что при регистрации)

### GET /api/auth/profile
Получить профиль пользователя (требует Authorization header)

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "picture": "https://...",
  "provider": "google",
  "isEmailVerified": true,
  "createdAt": "2024-03-30T...",
  "updatedAt": "2024-03-30T..."
}
```

### POST /api/auth/logout
Выход из системы
```json
{
  "message": "Вы вышли из аккаунта"
}
```

## 🔐 Безопасность

- ✅ Хеширование паролей bcryptjs
- ✅ JWT токены с истечением (7 дней)
- ✅ CORS protection
- ✅ Rate limiting (10 попыток входа за 15 минут)
- ✅ XSS и NoSQL injection protection
- ✅ Security headers (Helmet.js)
- ✅ Валидация данных (express-validator)

## 📁 Структура проекта

```
.
├── server.js                 # Main server file
├── config.js                # Google Client ID configuration
├── .env                      # Environment variables
├── .env.example              # Example environment variables
├── package.json              # Dependencies
├── models/
│   └── User.js              # User database schema
├── routes/
│   └── auth.js              # Authentication routes
├── middleware/
│   └── authMiddleware.js     # JWT verification middleware
├── login.html               # Login page with Google OAuth
├── register.html            # Registration page with Google OAuth
└── ... (other HTML files)
```

## 🐛 Решение проблем

### Ошибка: "Google OAuth callback error"
- Убедитесь, что GOOGLE_CLIENT_ID установлен в .env и в login.html/register.html
- Проверьте, что ваш домен добавлен в Google Console Authorized JavaScript origins

### Ошибка: "MongoDB connection error"
- Убедитесь, что MongoDB запущена: `mongod`
- Проверьте MONGO_URI в .env файле
- Проверьте, что база данных доступна

### Ошибка: "Слишком много попыток входа"
- Это нормально! Rate limiting срабатывает после 10 неудачных попыток за 15 минут
- Подождите 15 минут или перезагрузите приложение

### CORS ошибки
- Проверьте CORS_ORIGIN в .env файле
- Убедитесь, что ваш фронтенд URL добавлен в список разрешённых origins

## 🔑 JWT Token - Как использовать

При входе/регистрации вы получите JWT token. Используйте его для защищённых запросов:

```javascript
const token = localStorage.getItem('token');

fetch('http://localhost:5000/api/auth/profile', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(res => res.json())
.then(data => console.log(data));
```

## 📱 Frontend Integration

### Для login.html/register.html:
1. Google Sign-In инициализируется автоматически через callback функции
2. Токен сохраняется в localStorage при успешной аутентификации
3. Пользователь перенаправляется на dashboard.html

### Для защиты маршрутов на фронте:
```javascript
function checkAuth() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'login.html';
  }
}

// Вызовите в начале защищённой страницы
window.addEventListener('load', checkAuth);
```

## 📊 Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String (optional),
  password: String (bcrypt hashed, not set for Google OAuth),
  googleId: String (set for Google OAuth),
  picture: String (Google profile picture URL),
  provider: "local" | "google",
  isEmailVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Развёртывание (Production)

1. Обновите .env:
   ```env
   NODE_ENV=production
   JWT_SECRET=очень_длинный_случайный_ключ_минимум_32_символа
   GOOGLE_CLIENT_ID=production_google_client_id
   MONGO_URI=production_mongodb_uri
   CORS_ORIGIN=ваш_домен.com
   ```

2. Используйте production веб-сервер (Nginx, Apache)

3. Используйте SSL/HTTPS

4. Обновите Google Console с production URL

5. Используйте переменные окружения для чувствительных данных

## 📞 Поддержка

Если у вас есть вопросы или проблемы, проверьте:
- Логи сервера (`npm run dev`)
- Консоль браузера (F12)
- Файл .env конфигурации
- MongoDB логи

## 📄 Лицензия

ISC
