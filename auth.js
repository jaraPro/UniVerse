// ================================
// UNIVERSE AUTH SYSTEM v2.0
// Backend-integrated authentication system
// ================================

class UniverseAuth {
  constructor() {
    this.baseURL = 'http://localhost:5001/api/auth'; // Change to your backend URL
    this.currentUser = null;
    this.accessToken = localStorage.getItem('universe_accessToken');
    this.refreshToken = localStorage.getItem('universe_refreshToken');
    this.setupAuthUI();

    // Auto-refresh token if needed
    if (this.accessToken) {
      this.validateToken();
    }
  }

  async validateToken() {
    try {
      const response = await fetch(`${this.baseURL}/profile`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      });

      if (response.ok) {
        const user = await response.json();
        this.currentUser = user;
        this.updateUI();
      } else if (response.status === 401) {
        // Try to refresh token
        await this.refreshAccessToken();
      }
    } catch (error) {
      console.error('Token validation failed:', error);
      this.logout();
    }
  }

  async refreshAccessToken() {
    try {
      const response = await fetch(`${this.baseURL}/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refreshToken: this.refreshToken })
      });

      if (response.ok) {
        const data = await response.json();
        this.accessToken = data.accessToken;
        localStorage.setItem('universe_accessToken', this.accessToken);
        await this.validateToken();
      } else {
        this.logout();
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      this.logout();
    }
  }

  async register(name, email, phone, password) {
    try {
      this.showLoading('Регистрация...');

      const response = await fetch(`${this.baseURL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, phone, password })
      });

      const data = await response.json();

      if (response.ok) {
        this.showSuccess('Регистрация успешна! Проверьте email для подтверждения.');
        return { success: true, message: 'Проверьте email для подтверждения аккаунта' };
      } else {
        this.showError(data.error || 'Ошибка регистрации');
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Registration error:', error);
      this.showError('Ошибка сети. Попробуйте позже.');
      return { success: false, error: 'Network error' };
    } finally {
      this.hideLoading();
    }
  }

  async login(email, password, twoFactorCode = null) {
    try {
      this.showLoading('Вход...');

      const response = await fetch(`${this.baseURL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, twoFactorCode })
      });

      const data = await response.json();

      if (response.ok) {
        this.accessToken = data.accessToken;
        this.refreshToken = data.refreshToken;
        this.currentUser = data.user;

        localStorage.setItem('universe_accessToken', this.accessToken);
        localStorage.setItem('universe_refreshToken', this.refreshToken);

        this.closeModal();
        this.updateUI();
        this.showSuccess('Вход выполнен успешно!');

        return { success: true, requires2FA: data.requires2FA };
      } else {
        if (data.requires2FA) {
          return { success: false, requires2FA: true, message: 'Введите код 2FA' };
        }
        this.showError(data.error || 'Ошибка входа');
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Login error:', error);
      this.showError('Ошибка сети. Попробуйте позже.');
      return { success: false, error: 'Network error' };
    } finally {
      this.hideLoading();
    }
  }

  async logout() {
    try {
      await fetch(`${this.baseURL}/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      });
    } catch (error) {
      console.error('Logout error:', error);
    }

    this.currentUser = null;
    this.accessToken = null;
    this.refreshToken = null;

    localStorage.removeItem('universe_accessToken');
    localStorage.removeItem('universe_refreshToken');

    this.updateUI();
    this.showSuccess('Выход выполнен');
  }

  async updateProfile(updates) {
    try {
      const response = await fetch(`${this.baseURL}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.accessToken}`
        },
        body: JSON.stringify(updates)
      });

      const data = await response.json();

      if (response.ok) {
        this.currentUser = data.user;
        this.showSuccess('Профиль обновлен');
        return { success: true };
      } else {
        this.showError(data.error || 'Ошибка обновления');
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Profile update error:', error);
      this.showError('Ошибка сети');
      return { success: false, error: 'Network error' };
    }
  }

  async setup2FA() {
    try {
      const response = await fetch(`${this.baseURL}/setup-2fa`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, qrCode: data.qrCode, secret: data.secret, backupCodes: data.backupCodes };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('2FA setup error:', error);
      return { success: false, error: 'Network error' };
    }
  }

  async verify2FA(code) {
    try {
      const response = await fetch(`${this.baseURL}/verify-2fa`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.accessToken}`
        },
        body: JSON.stringify({ code })
      });

      const data = await response.json();

      if (response.ok) {
        this.currentUser.twoFactorEnabled = true;
        return { success: true };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('2FA verification error:', error);
      return { success: false, error: 'Network error' };
    }
  }

  async googleLogin() {
    window.location.href = `${this.baseURL}/google`;
  }

  async switchAccount(accountId) {
    try {
      const response = await fetch(`${this.baseURL}/switch-account`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.accessToken}`
        },
        body: JSON.stringify({ accountId })
      });

      const data = await response.json();

      if (response.ok) {
        this.currentUser = data.user;
        this.updateUI();
        this.showSuccess('Аккаунт переключен');
        return { success: true };
      } else {
        this.showError(data.error || 'Ошибка переключения');
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Account switch error:', error);
      this.showError('Ошибка сети');
      return { success: false, error: 'Network error' };
    }
  }

  async addAccount(accountData) {
    try {
      const response = await fetch(`${this.baseURL}/add-account`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.accessToken}`
        },
        body: JSON.stringify(accountData)
      });

      const data = await response.json();

      if (response.ok) {
        this.currentUser = data.user;
        this.updateUI();
        this.showSuccess('Аккаунт добавлен');
        return { success: true };
      } else {
        this.showError(data.error || 'Ошибка добавления');
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Add account error:', error);
      this.showError('Ошибка сети');
      return { success: false, error: 'Network error' };
    }
  }

  async deleteAccount(accountId) {
    if (!confirm('Вы уверены, что хотите удалить этот аккаунт? Это действие нельзя отменить.')) {
      return { success: false, cancelled: true };
    }

    try {
      const response = await fetch(`${this.baseURL}/delete-account`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.accessToken}`
        },
        body: JSON.stringify({ accountId })
      });

      const data = await response.json();

      if (response.ok) {
        this.currentUser = data.user;
        this.updateUI();
        this.showSuccess('Аккаунт удален');
        return { success: true };
      } else {
        this.showError(data.error || 'Ошибка удаления');
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Delete account error:', error);
      this.showError('Ошибка сети');
      return { success: false, error: 'Network error' };
    }
  }

  isAuthenticated() {
    return !!this.currentUser && !!this.accessToken;
  }

  // UI Methods
  setupAuthUI() {
    this.injectStyles();
    this.injectModal();
    this.updateUI();
  }

  injectStyles() {
    if (document.getElementById('universe-auth-styles')) return;

    const styles = `
      /* Auth Modal Styles */
      .universe-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
      }

      .universe-modal.active {
        display: flex;
      }

      .universe-modal-content {
        background: white;
        border-radius: 15px;
        padding: 2rem;
        width: 90%;
        max-width: 450px;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        animation: slideUp 0.3s ease;
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes slideUp {
        from { transform: translateY(30px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }

      .universe-modal-header {
        text-align: center;
        margin-bottom: 2rem;
      }

      .universe-modal-header h2 {
        color: #062abb;
        margin-bottom: 0.5rem;
      }

      .universe-tabs {
        display: flex;
        margin-bottom: 2rem;
        border-radius: 8px;
        overflow: hidden;
        background: #f8f9fa;
      }

      .universe-tab {
        flex: 1;
        padding: 0.8rem;
        border: none;
        background: transparent;
        cursor: pointer;
        transition: all 0.3s;
        font-weight: 500;
      }

      .universe-tab.active {
        background: #062abb;
        color: white;
      }

      .universe-form-group {
        margin-bottom: 1.5rem;
      }

      .universe-form-group label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        color: #333;
      }

      .universe-form-group input {
        width: 100%;
        padding: 0.8rem;
        border: 2px solid #e9ecef;
        border-radius: 8px;
        font-size: 1rem;
        transition: border-color 0.3s;
      }

      .universe-form-group input:focus {
        outline: none;
        border-color: #062abb;
      }

      .universe-btn {
        width: 100%;
        padding: 0.8rem;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
        margin-bottom: 1rem;
      }

      .universe-btn-primary {
        background: #062abb;
        color: white;
      }

      .universe-btn-primary:hover {
        background: #0a4bb8;
        transform: translateY(-2px);
      }

      .universe-btn-google {
        background: #4285f4;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
      }

      .universe-btn-google:hover {
        background: #3367d6;
      }

      .universe-btn-secondary {
        background: #6c757d;
        color: white;
      }

      .universe-btn-secondary:hover {
        background: #545b62;
      }

      .universe-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        font-size: 1.5rem;
        cursor: pointer;
        color: #6c757d;
      }

      .universe-message {
        padding: 0.8rem;
        border-radius: 8px;
        margin-bottom: 1rem;
        display: none;
      }

      .universe-message.error {
        background: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
      }

      .universe-message.success {
        background: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
      }

      .universe-loading {
        display: none;
        text-align: center;
        padding: 1rem;
        color: #062abb;
      }

      .universe-loading.show {
        display: block;
      }

      .universe-user-panel {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .universe-user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #062abb;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
      }

      .universe-user-info {
        display: flex;
        flex-direction: column;
      }

      .universe-user-name {
        font-weight: 600;
        color: #333;
      }

      .universe-user-email {
        font-size: 0.9rem;
        color: #666;
      }

      .universe-login-btn {
        padding: 0.5rem 1rem;
        background: #062abb;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 500;
        transition: background 0.3s;
      }

      .universe-login-btn:hover {
        background: #0a4bb8;
      }

      /* Dark theme support */
      .dark-theme .universe-modal-content {
        background: #2d3748;
        color: #e2e8f0;
      }

      .dark-theme .universe-form-group input {
        background: #4a5568;
        border-color: #718096;
        color: #e2e8f0;
      }

      .dark-theme .universe-form-group label {
        color: #e2e8f0;
      }

      .dark-theme .universe-tabs {
        background: #4a5568;
      }

      .dark-theme .universe-tab {
        color: #e2e8f0;
      }

      /* Animations */
      .universe-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }

      .universe-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      }

      .fade-in {
        animation: fadeIn 0.5s ease;
      }

      .slide-in {
        animation: slideIn 0.5s ease;
      }

      @keyframes slideIn {
        from { transform: translateX(-20px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.id = 'universe-auth-styles';
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
  }

  injectModal() {
    if (document.getElementById('universe-auth-modal')) return;

    const modalHTML = `
      <div id="universe-auth-modal" class="universe-modal">
        <div class="universe-modal-content">
          <span class="universe-close" onclick="universeAuth.closeModal()">&times;</span>
          <div class="universe-modal-header">
            <h2>Вход в UniVerse</h2>
            <p>Найдите свой идеальный университет</p>
          </div>

          <div class="universe-tabs">
            <button class="universe-tab active" onclick="universeAuth.switchTab('login')">Вход</button>
            <button class="universe-tab" onclick="universeAuth.switchTab('register')">Регистрация</button>
          </div>

          <div id="universe-message" class="universe-message"></div>
          <div id="universe-loading" class="universe-loading">
            <i class="fas fa-spinner fa-spin"></i> Загрузка...
          </div>

          <!-- Login Form -->
          <form id="universe-login-form" class="universe-form" style="display: block;">
            <div class="universe-form-group">
              <label for="login-email">Email</label>
              <input type="email" id="login-email" required>
            </div>
            <div class="universe-form-group">
              <label for="login-password">Пароль</label>
              <input type="password" id="login-password" required>
            </div>
            <div class="universe-form-group" id="twofa-group" style="display: none;">
              <label for="twofa-code">Код 2FA</label>
              <input type="text" id="twofa-code" placeholder="000000">
            </div>
            <button type="submit" class="universe-btn universe-btn-primary">Войти</button>
            <button type="button" class="universe-btn universe-btn-google" onclick="universeAuth.googleLogin()">
              <i class="fab fa-google"></i> Войти через Google
            </button>
            <button type="button" class="universe-btn universe-btn-secondary" onclick="universeAuth.forgotPassword()">
              Забыли пароль?
            </button>
          </form>

          <!-- Register Form -->
          <form id="universe-register-form" class="universe-form" style="display: none;">
            <div class="universe-form-group">
              <label for="register-name">Имя</label>
              <input type="text" id="register-name" required>
            </div>
            <div class="universe-form-group">
              <label for="register-email">Email</label>
              <input type="email" id="register-email" required>
            </div>
            <div class="universe-form-group">
              <label for="register-phone">Телефон (опционально)</label>
              <input type="tel" id="register-phone">
            </div>
            <div class="universe-form-group">
              <label for="register-password">Пароль</label>
              <input type="password" id="register-password" required minlength="8">
            </div>
            <div class="universe-form-group">
              <label for="register-confirm-password">Подтвердите пароль</label>
              <input type="password" id="register-confirm-password" required minlength="8">
            </div>
            <button type="submit" class="universe-btn universe-btn-primary">Зарегистрироваться</button>
          </form>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Form handlers
    document.getElementById('universe-login-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      const twofaCode = document.getElementById('twofa-code').value;

      const result = await this.login(email, password, twofaCode);

      if (result.requires2FA) {
        document.getElementById('twofa-group').style.display = 'block';
        document.getElementById('twofa-code').focus();
      }
    });

    document.getElementById('universe-register-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('register-name').value;
      const email = document.getElementById('register-email').value;
      const phone = document.getElementById('register-phone').value;
      const password = document.getElementById('register-password').value;
      const confirmPassword = document.getElementById('register-confirm-password').value;

      if (password !== confirmPassword) {
        this.showError('Пароли не совпадают');
        return;
      }

      await this.register(name, email, phone, password);
    });
  }

  switchTab(tab) {
    const loginForm = document.getElementById('universe-login-form');
    const registerForm = document.getElementById('universe-register-form');
    const loginTab = document.querySelector('.universe-tab:nth-child(1)');
    const registerTab = document.querySelector('.universe-tab:nth-child(2)');

    if (tab === 'login') {
      loginForm.style.display = 'block';
      registerForm.style.display = 'none';
      loginTab.classList.add('active');
      registerTab.classList.remove('active');
    } else {
      loginForm.style.display = 'none';
      registerForm.style.display = 'block';
      loginTab.classList.remove('active');
      registerTab.classList.add('active');
    }

    this.clearMessages();
  }

  openModal() {
    const modal = document.getElementById('universe-auth-modal');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  closeModal() {
    const modal = document.getElementById('universe-auth-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      this.clearMessages();
      document.getElementById('twofa-group').style.display = 'none';
    }
  }

  updateUI() {
    // Update user panels across all pages
    const userPanels = document.querySelectorAll('.universe-user-panel');
    const loginBtns = document.querySelectorAll('.universe-login-btn');

    if (this.isAuthenticated()) {
      userPanels.forEach(panel => {
        panel.style.display = 'flex';
        const avatar = panel.querySelector('.universe-user-avatar');
        const name = panel.querySelector('.universe-user-name');
        const email = panel.querySelector('.universe-user-email');

        if (avatar) avatar.textContent = this.currentUser.name.charAt(0).toUpperCase();
        if (name) name.textContent = this.currentUser.name;
        if (email) email.textContent = this.currentUser.email;
      });
      loginBtns.forEach(btn => btn.style.display = 'none');
    } else {
      userPanels.forEach(panel => panel.style.display = 'none');
      loginBtns.forEach(btn => btn.style.display = 'inline-block');
    }
  }

  showError(message) {
    this.showMessage(message, 'error');
  }

  showSuccess(message) {
    this.showMessage(message, 'success');
  }

  showMessage(message, type) {
    const messageEl = document.getElementById('universe-message');
    if (messageEl) {
      messageEl.textContent = message;
      messageEl.className = `universe-message ${type}`;
      messageEl.style.display = 'block';
      setTimeout(() => {
        messageEl.style.display = 'none';
      }, 5000);
    }
  }

  clearMessages() {
    const messageEl = document.getElementById('universe-message');
    if (messageEl) {
      messageEl.style.display = 'none';
    }
  }

  showLoading(message) {
    const loadingEl = document.getElementById('universe-loading');
    if (loadingEl) {
      loadingEl.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${message}`;
      loadingEl.classList.add('show');
    }
  }

  hideLoading() {
    const loadingEl = document.getElementById('universe-loading');
    if (loadingEl) {
      loadingEl.classList.remove('show');
    }
  }

  forgotPassword() {
    const email = prompt('Введите ваш email для восстановления пароля:');
    if (email) {
      // This would call the backend forgot password endpoint
      alert('Функция восстановления пароля будет реализована в ближайшее время.');
    }
  }

  // Favorites methods
  async addToFavorites(universityId) {
    try {
      const response = await fetch(`${this.baseURL}/add-favorite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.accessToken}`
        },
        body: JSON.stringify({ universityId })
      });

      const data = await response.json();

      if (response.ok) {
        // Update current user favorites
        if (this.currentUser) {
          this.currentUser.favorites = data.favorites;
        }
        return { success: true, favorites: data.favorites };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Add to favorites error:', error);
      return { success: false, error: 'Network error' };
    }
  }

  async removeFromFavorites(universityId) {
    try {
      const response = await fetch(`${this.baseURL}/remove-favorite`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.accessToken}`
        },
        body: JSON.stringify({ universityId })
      });

      const data = await response.json();

      if (response.ok) {
        // Update current user favorites
        if (this.currentUser) {
          this.currentUser.favorites = data.favorites;
        }
        return { success: true, favorites: data.favorites };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Remove from favorites error:', error);
      return { success: false, error: 'Network error' };
    }
  }

  async getFavorites() {
    try {
      const response = await fetch(`${this.baseURL}/favorites`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, favorites: data.favorites };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Get favorites error:', error);
      return { success: false, error: 'Network error' };
    }
  }

  isFavorite(universityId) {
    if (!this.currentUser || !this.currentUser.favorites) {
      return false;
    }
    return this.currentUser.favorites.some(fav => fav._id === universityId || fav === universityId);
  }
}

// Initialize global instance
const universeAuth = new UniverseAuth();

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = UniverseAuth;
}
    if (users.some(u => u.email === email)) {
      return { success: false, error: 'Email уже зарегистрирован' };
    }

    // Create user
    const newUser = {
      id: Date.now(),
      name,
      email,
      phone: phone.trim(),
      password,
      bio: '',
      city: '',
      picture: null,
      provider: 'local',
      isEmailVerified: false,
      isPhoneVerified: false,
      createdAt: new Date().toISOString(),
      favorites: []
    };

    users.push(newUser);
    this.saveAllUsers(users);
    this.saveUser(newUser);

    return { success: true, user: newUser };
  }

  login(email, password) {
    email = email.trim().toLowerCase();
    password = password.trim();

    if (!email || !password) {
      return { success: false, error: 'Email и пароль обязательны' };
    }

    const users = this.getAllUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return { success: false, error: 'Неверный email или пароль' };
    }

    this.saveUser(user);
    return { success: true, user };
  }

  logout() {
    localStorage.removeItem('universe_currentUser');
    this.currentUser = null;
  }

  isAuthenticated() {
    return !!this.currentUser;
  }

  setupAuthUI() {
    // Добавить глобальные стили если их нет
    if (!document.getElementById('universe-auth-styles')) {
      const style = document.createElement('style');
      style.id = 'universe-auth-styles';
      style.textContent = `
        .universe-auth-modal {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          z-index: 10000;
          align-items: center;
          justify-content: center;
        }

        .universe-auth-modal.active {
          display: flex;
        }

        .universe-auth-content {
          background: white;
          border-radius: 20px;
          padding: 2.5rem;
          width: 95%;
          max-width: 500px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
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

        .universe-auth-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .universe-auth-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: #062abb;
        }

        .universe-auth-close {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #999;
        }

        .universe-auth-tabs {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          border-bottom: 2px solid #e0e0e0;
        }

        .universe-auth-tab {
          background: none;
          border: none;
          padding: 1rem 1.5rem;
          font-weight: 600;
          color: #999;
          cursor: pointer;
          border-bottom: 3px solid transparent;
          position: relative;
          bottom: -2px;
        }

        .universe-auth-tab.active {
          color: #062abb;
          border-bottom-color: #062abb;
        }

        .universe-auth-tab-content {
          display: none;
        }

        .universe-auth-tab-content.active {
          display: block;
        }

        .universe-form-group {
          margin-bottom: 1.5rem;
        }

        .universe-form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #555;
        }

        .universe-form-group input {
          width: 100%;
          padding: 0.8rem;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s;
        }

        .universe-form-group input:focus {
          outline: none;
          border-color: #062abb;
          background: #f0f7ff;
        }

        .universe-btn {
          width: 100%;
          padding: 0.8rem;
          background: #062abb;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 1rem;
        }

        .universe-btn:hover {
          background: #0a4bb8;
          transform: translateY(-2px);
        }

        .universe-error {
          background: #ffe0e0;
          color: #ff6b6b;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1rem;
        }

        .universe-success {
          background: #e8f5e9;
          color: #2ecc71;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1rem;
        }
      `;
      document.head.appendChild(style);
    }
  }

  createModalHTML() {
    return `
      <div class="universe-auth-modal" id="universeAuthModal">
        <div class="universe-auth-content">
          <div class="universe-auth-header">
            <h2 class="universe-auth-title" id="universeAuthTitle">Вход</h2>
            <button class="universe-auth-close" onclick="universeAuth.closeModal()">×</button>
          </div>

          <div id="universeAuthMessage"></div>

          <div class="universe-auth-tabs">
            <button class="universe-auth-tab active" onclick="universeAuth.switchTab('login')">Вход</button>
            <button class="universe-auth-tab" onclick="universeAuth.switchTab('register')">Регистрация</button>
          </div>

          <!-- LOGIN TAB -->
          <div id="universeLoginTab" class="universe-auth-tab-content active">
            <form onsubmit="universeAuth.handleLogin(event)">
              <div class="universe-form-group">
                <label>Email</label>
                <input type="email" id="universeLoginEmail" required placeholder="your@email.com">
              </div>

              <div class="universe-form-group">
                <label>Пароль</label>
                <input type="password" id="universeLoginPassword" required placeholder="••••••••">
              </div>

              <button type="submit" class="universe-btn">
                Войти
              </button>
            </form>
          </div>

          <!-- REGISTER TAB -->
          <div id="universeRegisterTab" class="universe-auth-tab-content">
            <form onsubmit="universeAuth.handleRegister(event)">
              <div class="universe-form-group">
                <label>Полное имя</label>
                <input type="text" id="universeRegisterName" required placeholder="Иван Иванов">
              </div>

              <div class="universe-form-group">
                <label>Email</label>
                <input type="email" id="universeRegisterEmail" required placeholder="your@email.com">
              </div>

              <div class="universe-form-group">
                <label>Номер телефона (опционально)</label>
                <input type="tel" id="universeRegisterPhone" placeholder="+7 (XXX) XXX-XX-XX">
              </div>

              <div class="universe-form-group">
                <label>Пароль</label>
                <input type="password" id="universeRegisterPassword" required placeholder="Минимум 8 символов" minlength="8">
              </div>

              <div class="universe-form-group">
                <label>Подтверждение пароля</label>
                <input type="password" id="universeRegisterPasswordConfirm" required placeholder="Подтвердите пароль" minlength="8">
              </div>

              <button type="submit" class="universe-btn">
                Создать аккаунт
              </button>
            </form>
          </div>
        </div>
      </div>
    `;
  }

  openModal() {
    let modal = document.getElementById('universeAuthModal');
    if (!modal) {
      document.body.insertAdjacentHTML('beforeend', this.createModalHTML());
      modal = document.getElementById('universeAuthModal');
    }
    modal.classList.add('active');
  }

  closeModal() {
    const modal = document.getElementById('universeAuthModal');
    if (modal) {
      modal.classList.remove('active');
      this.clearMessages();
    }
  }

  switchTab(tab) {
    document.querySelectorAll('.universe-auth-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.universe-auth-tab-content').forEach(t => t.classList.remove('active'));

    event.target.classList.add('active');
    document.getElementById('universe' + tab.charAt(0).toUpperCase() + tab.slice(1) + 'Tab').classList.add('active');

    const title = document.getElementById('universeAuthTitle');
    title.textContent = tab === 'login' ? 'Вход' : 'Регистрация';
  }

  handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('universeLoginEmail').value;
    const password = document.getElementById('universeLoginPassword').value;

    const result = this.login(email, password);

    if (result.success) {
      this.showSuccess('✅ Вы успешно вошли!');
      setTimeout(() => {
        this.closeModal();
        window.location.reload();
      }, 1000);
    } else {
      this.showError(result.error);
    }
  }

  handleRegister(e) {
    e.preventDefault();

    const name = document.getElementById('universeRegisterName').value;
    const email = document.getElementById('universeRegisterEmail').value;
    const phone = document.getElementById('universeRegisterPhone').value;
    const password = document.getElementById('universeRegisterPassword').value;
    const passwordConfirm = document.getElementById('universeRegisterPasswordConfirm').value;

    if (password !== passwordConfirm) {
      this.showError('Пароли не совпадают');
      return;
    }

    const result = this.register(name, email, phone, password);

    if (result.success) {
      this.showSuccess('✅ Аккаунт создан успешно! Перенаправление...');
      setTimeout(() => {
        this.closeModal();
        window.location.reload();
      }, 1000);
    } else {
      this.showError(result.error);
    }
  }

  showError(message) {
    const container = document.getElementById('universeAuthMessage');
    container.innerHTML = `<div class="universe-error"><i class="fas fa-exclamation-circle"></i> ${message}</div>`;
  }

  showSuccess(message) {
    const container = document.getElementById('universeAuthMessage');
    container.innerHTML = `<div class="universe-success"><i class="fas fa-check-circle"></i> ${message}</div>`;
  }

  clearMessages() {
    const container = document.getElementById('universeAuthMessage');
    if (container) {
      container.innerHTML = '';
    }
  }
}

// Initialize globally
const universeAuth = new UniverseAuth();
