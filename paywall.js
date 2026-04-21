(function () {
  if (!window.location.pathname.startsWith('/univer/')) {
    return;
  }

  const path = window.location.pathname;
  if (!path.endsWith('.html')) {
    return;
  }

  function ensureClientId() {
    const key = 'findu2_client_id';
    let clientId = localStorage.getItem(key);

    if (!clientId) {
      const random = Math.random().toString(36).slice(2);
      clientId = `client_${Date.now()}_${random}`;
      localStorage.setItem(key, clientId);
    }

    return clientId;
  }

  function getAccessToken() {
    return localStorage.getItem('universe_accessToken') || localStorage.getItem('accessToken') || '';
  }

  function buildUniversityId(premiumPath) {
    return premiumPath.replace(/^\//, '').replace(/\.html$/, '');
  }

  function isPremiumPage(currentPath) {
    return /1\.html$/i.test(currentPath);
  }

  function toPreviewPath(currentPath) {
    return currentPath.replace(/1\.html$/i, '.html');
  }

  function toPremiumPath(currentPath) {
    return currentPath.replace(/\.html$/i, '1.html');
  }

  const premium = isPremiumPage(path);
  const previewPath = premium ? toPreviewPath(path) : path;
  const premiumPath = premium ? path : toPremiumPath(path);
  const universityId = buildUniversityId(premiumPath);
  const clientId = ensureClientId();

  async function checkAccess() {
    const token = getAccessToken();

    const query = new URLSearchParams({
      universityId,
      clientId,
    });

    const response = await fetch(`/api/subscriptions/status?${query.toString()}`, {
      credentials: 'same-origin',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    if (!response.ok) {
      throw new Error('status-check-failed');
    }

    return response.json();
  }

  function openCheckout() {
    const params = new URLSearchParams({
      universityId,
      previewPath,
      premiumPath,
    });

    window.location.href = `/subscription/checkout.html?${params.toString()}`;
  }

  function addPreviewGate() {
    const gate = document.createElement('div');
    gate.style.position = 'fixed';
    gate.style.right = '14px';
    gate.style.bottom = '14px';
    gate.style.zIndex = '9999';
    gate.style.maxWidth = '340px';
    gate.style.background = 'linear-gradient(140deg, #0a2c84, #1a4ec4)';
    gate.style.color = '#fff';
    gate.style.borderRadius = '14px';
    gate.style.boxShadow = '0 10px 28px rgba(0,0,0,0.24)';
    gate.style.padding = '14px';

    gate.innerHTML = [
      '<div style="font-size:14px;line-height:1.4;margin-bottom:10px;">',
      'Полная информация по этому университету доступна по подписке: <strong>$1</strong>. Регистрация не обязательна.',
      '</div>',
      '<button id="findu2-open-sub" style="border:none;cursor:pointer;width:100%;border-radius:10px;padding:10px 12px;background:#ffffff;color:#0f337f;font-weight:700;">',
      'Открыть доступ к полной странице',
      '</button>'
    ].join('');

    document.body.appendChild(gate);

    const button = document.getElementById('findu2-open-sub');
    if (button) {
      button.addEventListener('click', openCheckout);
    }
  }

  async function protectPremiumPage() {
    try {
      const status = await checkAccess();
      if (!status.active) {
        const params = new URLSearchParams({
          access: 'required',
          auth: status.unauthenticated ? 'required' : 'ok',
        });
        window.location.replace(`${previewPath}?${params.toString()}`);
      }
    } catch (error) {
      const params = new URLSearchParams({ access: 'required' });
      window.location.replace(`${previewPath}?${params.toString()}`);
    }
  }

  if (premium) {
    protectPremiumPage();
  } else {
    addPreviewGate();
  }
})();
