# 📚 Руководство по системе профиля и избранного

## 🎯 Обзор

Система профиля пользователя включает:
- ✅ Полный профиль пользователя с информацией об аккаунте
- ✅ Редактирование профиля (имя, телефон, локацию, описание)
- ✅ Управление избранными университетами
- ✅ Автоматическое сохранение данных в MongoDB

## 📋 API эндпоинты

### Получение профиля
```
GET /api/auth/profile
Authorization: Bearer <token>
```

**Ответ:**
```json
{
  "_id": "65xyz",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+7 (xxx) xxx-xx-xx",
  "bio": "Люблю учиться",
  "location": "Москва",
  "picture": "https://...",
  "provider": "google",
  "createdAt": "2024-03-30T..."
}
```

### Обновление профиля
```
PUT /api/auth/profile/update
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Doe",
  "phone": "+7 (999) 999-99-99",
  "bio": "Студентка",
  "location": "СПб"
}
```

### Добавление в избранное
```
POST /api/auth/favorites/add
Authorization: Bearer <token>
Content-Type: application/json

{
  "universityId": "msu-2024",
  "universityName": "МГУ им. М.В. Ломоносова",
  "universityLink": "https://www.msu.ru/",
  "city": "Москва"
}
```

### Получение списка избранного
```
GET /api/auth/favorites
Authorization: Bearer <token>
```

**Ответ:**
```json
[
  {
    "universityId": "msu-2024",
    "universityName": "МГУ им. М.В. Ломоносова",
    "universityLink": "https://www.msu.ru/",
    "city": "Москва",
    "addedAt": "2024-03-30T..."
  }
]
```

### Удаление из избранного
```
DELETE /api/auth/favorites/:universityId
Authorization: Bearer <token>
```

## 📄 Использование Favorites.js

Файл `favorites.js` предоставляет упрощенный API для работы с избранным.

### Добавление в избранное

```javascript
// Импортируйте файл на страницу
<script src="favorites.js"></script>

// Используйте функцию
async function toggleFavorite(universityId, universityName, universityLink, city) {
  const isFav = await isFavorited(universityId);

  if (isFav) {
    await removeFromFavorites(universityId);
  } else {
    await addToFavorites(universityId, universityName, universityLink, city);
  }
}
```

### HTML кнопка

```html
<button 
  id="favBtn" 
  class="btn-favorite"
  onclick="toggleFavorite('uni-id', 'Название', 'https://...', 'Город')"
>
  ☆ Добавить в избранное
</button>
```

### JavaScript инициализация

```javascript
window.addEventListener('load', async () => {
  const button = document.getElementById('favBtn');
  const universityId = 'uni-id';
  const isFav = await isFavorited(universityId);

  if (isFav) {
    button.textContent = '⭐ В избранном';
    button.classList.add('favorited');
  }
});
```

## 🎨 CSS для кнопки избранного

```css
.btn-favorite {
  padding: 12px 30px;
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s;
}

.btn-favorite:hover {
  background: #667eea;
  color: white;
}

.btn-favorite.favorited {
  background: #667eea;
  color: white;
}
```

## 🔄 Поток данных

### Регистрация → Профиль → Добавление в избранное → Просмотр/Удаление

```
1. Пользователь зарегистрируется на register.html
   ↓
2. Получает JWT токен и сохраняется в localStorage
   ↓
3. Редирект на profile.html
   ↓
4. Profile.html загружает данные через /api/auth/profile
   ↓
5. Пользователь может добавлять университеты в избранное
   ↓
6. Данные сохраняются в MongoDB в массиве favorites
   ↓
7. Пользователь может просматривать и удалять избранное
```

## 🗄️ Структура базы данных

### Коллекция Users

```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  password: String (hashed),
  bio: String,
  location: String,
  googleId: String,
  picture: String,
  provider: "local" | "google",
  
  favorites: [
    {
      universityId: String,
      universityName: String,
      universityLink: String,
      city: String,
      addedAt: Date
    }
  ],
  
  createdAt: Date,
  updatedAt: Date
}
```

## 📱 Функции на странице профиля

### 1. Просмотр профиля (вкладка "Профиль")
- Отображает информацию о пользователе
- Количество избранного
- Дату присоединения
- Тип аутентификации (Email/Google)

### 2. Редактирование профиля (вкладка "Редактирование")
- Изменение имени
- Изменение телефона
- Добавление биографии
- Указание локации

### 3. Управление избранным (вкладка "Избранное")
- Просмотр всех добавленных университетов
- Переход на страницу университета
- Удаление из избранного

## 🔐 Безопасность

- ✅ Все операции с профилем требуют валидный JWT токен
- ✅ Пароли хешируются bcryptjs
- ✅ Данные валидируются на сервере
- ✅ CORS защита от других доменов
- ✅ Rate limiting на API

## 🧪 Тестирование

### 1. Проверьте регистрацию
- Откройте `register.html`
- Заполните форму и зарегистрируйтесь
- Должны быть редирект на `profile.html`

### 2. Проверьте Google OAuth
- Нажмите "Sign in with Google"
- Авторизуйтесь через Google
- Должны быть редирект на `profile.html`

### 3. Проверьте редактирование профиля
- На странице профиля перейдите на "Редактирование"
- Измените данные (имя, телефон, локация, биография)
- Нажмите "Сохранить"
- Обновите страницу - данные должны остаться

### 4. Проверьте избранное
- Откройте `university-example.html`
- Нажмите кнопку "Добавить в избранное"
- Кнопка должна измениться на "⭐ В избранном"
- На профиле должно отобразиться в разделе "Избранное"

## 📝 Примеры кода

### Добавить университет на любую страницу

```html
<button onclick="addToFavorites('univ-id', 'Название ВУЗ', 'https://univ.ru', 'Москва')">
  Добавить в избранное
</button>

<script src="favorites.js"></script>
```

### Получить список избранного в JavaScript

```javascript
const favorites = await getFavorites();
console.log(favorites);

// Результат:
// [
//   { universityId: 'msu', universityName: 'МГУ', ... },
//   { universityId: 'spbu', universityName: 'СПбГУ', ... }
// ]
```

### Проверить, находится ли в избранном

```javascript
const isFav = await isFavorited('msu-2024');
console.log(isFav); // true или false
```

## 🚀 Интеграция в проект

### Для новых страниц университетов

1. Добавьте скрипт:
```html
<script src="favorites.js"></script>
```

2. Добавьте кнопку:
```html
<button id="favBtn" onclick="toggleFavorite('uni-id', 'Название', 'link', 'Город')">
  Добавить в избранное
</button>
```

3. Инициализируйте при загрузке:
```javascript
window.addEventListener('load', async () => {
  const isFav = await isFavorited('uni-id');
  if (isFav) {
    document.getElementById('favBtn').classList.add('favorited');
  }
});
```

## 🐛 Отладка

### Проверьте localStorage
```javascript
const user = JSON.parse(localStorage.getItem('user'));
const token = localStorage.getItem('token');
console.log('User:', user);
console.log('Token:', token);
```

### Проверьте MongoDB
```bash
# Подключитесь к mongosh
mongosh

# Выберите БД
use universeDB

# Посмотрите пользователей
db.users.find({}).pretty()

# Посмотрите избранное конкретного пользователя
db.users.findOne({ email: 'user@example.com' }, { favorites: 1 })
```

### Проверьте консоль браузера
```javascript
// F12 → Console

// Проверьте сетевые запросы
// F12 → Network → смотрите /api/auth запросы

// Проверьте ошибки
// Ищите красные ошибки в Console
```

## 📊 Статистика и метрики

На профиле отображается:
- 🔢 Количество избранных ВУЗов
- 📅 Год присоединения (из createdAt)
- 👤 Информация об аккаунте
- 🔐 Тип аутентификации

## ✨ Особенности

1. **Полная синхронизация** - данные сохраняются в MongoDB
2. **Быстрая загрузка** - кэширование в localStorage
3. **Адаптивный дизайн** - работает на всех устройствах
4. **Интуитивный UI** - понятная навигация и управление
5. **Безопасность** - JWT токены и валидация

## 🎓 Обучение

Для лучшего понимания системы:

1. Изучите структуру `profile.html`
2. Просмотрите функции в `favorites.js`
3. Проверьте маршруты в `/routes/auth.js`
4. Изучите модель `User.js`
5. Тестируйте функции в консоли браузера

## 📞 Поддержка

Если возникают проблемы:

1. Проверьте консоль браузера (F12)
2. Проверьте логи сервера (`npm run dev`)
3. Убедитесь, что MongoDB запущена
4. Проверьте переменные окружения в `.env`
5. Очистите localStorage: `localStorage.clear()`

Успешной работы! 🚀
