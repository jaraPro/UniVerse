// Получаем пользователей из LocalStorage
function getUsers() {
  return JSON.parse(localStorage.getItem("universe_users")) || [];
}

// Сохраняем пользователей
function saveUsers(users) {
  localStorage.setItem("universe_users", JSON.stringify(users));
}

// ====== РЕГИСТРАЦИЯ ======
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Проверки
    if (!username) {
      alert("Пожалуйста, введите имя пользователя");
      return;
    }

    if (!email) {
      alert("Пожалуйста, введите электронную почту");
      return;
    }

    if (password.length < 6) {
      alert("Пароль должен содержать минимум 6 символов");
      return;
    }

    let users = getUsers();

    // Проверка на существующий email
    if (users.find(user => user.email === email)) {
      alert("Пользователь с этой почтой уже существует!");
      return;
    }

    users.push({ username, email, password });
    saveUsers(users);

    alert("Регистрация успешна! Теперь войдите в свой аккаунт.");
    window.location.href = "login.html";
  });
}

// ====== АВТОРИЗАЦИЯ ======
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    if (!email) {
      alert("Пожалуйста, введите электронную почту");
      return;
    }

    if (!password) {
      alert("Пожалуйста, введите пароль");
      return;
    }

    let users = getUsers();

    const user = users.find(
      user => user.email === email && user.password === password
    );

    if (!user) {
      alert("Неверный email или пароль");
      return;
    }

    localStorage.setItem("universe_currentUser", JSON.stringify(user));
    alert("Добро пожаловать, " + user.username + "!");
    window.location.href = "index2.html";
  });
}

// ====== DASHBOARD ======
const welcomeUser = document.getElementById("welcomeUser");

if (welcomeUser) {
  const currentUser = JSON.parse(localStorage.getItem("universe_currentUser"));

  if (!currentUser) {
    window.location.href = "login.html";
  } else {
    welcomeUser.innerText = "Привет, " + currentUser.username + "!";
  }
}

// ====== ВЫХОД ======
function logout() {
  localStorage.removeItem("universe_currentUser");
  window.location.href = "login.html";
}

// Глобальная переменная для хранения текущего режима Google Login
let googleLoginMode = 'login';

// Приём сообщений из popup (OAuth fallback)
window.addEventListener('message', function(e) {
  try {
    if (!e.data) return;
    if (e.data.type === 'google_oauth' && e.data.id_token) {
      console.log('Получен id_token через postMessage');
      processGoogleLoginResponse({ credential: e.data.id_token });
    }
  } catch (err) {
    console.error('Ошибка при получении сообщения из popup:', err);
  }
});

// ====== GOOGLE SIGN-IN処理（共通） ======
function handleGoogleLogin(mode = 'login') {
  googleLoginMode = mode;
  const clientId = '983371437398-lcqaf62o1d096mrfauipfj5dqar5an0u.apps.googleusercontent.com';
  const redirectUri = window.location.origin + '/google-callback.html';
  
  // Параметры Google OAuth
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'id_token',
    scope: 'openid email profile',
    nonce: Math.random().toString(36).substring(2)
  });
  
  // Открываем Google login в popup
  const width = 500, height = 600;
  const left = (screen.width - width) / 2;
  const top = (screen.height - height) / 2;
  
  window.googlePopup = window.open(
    'https://accounts.google.com/o/oauth2/v2/auth?' + params.toString(),
    'google-login',
    `width=${width},height=${height},left=${left},top=${top}`
  );
}

function showGoogleSignInInfo() {
  alert('⚠️ Вход через Google недоступен\n\nДля активации функции:\n\n1. Перейдите на https://console.cloud.google.com\n2. Создайте новый проект\n3. Включите Google+ API\n4. Создайте OAuth 2.0 учетные данные (Web приложение)\n5. Добавьте http://localhost:4000 в авторизованные источники JavaScript\n6. Замените client_id в коде на ваш реальный ID');
}

function processGoogleLoginResponse(response) {
  console.log('processGoogleLoginResponse вызвана');
  console.log('Response получен:', response ? 'ДА' : 'НЕТ');
  console.log('Режим:', googleLoginMode);
  
  try {
    const mode = googleLoginMode; // Используем сохранённый режим
    
    if (!response.credential) {
      console.error('No credential in response');
      alert('Ошибка при входе через Google. Попробуйте снова.');
      return;
    }
    
    console.log('Credential получен, длина:', response.credential.length);

    // Декодируем JWT токен из Google
    const token = response.credential;
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    
    let jsonPayload = '';
    try {
      jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
    } catch (e) {
      console.error('Ошибка декодирования токена:', e);
      alert('Ошибка при обработке данных Google');
      return;
    }

    const userData = JSON.parse(jsonPayload);

    // Создаем объект пользователя
    const googleUser = {
      username: userData.name || 'Пользователь',
      email: userData.email,
      password: 'google_' + userData.sub,
      google_id: userData.sub,
      picture: userData.picture
    };

    let users = getUsers();

    if (mode === 'register') {
      // Регистрация
      if (users.find(u => u.email === googleUser.email)) {
        // Если пользователь существует, просто логиним его
        const existingUser = users.find(u => u.email === googleUser.email);
        localStorage.setItem('universe_currentUser', JSON.stringify(existingUser));
        alert('Добро пожаловать, ' + existingUser.username + '!');
      } else {
        // Если нет, создаем нового
        users.push(googleUser);
        saveUsers(users);
        localStorage.setItem('universe_currentUser', JSON.stringify(googleUser));
        alert('Вы успешно зарегистрировались через Google!');
      }
    } else {
      // Вход
      let user = users.find(u => u.email === googleUser.email);

      if (!user) {
        // Если пользователя нет, создаем его
        users.push(googleUser);
        saveUsers(users);
        user = googleUser;
      }

      localStorage.setItem('universe_currentUser', JSON.stringify(user));
      alert('Добро пожаловать, ' + user.username + '!');
    }

    window.location.href = 'index2.html';
  } catch (error) {
    console.error('Ошибка обработки ответа Google:', error);
    alert('Произошла ошибка при входе через Google. Попробуйте еще раз.');
  }
}