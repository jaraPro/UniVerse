# 🚀 Пошаговое руководство по настройке

## Шаг 1: Установите зависимости

```bash
npm install
```

Это установит все необходимые пакеты:
- express - веб-фреймворк
- mongoose - ORM для MongoDB
- google-auth-library - для проверки Google токенов
- bcryptjs - для хеширования паролей
- jsonwebtoken - для JWT токенов
- cors, helmet, rate-limit - для безопасности

## Шаг 2: Проверьте файл .env

Убедитесь, что `.env` содержит:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/universeDB
JWT_SECRET=supersecretkey
GOOGLE_CLIENT_ID=983371437398-lcqaf62o1d096mrfauipfj5dqar5an0u.apps.googleusercontent.com
CORS_ORIGIN=http://localhost:3000,http://localhost:5000
NODE_ENV=development
```

⚠️ **Важно**: В production измените:
- `JWT_SECRET` на очень длинный случайный ключ
- `GOOGLE_CLIENT_ID` на ваш production Client ID
- `CORS_ORIGIN` на ваш域名

## Шаг 3: Запустите MongoDB

### На macOS:
```bash
brew services start mongodb-community
```

### Или вручную:
```bash
mongod
```

Проверьте, что MongoDB запущена на порту 27017

## Шаг 4: Запустите сервер

```bash
npm run dev
```

Вы должны увидеть в консоли:
```
MongoDB connected
Server started on port 5000
```

## Шаг 5: Откройте приложение в браузере

Перейдите на:
- **Регистрация**: http://localhost:5000/register.html
- **Вход**: http://localhost:5000/login.html

## 📝 Функции, которые теперь работают

### ✅ Регистрация с email и паролем
1. Заполните форму на `/register.html`
2. Нажмите "Зарегистрироваться"
3. Данные отправятся на `/api/auth/register`
4. Пароль хешируется с помощью bcryptjs
5. JWT токен создаётся и сохраняется в localStorage
6. Автоматический редирект на dashboard.html

### ✅ Вход с email и паролем
1. Заполните форму на `/login.html`
2. Нажмите "Войти"
3. Система проверяет email и пароль
4. JWT токен сохраняется в localStorage
5. Редирект на dashboard.html

### ✅ Google OAuth
1. Нажмите "Sign in with Google"
2. Всплывающее окно Google логина
3. После согласия отправляется `idToken`
4. Система проверяет токен с помощью google-auth-library
5. Пользователь создаётся или обновляется в БД
6. JWT токен создаётся
7. Редирект на dashboard.html

### ✅ Безопасность
- Все пароли хешируются
- JWT токены имеют срок действия 7 дней
- Rate limiting: максимум 10 попыток входа за 15 минут
- CORS защита от посторонних доменов
- XSS и NoSQL injection protection

## 🔧 Проверка что всё работает

### 1. Проверьте MongoDB
```bash
mongo
> use universeDB
> db.users.find()
```

### 2. Проверьте регистрацию
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "testpassword123"
  }'
```

### 3. Проверьте вход
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpassword123"
  }'
```

## ❌ Решение проблем

### "Cannot find module 'express'"
```bash
npm install
```

### "MongoDB connection error"
- Убедитесь, что MongoDB запущена: `mongod`
- Проверьте MONGO_URI в .env

### "Google OAuth error"
- Проверьте GOOGLE_CLIENT_ID в .env
- Убедитесь, что Google Console имеет вашу localhost в Authorized Origins

### "Port 5000 already in use"
```bash
# Найдите процесс на этом порту
lsof -i :5000
# Убейте процесс
kill -9 PID
```

## 📚 Файлы, которые были изменены/созданы

### Обновлены:
- ✅ `/routes/auth.js` - добавлена Google OAuth эндпоинт
- ✅ `/models/User.js` - добавлены googleId, picture, provider
- ✅ `/login.html` - полная переделка с Google Sign-In
- ✅ `/register.html` - полная переделка с Google Sign-In
- ✅ `/server.js` - добавлена поддержка static файлов и CORS
- ✅ `/.env` - добавлены GOOGLE_CLIENT_ID и другие переменные

### Созданы:
- ✅ `/package.json` - зависимости проекта
- ✅ `/README.md` - полная документация
- ✅ `/SETUP.md` - это руководство
- ✅ `/.env.example` - пример конфигурации

## 🎯 Следующие шаги

1. **Создайте dashboard.html** для авторизованных пользователей
2. **Создайте защиту маршрутов** на фронте с проверкой токена
3. **Добавьте профиль пользователя** с загрузкой аватара
4. **Синхронизируйте** логику с остальными страницами

## 💡 Советы для разработки

### Отладка Google OAuth
1. Откройте DevTools (F12)
2. Перейдите на Console tab
3. Проверьте localStorage:
   ```javascript
   console.log(localStorage.getItem('token'));
   console.log(localStorage.getItem('user'));
   ```

### Проверка JWT токена
```javascript
// Декодируйте токен (без проверки подписи для отладки)
const token = localStorage.getItem('token');
const decoded = JSON.parse(atob(token.split('.')[1]));
console.log(decoded);
```

### Очистка данных
```javascript
// Очистить localStorage
localStorage.clear();

// Или селективно
localStorage.removeItem('token');
localStorage.removeItem('user');
```

## 🚀 Production Deployment

Перед развёртыванием в production:

1. Изменитеелось `JWT_SECRET` на сложный ключ (минимум 32 символа)
2. Обновите `NODE_ENV` на `production`
3. Используйте production MongoDB (Atlas, etc)
4. Обновите Google Console с production URL
5. Используйте HTTPS (обязательно для Google OAuth)
6. Используйте переменные окружения на сервере

Пример для Heroku:
```bash
heroku config:set JWT_SECRET="очень_длинный_ключ"
heroku config:set GOOGLE_CLIENT_ID="production_id"
heroku config:set MONGO_URI="production_mongo_uri"
```
