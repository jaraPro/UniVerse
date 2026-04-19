<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>UniVerse Pro - Поиск Университетов</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    :root {
      --primary: #062abb;
      --secondary: #ff6b6b;
      --dark: #1a1a2e;
      --light: #f8f9fa;
      --accent: #4ecdc4;
      --success: #2ecc71;
    }

    /* Animations */
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes slideInLeft {
      from { opacity: 0; transform: translateX(-30px); }
      to { opacity: 1; transform: translateX(0); }
    }

    @keyframes slideInRight {
      from { opacity: 0; transform: translateX(30px); }
      to { opacity: 1; transform: translateX(0); }
    }

    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }

    .fade-in {
      animation: fadeIn 0.6s ease;
    }

    .slide-in-left {
      animation: slideInLeft 0.6s ease;
    }

    .slide-in-right {
      animation: slideInRight 0.6s ease;
    }

    .card-hover {
      transition: all 0.3s ease;
    }

    .card-hover:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 35px rgba(0,0,0,0.2);
    }

    .btn-hover {
      transition: all 0.3s ease;
    }

    .btn-hover:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(6, 42, 187, 0.3);
    }

    .pulse {
      animation: pulse 2s infinite;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      color: #333;
    }

    .navbar {
      background: linear-gradient(90deg, var(--primary) 0%, #0a4bb8 100%);
      color: white;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }

    .logo {
      font-size: 1.8rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .logo i {
      color: #ffd700;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }

    .nav-center {
      flex: 1;
      display: flex;
      gap: 1.5rem;
      justify-content: center;
      margin: 0 2rem;
    }

    .nav-btn {
      background: rgba(255,255,255,0.1);
      color: white;
      border: 2px solid transparent;
      padding: 0.6rem 1.2rem;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;
      font-weight: 500;
    }

    .nav-btn:hover {
      background: white;
      color: var(--primary);
    }

    .page-tabs {
      background: rgba(255,255,255,0.12);
      backdrop-filter: blur(6px);
      padding: 0.7rem 1rem;
      display: flex;
      justify-content: center;
      gap: 0.8rem;
      flex-wrap: wrap;
      border-bottom: 1px solid rgba(255,255,255,0.25);
    }

    .page-tab {
      text-decoration: none;
      color: white;
      border: 1px solid rgba(255,255,255,0.35);
      background: rgba(255,255,255,0.08);
      padding: 0.5rem 1rem;
      border-radius: 999px;
      font-weight: 600;
      transition: all 0.25s ease;
    }

    .page-tab:hover {
      background: white;
      color: var(--primary);
    }

    .page-tab.active {
      background: white;
      color: var(--primary);
      border-color: white;
    }

    .nav-right {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      background: rgba(255,255,255,0.1);
      padding: 0.5rem 1rem;
      border-radius: 25px;
      cursor: pointer;
      transition: all 0.3s;
    }

    .user-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #ffd700;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      color: var(--primary);
    }

    .container {
      max-width: 1400px;
      margin: 2rem auto;
      padding: 0 1rem;
    }

    .search-section {
      background: white;
      padding: 2rem;
      border-radius: 15px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.15);
      margin-bottom: 2rem;
    }

    .search-title {
      font-size: 1.8rem;
      margin-bottom: 1.5rem;
      color: var(--primary);
      text-align: center;
    }

    .search-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .search-input {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .search-input label {
      font-weight: 600;
      color: #555;
      font-size: 0.9rem;
    }

    .search-input input,
    .search-input select {
      padding: 0.8rem;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.3s;
    }

    .search-input input:focus,
    .search-input select:focus {
      outline: none;
      border-color: var(--primary);
      background: #f0f7ff;
      box-shadow: 0 0 0 3px rgba(6, 42, 187, 0.1);
    }

    .search-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }

    .btn {
      padding: 0.8rem 2rem;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .btn-primary {
      background: linear-gradient(135deg, var(--primary), #0a4bb8);
      color: white;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(6, 42, 187, 0.3);
    }

    .universities-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 2rem;
      margin-bottom: 3rem;
    }

    .university-card {
      background: white;
      border-radius: 15px;
      overflow: hidden;
      box-shadow: 0 8px 20px rgba(0,0,0,0.1);
      transition: all 0.3s;
      cursor: pointer;
      display: flex;
      flex-direction: column;
    }

    .university-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 15px 40px rgba(0,0,0,0.2);
    }

    .card-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      position: relative;
    }

    .card-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      background: rgba(0,0,0,0.6);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
    }

    .card-content {
      padding: 1.5rem;
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .card-title {
      font-size: 1.3rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: var(--dark);
    }

    .card-location {
      color: #999;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      gap: 0.3rem;
      margin-bottom: 0.8rem;
    }

    .card-desc {
      color: #666;
      font-size: 0.95rem;
      margin-bottom: 1rem;
      flex: 1;
    }

    .card-detail {
      color: #4f5d75;
      font-size: 0.85rem;
      margin-bottom: 1rem;
      line-height: 1.45;
      background: #f6f8ff;
      border-left: 3px solid #c7d2fe;
      padding: 0.6rem 0.7rem;
      border-radius: 8px;
    }

    .card-detail.loading {
      color: #68758d;
      background: #f9fafc;
      border-left-color: #d6deee;
    }

    .detail-loading-row {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      font-weight: 500;
    }

    @keyframes skeletonShimmer {
      0% {
        background-position: 100% 0;
      }
      100% {
        background-position: -100% 0;
      }
    }

    .skeleton-wrap {
      display: grid;
      gap: 0.45rem;
      width: 100%;
    }

    .skeleton-line {
      height: 10px;
      border-radius: 999px;
      background: linear-gradient(90deg, #ecf1fb 25%, #dde7fa 50%, #ecf1fb 75%);
      background-size: 200% 100%;
      animation: skeletonShimmer 1.2s infinite linear;
    }

    .skeleton-line.short {
      width: 62%;
    }

    .card-meta {
      display: grid;
      gap: 0.35rem;
      margin-bottom: 1rem;
      font-size: 0.85rem;
      color: #4f5d75;
    }

    .card-meta-item {
      display: flex;
      align-items: center;
      gap: 0.45rem;
      line-height: 1.35;
    }

    .card-actions {
      display: flex;
      gap: 0.8rem;
      margin-top: auto;
    }

    .card-btn {
      flex: 1;
      padding: 0.7rem 1rem;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s;
      font-size: 0.9rem;
    }

    .btn-view {
      background: var(--primary);
      color: white;
    }

    .btn-view:hover {
      background: #0a4bb8;
    }

    .btn-favorite {
      background: #f0f0f0;
      color: #999;
      border: 2px solid #e0e0e0;
    }

    .btn-favorite.favorited {
      background: #ffe0e0;
      color: var(--secondary);
      border-color: var(--secondary);
    }

    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      color: #999;
    }

    .empty-state i {
      font-size: 4rem;
      margin-bottom: 1rem;
      color: #ddd;
    }

    .modal {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      z-index: 200;
      align-items: center;
      justify-content: center;
    }

    .modal.active {
      display: flex;
    }

    .modal-content {
      background: white;
      border-radius: 20px;
      padding: 2.5rem;
      width: 95%;
      max-width: 500px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      max-height: 90vh;
      overflow-y: auto;
      animation: slideUp 0.3s;
    }

    @keyframes slideUp {
      from {
        transform: translateY(50px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .modal-title {
      font-size: 1.8rem;
      font-weight: 700;
      color: var(--primary);
    }

    .modal-close {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: #999;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
      color: #555;
    }

    .form-group input,
    .form-group select {
      width: 100%;
      padding: 0.8rem;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.3s;
    }

    .form-group input:focus,
    .form-group select:focus {
      outline: none;
      border-color: var(--primary);
      background: #f0f7ff;
    }

    .tabs {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
      border-bottom: 2px solid #e0e0e0;
    }

    .tab-btn {
      background: none;
      border: none;
      padding: 1rem 1.5rem;
      font-weight: 600;
      color: #999;
      cursor: pointer;
      border-bottom: 3px solid transparent;
      transition: all 0.3s;
      position: relative;
      bottom: -2px;
    }

    .tab-btn.active {
      color: var(--primary);
      border-bottom-color: var(--primary);
    }

    .tab-content {
      display: none;
    }

    .tab-content.active {
      display: block;
    }

    .divider {
      text-align: center;
      margin: 1.5rem 0;
      color: #999;
    }

    .success-message {
      background: #e8f5e9;
      color: var(--success);
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 1rem;
      display: none;
    }

    .success-message.active {
      display: block;
    }

    .filters-bar {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      margin-bottom: 1.5rem;
      display: flex;
      gap: 1rem;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }

    .results-info {
      color: #666;
      font-weight: 500;
    }

    @media (max-width: 768px) {

      .nav-center {
        flex-direction: column;
        gap: 0.5rem;
        margin: 0;
        width: 100%;
      }

      .nav-btn {
        width: 100%;
        text-align: center;
      }

      .search-grid {
        grid-template-columns: 1fr;
      }

      .universities-grid {
        grid-template-columns: 1fr;
      }

      .tabs {
        flex-wrap: wrap;
      }

      .filters-bar {
        flex-direction: column;
      }
    }
  </style>
</head>
<body>

<!-- NAVBAR -->
<nav class="navbar">
  <div class="logo">
    <i class="fas fa-graduation-cap"></i>
    UniVerse Pro
  </div>
  <div class="nav-center">
    <button class="nav-btn" onclick="goHome()">
      <i class="fas fa-home"></i> Главная
    </button>
    <button class="nav-btn" onclick="window.location.href='/obshaga/obshaga.html'">
      <i class="fas fa-building"></i> Общежитие
    </button>
    <button class="nav-btn" onclick="goInfo()">
      <i class="fas fa-info-circle"></i> О нас
    </button>
  </div>
  <div class="nav-right">
    <div class="user-info" onclick="goProfile()" id="userInfo" style="display:none;">
      <div class="user-avatar" id="userAvatar">U</div>
      <span id="userName">Пользователь</span>
      <i class="fas fa-chevron-down"></i>
    </div>
    <button class="nav-btn" onclick="openAuthModal()" id="loginBtn">
      <i class="fas fa-sign-in-alt"></i> Вход/Регистрация
    </button>
  </div>
</nav>

<div class="page-tabs">
  <a class="page-tab active" href="index5.html">Рейтинги</a>
  <a class="page-tab" href="country.html">Страны</a>
  <a class="page-tab" href="/obshaga/obshaga.html">Общежитие</a>
  <a class="page-tab" href="profile.html">Личный кабинет</a>
</div>

<!-- MAIN CONTAINER -->
<div class="container">
  <!-- SEARCH SECTION -->
  <div class="search-section">
    <h1 class="search-title">🎓 Найди свой университет</h1>
    
    <div class="search-grid">
      <div class="search-input">
        <label for="searchQuery">Название университета</label>
        <input type="text" id="searchQuery" placeholder="Поиск...">
      </div>
      
      <div class="search-input">
        <label for="countryFilter">Страна</label>
        <select id="countryFilter">
          <option value="">Все страны</option>
          <option value="Казахстан">Казахстан</option>
          <option value="США">США</option>
          <option value="Япония">Япония</option>
        </select>
      </div>
      
      <div class="search-input">
        <label for="cityFilter">Город</label>
        <select id="cityFilter">
          <option value="">Все города</option>
          <option value="Алматы">Алматы</option>
          <option value="Астана">Астана</option>
          <option value="Бостон">Бостон</option>
          <option value="Токио">Токио</option>
        </select>
      </div>
      
      <div class="search-input">
        <label for="ratingFilter">Минимальный рейтинг</label>
        <select id="ratingFilter">
          <option value="">Любой</option>
          <option value="4">⭐ 4+ звёзды</option>
          <option value="3">⭐ 3+ звёзды</option>
        </select>
      </div>

      <div class="search-input">
        <label for="languageFilter">Язык обучения</label>
        <select id="languageFilter">
          <option value="">Любой</option>
          <option value="RU">Русский</option>
          <option value="KZ">Казахский</option>
          <option value="EN">Английский</option>
          <option value="JP">Японский</option>
          <option value="AR">Арабский</option>
        </select>
      </div>

      <div class="search-input">
        <label for="tuitionRangeFilter">Диапазон стоимости (тенге/год)</label>
        <select id="tuitionRangeFilter">
          <option value="">Любой</option>
          <option value="0-800000">до 800 000 тг</option>
          <option value="800001-1200000">800 001 - 1 200 000 тг</option>
          <option value="1200001-2000000">1 200 001 - 2 000 000 тг</option>
          <option value="2000001-5000000">2 000 001 - 5 000 000 тг</option>
          <option value="5000001-999999999">5 000 001+ тг</option>
        </select>
      </div>
    </div>

    <div class="search-buttons">
      <button class="btn btn-primary" onclick="search()">
        <i class="fas fa-search"></i> Поиск
      </button>
      <button class="btn btn-primary" onclick="resetSearch()">
        <i class="fas fa-redo"></i> Очистить
      </button>
    </div>
  </div>

  <!-- FILTERS BAR -->
  <div class="filters-bar" id="filtersBar">
    <span class="results-info" id="resultsInfo">Загрузка...</span>
    <select onchange="sort(this.value)" id="sortBy">
      <option value="">Сортировка: Популярность</option>
      <option value="name">По названию (А-Я)</option>
      <option value="city">По городу</option>
      <option value="rating">По рейтингу</option>
    </select>
  </div>

  <!-- UNIVERSITIES GRID -->
  <div id="universitiesContainer">
    <div class="empty-state">
      <i class="fas fa-search"></i>
      <p>Нажмите кнопку "Поиск" для отображения университетов</p>
    </div>
  </div>
</div>

<!-- AUTH MODAL -->
<div class="modal" id="authModal">
  <div class="modal-content">
    <div class="modal-header">
      <h2 class="modal-title" id="modalTitle">Вход</h2>
      <button class="modal-close" onclick="closeAuthModal()">×</button>
    </div>

    <div class="success-message" id="successMessage">
      <i class="fas fa-check-circle"></i> Успешно!
    </div>

    <div class="tabs">
      <button class="tab-btn active" onclick="switchTab('login')">Вход</button>
      <button class="tab-btn" onclick="switchTab('register')">Регистрация</button>
    </div>

    <!-- LOGIN TAB -->
    <div id="loginTab" class="tab-content active">
      <form onsubmit="emailLogin(event)">
        <div class="form-group">
          <label>Email</label>
          <input type="email" id="loginEmail" required placeholder="your@email.com">
        </div>

        <div class="form-group">
          <label>Пароль</label>
          <input type="password" id="loginPassword" required placeholder="••••••••">
        </div>

        <button type="submit" class="btn btn-primary" style="width: 100%;">
          <i class="fas fa-sign-in-alt"></i> Войти
        </button>
      </form>
    </div>

    <!-- REGISTER TAB -->
    <div id="registerTab" class="tab-content">
      <form onsubmit="emailRegister(event)">
        <div class="form-group">
          <label>Полное имя</label>
          <input type="text" id="registerName" required placeholder="Иван Иванов">
        </div>

        <div class="form-group">
          <label>Email</label>
          <input type="email" id="registerEmail" required placeholder="your@email.com">
        </div>

        <div class="form-group">
          <label>Номер телефона (опционально)</label>
          <input type="tel" id="registerPhone" placeholder="+7 (XXX) XXX-XX-XX">
        </div>

        <div class="form-group">
          <label>Пароль</label>
          <input type="password" id="registerPassword" required placeholder="Минимум 8 символов">
        </div>

        <div class="form-group">
          <label>Подтверждение пароля</label>
          <input type="password" id="registerPasswordConfirm" required placeholder="Подтвердите пароль">
        </div>

        <button type="submit" class="btn btn-primary" style="width: 100%;">
          <i class="fas fa-user-plus"></i> Создать аккаунт
        </button>
      </form>
    </div>
  </div>
</div>

<script src="auth.js"></script>
<script>
const DETAIL_CACHE_PREFIX = 'universe_detail_cache_v1::';
const DETAIL_CACHE_TTL_MS = 1000 * 60 * 60 * 24 * 7;

function parseTuitionToKzt(tuitionText) {
  if (!tuitionText) return null;

  const normalized = tuitionText.toLowerCase();
  const match = tuitionText.match(/[\d\s,.]+/);
  if (!match) return null;

  const numeric = parseFloat(match[0].replace(/\s/g, '').replace(',', '.'));
  if (Number.isNaN(numeric) || numeric <= 0) return null;

  if (normalized.includes('$') || normalized.includes('usd')) {
    return Math.round(numeric * 500);
  }

  if (normalized.includes('¥') || normalized.includes('jpy')) {
    return Math.round(numeric * 3.4);
  }

  return Math.round(numeric);
}

function getCacheKey(link) {
  return `${DETAIL_CACHE_PREFIX}${link}`;
}

function getCachedDetails(link) {
  try {
    const raw = localStorage.getItem(getCacheKey(link));
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!parsed.timestamp || Date.now() - parsed.timestamp > DETAIL_CACHE_TTL_MS) {
      localStorage.removeItem(getCacheKey(link));
      return null;
    }

    return parsed;
  } catch (error) {
    return null;
  }
}

function setCachedDetails(link, details) {
  try {
    localStorage.setItem(getCacheKey(link), JSON.stringify({
      ...details,
      timestamp: Date.now()
    }));
  } catch (error) {
    // Ignore storage limits and continue with runtime-only data.
  }
}

function cleanText(text, maxLength = 220) {
  if (!text) return '';
  const compact = text.replace(/\s+/g, ' ').trim();
  if (compact.length <= maxLength) return compact;
  return `${compact.slice(0, maxLength).trim()}...`;
}

function escapeHtml(text) {
  if (text === null || text === undefined) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function fetchUniversityDetails(university) {
  const cached = getCachedDetails(university.link);
  if (cached) {
    university.pageTitle = cached.pageTitle;
    university.pageSummary = cached.pageSummary;
    university.detailsLoaded = true;
    return;
  }

  try {
    const response = await fetch(university.link, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Failed to load ${university.link}`);

    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');

    const pageTitle = cleanText(
      doc.querySelector('.card-content h2, h1, h2, title')?.textContent || university.name,
      120
    );

    const paragraphCandidates = Array.from(
      doc.querySelectorAll('.card-content p, main p, article p, p')
    )
      .map(node => cleanText(node.textContent, 300))
      .filter(text => text && text.length >= 40)
      .slice(0, 2);

    const summaryText = paragraphCandidates.join(' ');
    const pageSummary = cleanText(summaryText, 230) || 'Подробная информация доступна на странице университета.';

    university.pageTitle = pageTitle;
    university.pageSummary = pageSummary;
    university.detailsLoaded = true;

    setCachedDetails(university.link, { pageTitle, pageSummary });
  } catch (error) {
    university.pageTitle = university.name;
    university.pageSummary = 'Не удалось автоматически загрузить детали, откройте страницу университета по кнопке "Подробнее".';
    university.detailsLoaded = true;
  }
}

async function enrichUniversitiesData(onItemLoaded) {
  const enrichTasks = universitiesData.map(async (university) => {
    await fetchUniversityDetails(university);
    if (typeof onItemLoaded === 'function') {
      onItemLoaded(university);
    }
  });
  await Promise.all(enrichTasks);
}

const universitiesData = [
  {id: 1, name: "КазНУ", country: "Казахстан", city: "Алматы", desc: "Казахский национальный университет им. аль-Фараби.", img: "https://farabi.university/images/default_news.png", link: "univer/kazakhstan/Almaty/kaznu.html", rating: 4.8, programs: "IT, экономика, естественные науки", language: "RU/KZ/EN", tuition: "от 900 000 тг/год"},
  {id: 2, name: "ЕНУ", country: "Казахстан", city: "Астана", desc: "Евразийский национальный университет им. Л.Н. Гумилева.", img: "https://upload.wikimedia.org/wikipedia/commons/f/f8/L.N.Gumilyov_Eurasian_National_University.JPG", link: "univer/kazakhstan/Astana/enu.html", rating: 4.6, programs: "международные отношения, инженерия, право", language: "RU/KZ/EN", tuition: "от 1 000 000 тг/год"},
  {id: 3, name: "AlmaU", country: "Казахстан", city: "Алматы", desc: "Сильная бизнес-школа и современные программы менеджмента.", img: "https://almau.edu.kz/wp-content/uploads/2025/01/IMG_5614-scaled-2.jpg", link: "univer/kazakhstan/Almaty/almau.html", rating: 4.2, programs: "менеджмент, маркетинг, финансы", language: "RU/EN", tuition: "от 1 800 000 тг/год"},
  {id: 4, name: "АТУ", country: "Казахстан", city: "Алматы", desc: "Алматинский технологический университет с прикладным уклоном.", img: "https://avatars.mds.yandex.net/get-altay/911432/2a0000018ed179e9f3fae46939fafe19bbd8/L_height", link: "univer/kazakhstan/Almaty/aty.html", rating: 4.4, programs: "пищевая технология, дизайн, логистика", language: "RU/KZ", tuition: "от 850 000 тг/год"},
  {id: 5, name: "Академия гражданской авиации", country: "Казахстан", city: "Алматы", desc: "Профильная подготовка для пилотов, диспетчеров и авиаинженеров.", img: "https://upload.wikimedia.org/wikipedia/commons/7/7d/ALAKazAGA.JPG", link: "univer/kazakhstan/Almaty/Civil_Aviation_Academy.html", rating: 4.3, programs: "летная подготовка, авиабезопасность, авиаинженерия", language: "RU/EN", tuition: "от 1 500 000 тг/год"},
  {id: 6, name: "DMU", country: "Казахстан", city: "Алматы", desc: "Кампус De Montfort University в Казахстане.", img: "https://static.wixstatic.com/media/f48cb8_fb23b6ad805a4976a1d0c56b5bbee614~mv2.jpg/v1/fill/w_568,h_426,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/f48cb8_fb23b6ad805a4976a1d0c56b5bbee614~mv2.jpg", link: "univer/kazakhstan/Almaty/DMU Kazakhstan.html", rating: 4.2, programs: "business, computing, media", language: "EN/RU", tuition: "от 2 500 000 тг/год"},
  {id: 7, name: "ЕТУ", country: "Казахстан", city: "Алматы", desc: "Евразийский технологический университет.", img: "https://nurlysaulet.kz/assets/images/projects/ETU/etu-thumb-01-min.jpg", link: "univer/kazakhstan/Almaty/ety.html", rating: 4.1, programs: "IT, инженерия, управление", language: "RU/KZ", tuition: "от 800 000 тг/год"},
  {id: 8, name: "КазНМУ", country: "Казахстан", city: "Алматы", desc: "Казахский национальный медицинский университет.", img: "https://kaznmu.edu.kz/wp-content/uploads/2024/06/230601-20-scaled.jpg", link: "univer/kazakhstan/Almaty/Kaznmy.html", rating: 4.7, programs: "лечебное дело, стоматология, фармация", language: "RU/KZ", tuition: "от 1 400 000 тг/год"},
  {id: 9, name: "КазНАУ", country: "Казахстан", city: "Алматы", desc: "Казахский национальный аграрный исследовательский университет.", img: "https://eldala.kz/uploads/all/21/72/89/217289c44c8d9def3928e59ab51b8bfe.jpg", link: "univer/kazakhstan/Almaty/KazNAU.html", rating: 4.0, programs: "агрономия, ветеринария, агроинженерия", language: "RU/KZ", tuition: "от 780 000 тг/год"},
  {id: 10, name: "Satbayev University", country: "Казахстан", city: "Алматы", desc: "Один из ведущих технических вузов Казахстана.", img: "https://the-tech.kz/wp-content/uploads/2024/02/9b680f70-0a7f-4e1c-909a-c07b57b7f496.jpg", link: "univer/kazakhstan/Almaty/Satbayev.html", rating: 4.9, programs: "горное дело, AI, нефтегаз", language: "RU/KZ/EN", tuition: "от 1 100 000 тг/год"},
  {id: 11, name: "MIT", country: "США", city: "Бостон", desc: "Массачусетский технологический институт.", img: "https://www.studylab.ru/upload/wisywig/gallerys/1516970323589906/mit6.jpg", link: "univer/UST/mit.html", rating: 5.0, programs: "computer science, robotics, economics", language: "EN", tuition: "от $57 000/год"},
  {id: 12, name: "Токийский университет", country: "Япония", city: "Токио", desc: "Ведущий национальный университет Японии.", img: "https://www.go-study.uz/wp-content/uploads/2020/10/https___s3-ap-northeast-1.amazonaws.com_psh-ex-ftnikkei-3937bb4_images_4_4_7_7_12187744-2-eng-GB_0124N-Univ-of-Tokyo.jpg", link: "univer/Yaponiya/yaponiya.html", rating: 4.9, programs: "engineering, law, medicine", language: "JP/EN", tuition: "от ¥535 800/год"},
  {id: 13, name: "CAU", country: "Казахстан", city: "Алматы", desc: "Центрально-Азиатский университет с фокусом на прикладные навыки.", img: "https://the-tech.kz/wp-content/uploads/2024/09/photo_5467816117876678264_w-1.jpg", link: "univer/kazakhstan/Almaty/CAU.html", rating: 3.9, programs: "бизнес, IT, право", language: "RU/EN", tuition: "от 900 000 тг/год"},
  {id: 14, name: "Кайнар", country: "Казахстан", city: "Алматы", desc: "Университет с программами в праве, экономике и педагогике.", img: "https://avatars.mds.yandex.net/get-altay/4719974/2a0000017944cd0b4a3ba6b23ce3aaf47d8a/L_height", link: "univer/kazakhstan/Almaty/kaynar.html", rating: 3.8, programs: "право, педагогика, финансы", language: "RU/KZ", tuition: "от 700 000 тг/год"},
  {id: 15, name: "КазАТиСО", country: "Казахстан", city: "Алматы", desc: "Казахская академия труда и социальных отношений.", img: "https://studlife.kz/uploads/images/00/02/48/2015/02/16/0u67b84c26-1fbf9007-2d915b58.jpeg", link: "univer/kazakhstan/Almaty/KazATiSO.html", rating: 4.0, programs: "социология, HR, управление", language: "RU/KZ", tuition: "от 760 000 тг/год"},
  {id: 16, name: "КазАДИ", country: "Казахстан", city: "Алматы", desc: "Казахская автомобильно-дорожная академия.", img: "https://avatars.mds.yandex.net/get-altay/3691419/2a00000179495b3aed5118fb49e3f2becf69/orig", link: "univer/kazakhstan/Almaty/KazADImG.html", rating: 4.1, programs: "транспорт, строительство дорог, логистика", language: "RU/KZ", tuition: "от 820 000 тг/год"},
  {id: 17, name: "КазНПУ", country: "Казахстан", city: "Алматы", desc: "Казахский национальный педагогический университет.", img: "https://kaznpu.kz/docs/smi/031.07.2020.1.jpg", link: "univer/kazakhstan/Almaty/KazNPY.html", rating: 4.3, programs: "педагогика, психология, филология", language: "RU/KZ", tuition: "от 650 000 тг/год"},
  {id: 18, name: "КазНЖПУ", country: "Казахстан", city: "Алматы", desc: "Казахский национальный женский педагогический университет.", img: "https://avatars.mds.yandex.net/get-altay/3629247/2a000001761f2a78fe32896ecef4d646ffd5/orig", link: "univer/kazakhstan/Almaty/KazNJP.html", rating: 4.2, programs: "образование, языки, социальные науки", language: "RU/KZ", tuition: "от 620 000 тг/год"},
  {id: 19, name: "КазЭнергетический университет", country: "Казахстан", city: "Алматы", desc: "Программы по энергетике, автоматизации и цифровым системам.", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop", link: "univer/kazakhstan/Almaty/univer_enerji.html", rating: 4.0, programs: "энергетика, электротехника, IT", language: "RU/KZ", tuition: "от 880 000 тг/год"},
  {id: 20, name: "ЕУИК Нур-Мубарак", country: "Казахстан", city: "Алматы", desc: "Египетский университет исламской культуры Нур-Мубарак.", img: "https://www.nmu.edu.kz/wp-content/uploads/2025/05/Nur-Mubarak-p1zaefom3ugxmlmrfwrx3n4n6d5xth506a8ocloprk-1024x495.jpg", link: "univer/kazakhstan/Almaty/EYIK.html", rating: 4.1, programs: "теология, исламоведение, перевод", language: "RU/KZ/AR", tuition: "уточняется на сайте"},
  {id: 21, name: "КазМОиМЯ", country: "Казахстан", city: "Алматы", desc: "Казахский университет международных отношений и мировых языков.", img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1200&auto=format&fit=crop", link: "univer/kazakhstan/Almaty/KazMUNO.html", rating: 4.4, programs: "перевод, международные отношения, лингвистика", language: "RU/KZ/EN", tuition: "от 1 050 000 тг/год"},
  {id: 22, name: "КазНАИ", country: "Казахстан", city: "Алматы", desc: "Казахская национальная академия искусств.", img: "https://vlast.kz/media/upload/images/5b07d1162d791bb4982b48458dd82d37.jpg", link: "univer/kazakhstan/Almaty/KazNAI.html", rating: 4.5, programs: "театр, кино, живопись, дизайн", language: "RU/KZ", tuition: "от 950 000 тг/год"},
  {id: 23, name: "КазНацКонсерватория", country: "Казахстан", city: "Алматы", desc: "Казахская национальная консерватория.", img: "https://www.conservatoire.edu.kz/upload/iblock/b15/b15d738a02ae761f58ad88cba66a28b8.jpg", link: "univer/kazakhstan/Almaty/KazNaC.html", rating: 4.6, programs: "вокал, инструментальное искусство, композиция", language: "RU/KZ", tuition: "от 900 000 тг/год"},
  {id: 24, name: "Гуманитарный университет", country: "Казахстан", city: "Алматы", desc: "Гуманитарные и социальные программы бакалавриата.", img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200&auto=format&fit=crop", link: "univer/kazakhstan/Almaty/gumaniter.html", rating: 3.9, programs: "журналистика, история, право", language: "RU/KZ", tuition: "от 680 000 тг/год"},
  {id: 25, name: "КазАСТ", country: "Казахстан", city: "Алматы", desc: "Казахская академия спорта и туризма.", img: "https://kazast.edu.kz/wp-content/uploads/2022/08/IMG_3852-1-1170x610.jpg", link: "univer/kazakhstan/Almaty/КаzАСТ.html", rating: 4.2, programs: "спорт, туризм, физкультура", language: "RU/KZ", tuition: "от 730 000 тг/год"},
  {id: 26, name: "Universities USA", country: "США", city: "Бостон", desc: "Подборка американских университетов и условий поступления.", img: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1200&auto=format&fit=crop", link: "univer/UST/USA.html", rating: 4.7, programs: "STEM, business, humanities", language: "EN", tuition: "в среднем от $25 000/год"},
  {id: 27, name: "КазМуно", country: "Казахстан", city: "Алматы", desc: "Казахский медицинский университет непрерывного образования", img: "https://liter.kz/cache/imagine/1200/uploads/news/2021/02/15/kazmuno-2.jpg", link: "univer/kazakhstan/Almaty/KazMUNO.html", rating: 4.7, programs: "", language: "", tuition: ""},
  {id: 28, name: "АГЭУ", country: "Казахстан", city: "Алматы", desc: "Алматинский гуманитарно-экономический университет", img: "https://avatars.mds.yandex.net/get-altay/9753788/2a0000018a1a6793e80bcf1551159de35da0/orig", link: "univer/kazakhstan/Almaty/gumaniter.html", rating: 4.7, programs: "", language: "", tuition: ""},
  {id: 29, name: "Нархоз", country: "Казахстан", city: "Алматы", desc: "Нархоз", img: "https://tengrinews.kz/userdata/news/2022/news_468170/thumb_m/photo_395800.jpeg", link: "univer/kazakhstan/Almaty/narhoz.html", rating: 4.7, programs: "", language: "", tuition: ""},
  {id: 30, name: "UIB", country: "Казахстан", city: "Алматы", desc: "Университет Международного Бизнеса имени Кенжегали Сагадиева", img: "https://avatars.mds.yandex.net/i?id=308545b86b96ee5169bc34d579d8c71418f80289-16931118-images-thumbs&n=13", link: "univer/kazakhstan/Almaty/UIB.html", rating: 4.7, programs: "", language: "", tuition: ""},
  {id: 31, name: "Кунаева", country: "Казахстан", city: "Алматы", desc: "Евразийская юридическая академия имени Д.А. Кунаева", img: "https://avatars.mds.yandex.net/get-altay/1024093/2a0000018659675a5b4607cd28591ff17a82/L_height", link: "univer/kazakhstan/Almaty/Kunaeva.html", rating: 4.7, programs: "", language: "", tuition: ""},
  {id: 32, name: "КИМЭП", country: "Казахстан", city: "Алматы", desc: "Казахстанский институт менеджмента, экономики и прогнозирования", img: "https://avatars.mds.yandex.net/get-altay/8133749/2a000001871b3e843b4e829754b316d7986c/orig", link: "univer/kazakhstan/Almaty/Kimep.html", rating: 4.7, programs: "", language: "", tuition: ""},
  {id: 33, name: "УИЯДК", country: "Казахстан", city: "Алматы", desc: "Университет иностранных языков и деловой карьеры", img: "https://static-pano.maps.yandex.ru/v1/?panoid=1532520607_788584763_23_1710661139&size=500%2C240&azimuth=-180&tilt=10&api_key=maps&signature=UxrrjQogUP-uZIAEgzq-z3vurjgOlWf8lwEgWHBzGGQ=", link: "univer/kazakhstan/Almaty/UIADK.html", rating: 4.7, programs: "", language: "", tuition: ""},
  {id: 34, name: "Туран", country: "Казахстан", city: "Алматы", desc: "Университет Туран г.Алматы", img: "https://m.ticketon.kz/files/images/ro7MVXBQce8.jpg", link: "univer/kazakhstan/Almaty/Turan.html", rating: 4.7, programs: "", language: "", tuition: ""},
  {id: 35, name: "МУИТ", country: "Казахстан", city: "Алматы", desc: "Международный университет информационных технологий", img: "https://smapse.ru/storage/2019/09/x1-1.jpg", link: "univer/kazakhstan/Almaty/MUIT.html", rating: 4.7, programs: "", language: "", tuition: ""},
  {id: 36, name: "МТГУ", country: "Казахстан", city: "Алматы", desc: "Международный транспортно-гуманитарный университет", img: "https://avatars.mds.yandex.net/get-altay/13265642/2a00000195a0621889f99b3c8bd2b73cda47/M_height", link: "univer/kazakhstan/Almaty/MTGU.html", rating: 4.7, programs: "", language: "", tuition: ""},
  {id: 37, name: "МИТУ", country: "Казахстан", city: "Алматы", desc: "Международный инженерно-технологический университет", img: "https://ais.kazetu.kz/documents/storage/16/1738234431_1.png", link: "univer/kazakhstan/Almaty/METU.html", rating: 4.7, programs: "", language: "", tuition: ""},
  {id: 38, name: "МОК", country: "Казахстан", city: "Алматы", desc: "Международная образовательная корпорация", img: "https://admin.vipusknik.kz/storage/5180/snimokpng.png", link: "univer/kazakhstan/Almaty/MOK.html", rating: 4.7, programs: "", language: "", tuition: ""},
  {id: 39, name: "", country: "", city: "", desc: "", img: "", link: "", rating: 4.7, programs: "", language: "", tuition: ""},
  {id: 40, name: "", country: "", city: "", desc: "", img: "", link: "", rating: 4.7, programs: "", language: "", tuition: ""},
  {id: 41, name: "", country: "", city: "", desc: "", img: "", link: "", rating: 4.7, programs: "", language: "", tuition: ""},
  {id: 42, name: "", country: "", city: "", desc: "", img: "", link: "", rating: 4.7, programs: "", language: "", tuition: ""},
  {id: 43, name: "", country: "", city: "", desc: "", img: "", link: "", rating: 4.7, programs: "", language: "", tuition: ""},
  {id: 44, name: "", country: "", city: "", desc: "", img: "", link: "", rating: 4.7, programs: "", language: "", tuition: ""},
  {id: 45, name: "", country: "", city: "", desc: "", img: "", link: "", rating: 4.7, programs: "", language: "", tuition: ""},
  {id: 46, name: "", country: "", city: "", desc: "", img: "", link: "", rating: 4.7, programs: "", language: "", tuition: ""},
  {id: 47, name: "", country: "", city: "", desc: "", img: "", link: "", rating: 4.7, programs: "", language: "", tuition: ""},
  {id: 48, name: "", country: "", city: "", desc: "", img: "", link: "", rating: 4.7, programs: "", language: "", tuition: ""},
  {id: 49, name: "", country: "", city: "", desc: "", img: "", link: "", rating: 4.7, programs: "", language: "", tuition: ""},
  {id: 50, name: "", country: "", city: "", desc: "", img: "", link: "", rating: 4.7, programs: "", language: "", tuition: ""},
  {id: 51, name: "", country: "", city: "", desc: "", img: "", link: "", rating: 4.7, programs: "", language: "", tuition: ""},
  {id: 52, name: "", country: "", city: "", desc: "", img: "", link: "", rating: 4.7, programs: "", language: "", tuition: ""},
  {id: 53, name: "", country: "", city: "", desc: "", img: "", link: "", rating: 4.7, programs: "", language: "", tuition: ""},
  {id: 54, name: "", country: "", city: "", desc: "", img: "", link: "", rating: 4.7, programs: "", language: "", tuition: ""},
  {id: 55, name: "", country: "", city: "", desc: "", img: "", link: "", rating: 4.7, programs: "", language: "", tuition: ""},
  {id: 56, name: "", country: "", city: "", desc: "", img: "", link: "", rating: 4.7, programs: "", language: "", tuition: ""},
  {id: 57, name: "", country: "", city: "", desc: "", img: "", link: "", rating: 4.7, programs: "", language: "", tuition: ""},
  {id: 58, name: "", country: "", city: "", desc: "", img: "", link: "", rating: 4.7, programs: "", language: "", tuition: ""},
  {id: 59, name: "", country: "", city: "", desc: "", img: "", link: "", rating: 4.7, programs: "", language: "", tuition: ""},
  {id: 60, name: "", country: "", city: "", desc: "", img: "", link: "", rating: 4.7, programs: "", language: "", tuition: ""},
  {id: 61, name: "", country: "", city: "", desc: "", img: "", link: "", rating: 4.7, programs: "", language: "", tuition: ""},
  {id: 62, name: "", country: "", city: "", desc: "", img: "", link: "", rating: 4.7, programs: "", language: "", tuition: ""},
  {id: 63, name: "", country: "", city: "", desc: "", img: "", link: "", rating: 4.7, programs: "", language: "", tuition: ""},
  {id: 64, name: "", country: "", city: "", desc: "", img: "", link: "", rating: 4.7, programs: "", language: "", tuition: ""},

].map(university => ({
  ...university,
  tuitionValueKzt: parseTuitionToKzt(university.tuition),
  pageTitle: university.name,
  pageSummary: 'Загружаем детали...',
  detailsLoaded: false
}));

let filteredData = [];
let currentUser = null;
let favorites = [];

// INITIALIZATION
window.onload = async () => {
  checkAuthStatus();
  loadFavorites();

  filteredData = [...universitiesData];
  renderUniversities();

  await enrichUniversitiesData(() => {
    renderUniversities();
  });

  renderUniversities();
};

// AUTH FUNCTIONS
function checkAuthStatus() {
  const user = localStorage.getItem('universe_currentUser');
  if (user) {
    currentUser = JSON.parse(user);
    updateUserUI();
  }
}

function updateUserUI() {
  if (currentUser) {
    document.getElementById('userInfo').style.display = 'flex';
    document.getElementById('loginBtn').style.display = 'none';
    document.getElementById('userName').textContent = currentUser.name || 'Пользователь';
    const initials = (currentUser.name || 'U').split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2);
    document.getElementById('userAvatar').textContent = initials;
  } else {
    document.getElementById('userInfo').style.display = 'none';
    document.getElementById('loginBtn').style.display = 'flex';
  }
}

function openAuthModal() {
  document.getElementById('authModal').classList.add('active');
}

function closeAuthModal() {
  document.getElementById('authModal').classList.remove('active');
}

function switchTab(tab) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  
  document.getElementById(tab + 'Tab').classList.add('active');
  event.target.classList.add('active');
  
  document.getElementById('modalTitle').textContent = tab === 'login' ? 'Вход' : 'Регистрация';
}

function emailLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim().toLowerCase();
  const password = document.getElementById('loginPassword').value;

  if (password.length < 8) {
    alert('❌ Пароль должен содержать минимум 8 символов');
    return;
  }

  const users = JSON.parse(localStorage.getItem('universe_users') || '[]');
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    currentUser = user;
    localStorage.setItem('universe_currentUser', JSON.stringify(user));
    updateUserUI();
    showSuccess('✅ Успешный вход!');
    document.getElementById('loginEmail').value = '';
    document.getElementById('loginPassword').value = '';
    setTimeout(() => closeAuthModal(), 1000);
  } else {
    alert('❌ Неверный email или пароль');
  }
}

function emailRegister(e) {
  e.preventDefault();
  const name = document.getElementById('registerName').value.trim();
  const email = document.getElementById('registerEmail').value.trim().toLowerCase();
  const phone = document.getElementById('registerPhone').value.trim();
  const password = document.getElementById('registerPassword').value;
  const passwordConfirm = document.getElementById('registerPasswordConfirm').value;

  let hasError = false;

  if (!name || name.length < 2) {
    alert('❌ Введите ваше имя (минимум 2 символа)');
    hasError = true;
  }

  if (!email.includes('@')) {
    alert('❌ Введите корректный email');
    hasError = true;
  }

  if (password.length < 8) {
    alert('❌ Пароль должен содержать минимум 8 символов');
    hasError = true;
  }

  if (password !== passwordConfirm) {
    alert('❌ Пароли не совпадают');
    hasError = true;
  }

  if (hasError) return;

  const users = JSON.parse(localStorage.getItem('universe_users') || '[]');
  if (users.find(u => u.email === email)) {
    alert('❌ Email уже зарегистрирован');
    return;
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    phone,
    password,
    createdAt: new Date().toISOString(),
    favorites: []
  };

  users.push(newUser);
  localStorage.setItem('universe_users', JSON.stringify(users));

  currentUser = newUser;
  localStorage.setItem('universe_currentUser', JSON.stringify(newUser));
  updateUserUI();
  showSuccess('✅ Аккаунт создан успешно!');
  
  // Очистить форму
  document.getElementById('registerName').value = '';
  document.getElementById('registerEmail').value = '';
  document.getElementById('registerPhone').value = '';
  document.getElementById('registerPassword').value = '';
  document.getElementById('registerPasswordConfirm').value = '';
  
  setTimeout(() => closeAuthModal(), 1000);
}

function showSuccess(message) {
  const msg = document.getElementById('successMessage');
  msg.textContent = message;
  msg.classList.add('active');
  setTimeout(() => msg.classList.remove('active'), 3000);
}

// SEARCH FUNCTIONS
function search() {
  const query = document.getElementById('searchQuery').value.toLowerCase();
  const country = document.getElementById('countryFilter').value;
  const city = document.getElementById('cityFilter').value;
  const rating = document.getElementById('ratingFilter').value;
  const language = document.getElementById('languageFilter').value;
  const tuitionRange = document.getElementById('tuitionRangeFilter').value;

  const noFiltersApplied = !query && !country && !city && !rating && !language && !tuitionRange;
  if (noFiltersApplied) {
    filteredData = [...universitiesData];
    renderUniversities();
    return;
  }

  let minTuition = null;
  let maxTuition = null;
  if (tuitionRange) {
    const [minRaw, maxRaw] = tuitionRange.split('-');
    minTuition = parseInt(minRaw, 10);
    maxTuition = parseInt(maxRaw, 10);
  }

  filteredData = universitiesData.filter(u => {
  const matchQuery = !query ||
    u.name.toLowerCase().includes(query) ||
    u.desc.toLowerCase().includes(query) ||
    (u.programs && u.programs.toLowerCase().includes(query)) ||
    (u.pageSummary && u.pageSummary.toLowerCase().includes(query));
  const matchCountry = !country || u.country === country;
  const matchCity = !city || u.city === city;
  const matchRating = !rating || u.rating >= parseFloat(rating);
  const matchLanguage = !language || (u.language && u.language.toUpperCase().includes(language));
  const matchTuition = !tuitionRange ||
    (u.tuitionValueKzt !== null && u.tuitionValueKzt >= minTuition && u.tuitionValueKzt <= maxTuition);
  return matchQuery && matchCountry && matchCity && matchRating && matchLanguage && matchTuition;
});

  renderUniversities();
}

function resetSearch() {
  document.getElementById('searchQuery').value = '';
  document.getElementById('countryFilter').value = '';
  document.getElementById('cityFilter').value = '';
  document.getElementById('ratingFilter').value = '';
  document.getElementById('languageFilter').value = '';
  document.getElementById('tuitionRangeFilter').value = '';
  document.getElementById('sortBy').value = '';
  filteredData = [...universitiesData];
  renderUniversities();
}

function sort(type) {
  if (!filteredData.length) return;

  if (type === 'name') {
    filteredData.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
  } else if (type === 'city') {
    filteredData.sort((a, b) => a.city.localeCompare(b.city, 'ru'));
  } else if (type === 'rating') {
    filteredData.sort((a, b) => b.rating - a.rating);
  }
  
  renderUniversities();
}

function renderUniversities() {
  const container = document.getElementById('universitiesContainer');
  
  if (!filteredData.length) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-search"></i>
        <p>По вашему запросу ничего не найдено</p>
      </div>
    `;
    document.getElementById('resultsInfo').textContent = 'Результаты: 0';
    return;
  }

  const loadedDetailsCount = filteredData.filter(u => u.detailsLoaded).length;
  const totalVisible = filteredData.length;
  const loadingSuffix = loadedDetailsCount < totalVisible
    ? ` • ⏳ Детали: ${loadedDetailsCount}/${totalVisible}`
    : ` • ✅ Детали загружены`;
  document.getElementById('resultsInfo').textContent = `📊 Результаты: ${totalVisible} университет(ов)${loadingSuffix}`;

  container.innerHTML = `
    <div class="universities-grid">
      ${filteredData.map(u => `
        <div class="university-card card-hover fade-in">
          <div class="card-image" style="background-image: url('${u.img}'); background-size: cover;">
            <div class="card-badge">⭐ ${u.rating}</div>
          </div>
          <div class="card-content">
            <h3 class="card-title">${escapeHtml(u.name)}</h3>
            <div class="card-location">
              <i class="fas fa-map-marker-alt"></i> ${escapeHtml(u.city)}, ${escapeHtml(u.country)}
            </div>
            <p class="card-desc">${escapeHtml(u.desc)}</p>
            <p class="card-detail ${u.detailsLoaded ? '' : 'loading'}">
              ${u.detailsLoaded
                ? `<i class="fas fa-circle-info"></i> ${escapeHtml(u.pageSummary || 'Детальная информация загружается...')}`
                : `<span class="detail-loading-row"><i class="fas fa-spinner fa-spin"></i> Загружаем детали с страницы вуза...</span><span class="skeleton-wrap"><span class="skeleton-line"></span><span class="skeleton-line short"></span></span>`}
            </p>
            <div class="card-meta">
              <div class="card-meta-item">
                <i class="fas fa-book"></i> ${escapeHtml(u.programs || 'Направления уточняются')}
              </div>
              <div class="card-meta-item">
                <i class="fas fa-language"></i> ${escapeHtml(u.language || 'Язык обучения уточняется')}
              </div>
              <div class="card-meta-item">
                <i class="fas fa-money-bill-wave"></i> ${escapeHtml(u.tuition || 'Стоимость уточняется')}
              </div>
            </div>
            <div class="card-actions">
              <button class="card-btn btn-view" onclick="goToUniversity('${u.link}')">
                <i class="fas fa-arrow-right"></i> Подробнее
              </button>
              <button class="card-btn btn-favorite ${favorites.includes(u.id) ? 'favorited' : ''}" 
                      onclick="toggleFavorite(${u.id})">
                <i class="fas fa-heart"></i>
              </button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function goToUniversity(link) {
  window.location.href = link;
}

// FAVORITES
function normalizeFavoriteIds(rawFavorites) {
  if (!Array.isArray(rawFavorites)) {
    return [];
  }

  const normalized = rawFavorites
    .map((favoriteItem) => {
      if (typeof favoriteItem === 'number' || typeof favoriteItem === 'string') {
        return Number(favoriteItem);
      }

      if (favoriteItem && typeof favoriteItem === 'object') {
        return Number(favoriteItem.id ?? favoriteItem.universityId);
      }

      return NaN;
    })
    .filter((favoriteId) => Number.isFinite(favoriteId));

  return [...new Set(normalized)];
}

function ensureFavoriteMeta(ids) {
  const favoriteMeta = loadFavoriteMeta();
  let changed = false;

  ids.forEach((favoriteId) => {
    const key = String(favoriteId);
    if (favoriteMeta[key]) {
      return;
    }

    const university = universitiesData.find((u) => Number(u.id) === favoriteId);
    favoriteMeta[key] = {
      id: favoriteId,
      name: university?.name || `Университет #${favoriteId}`,
      city: university?.city || 'Город не указан'
    };
    changed = true;
  });

  if (changed) {
    saveFavoriteMeta(favoriteMeta);
  }
}

function loadFavorites() {
  const rawFavorites = JSON.parse(localStorage.getItem('universe_favorites') || '[]');
  favorites = normalizeFavoriteIds(rawFavorites);
  localStorage.setItem('universe_favorites', JSON.stringify(favorites));
  ensureFavoriteMeta(favorites);
}

function loadFavoriteMeta() {
  return JSON.parse(localStorage.getItem('universe_favorites_meta') || '{}');
}

function saveFavoriteMeta(meta) {
  localStorage.setItem('universe_favorites_meta', JSON.stringify(meta));
}

function toggleFavorite(id) {
  const normalizedId = Number(id);
  const isCurrentlyFavorite = favorites.includes(normalizedId);
  const favoriteMeta = loadFavoriteMeta();

  if (isCurrentlyFavorite) {
    favorites = favorites.filter(f => Number(f) !== normalizedId);
    delete favoriteMeta[String(normalizedId)];
  } else {
    favorites.push(normalizedId);
    const university = universitiesData.find(u => u.id === normalizedId);
    favoriteMeta[String(normalizedId)] = {
      id: normalizedId,
      name: university?.name || `Университет #${normalizedId}`,
      city: university?.city || 'Город не указан'
    };
  }

  favorites = [...new Set(favorites)];
  localStorage.setItem('universe_favorites', JSON.stringify(favorites));
  saveFavoriteMeta(favoriteMeta);
  renderUniversities();
  showSuccess(`${isCurrentlyFavorite ? '💔 Удалено' : '❤️ Добавлено'} из избранного`);
}

// NAVIGATION
function goHome() {
  window.location.href = 'index2.html';
}

function goObshaga() {
  window.location.href = 'obshaga/obshaga.html';
}

function goInfo() {
  window.location.href = 'info.html';
}

function goProfile() {
  if (!currentUser) {
    const guestUser = {
      id: Date.now(),
      name: 'Гость',
      email: 'guest@universe.local',
      createdAt: new Date().toISOString()
    };
    currentUser = guestUser;
    localStorage.setItem('universe_currentUser', JSON.stringify(guestUser));
  }
  window.location.href = 'profile.html';
}
    </script>
</body>
</html>
