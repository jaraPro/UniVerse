// Google OAuth client ID for this app.
// 1) Создайте OAuth 2.0 Client ID (Web application) в Google Cloud Console:
//    https://console.cloud.google.com/apis/credentials
// 2) В разделе "Authorized JavaScript origins" добавьте ваш origin,
//    например http://localhost:4000 (или тот порт, где вы запускаете локальный сервер)
// 3) Вставьте полученный client ID ниже.

window.GOOGLE_CLIENT_ID = '983371437398-lcqaf62o1d096mrfauipfj5dqar5an0u.apps.googleusercontent.com';
console.log('Config.js загружена. Google Client ID установлен:', window.GOOGLE_CLIENT_ID.substring(0, 20) + '...');
