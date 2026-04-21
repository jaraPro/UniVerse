(function () {
  if (typeof document === 'undefined') {
    return;
  }

  if (document.getElementById('designSwitcher')) {
    return;
  }

  var style = document.createElement('style');
  style.id = 'design-switcher-index2-style';
  style.textContent = [
    '.design-switcher{position:fixed;right:20px;top:86px;z-index:1200;display:flex;flex-direction:column;align-items:flex-end;gap:.5rem}',
    '.design-toggle-float{display:flex;align-items:center;gap:.4rem;padding:.65rem .95rem;border-radius:999px;border:1px solid rgba(255,255,255,.22);background:rgba(10,12,20,.78);color:#f2f6ff;backdrop-filter:blur(8px);box-shadow:0 10px 24px rgba(0,0,0,.28);cursor:pointer;font-weight:600;font-size:.88rem;transition:all .25s ease}',
    '.design-toggle-float:hover{transform:translateY(-2px);background:rgba(255,255,255,.92);color:#101827}',
    '.design-menu{display:none;min-width:250px;border-radius:14px;border:1px solid rgba(255,255,255,.22);background:rgba(10,12,20,.88);backdrop-filter:blur(12px);box-shadow:0 14px 30px rgba(0,0,0,.32);padding:.45rem}',
    '.design-menu.open{display:grid;gap:.35rem}',
    '.design-option{width:100%;text-align:left;border:none;border-radius:10px;padding:.58rem .72rem;background:rgba(255,255,255,.06);color:#eef2ff;cursor:pointer;font-size:.86rem;font-weight:600;transition:all .2s ease}',
    '.design-option:hover{background:rgba(255,255,255,.18)}',
    '.design-option.active{background:rgba(255,255,255,.92);color:#0f172a}',
    'body.old-design .design-toggle-float{background:#062abb;color:#fff;border:1px solid rgba(255,255,255,.45);backdrop-filter:none}',
    'body.old-design .design-menu{background:rgba(32,56,162,.92);border-color:rgba(255,255,255,.35)}',
    'body.dark-design{background:radial-gradient(circle at 15% -10%,rgba(140,170,255,.22) 0%,transparent 35%),radial-gradient(circle at 85% 8%,rgba(153,223,255,.16) 0%,transparent 35%),#020308 !important;color:#eaf1ff}',
    'body.dark-design .navbar,body.dark-design header{background:rgba(10,12,20,.72)!important;color:#fff!important;border:1px solid rgba(255,255,255,.12)!important;box-shadow:0 12px 28px rgba(0,0,0,.28)!important;backdrop-filter:blur(12px)!important}',
    'body.dark-design .logo i{color:#cfd6ea!important}',
    'body.dark-design .nav-btn,body.dark-design .nav button,body.dark-design header button{background:rgba(255,255,255,.06)!important;color:#e8edff!important;border:1px solid rgba(255,255,255,.16)!important}',
    'body.dark-design .page-tabs{background:rgba(255,255,255,.08)!important;border-bottom:1px solid rgba(255,255,255,.18)!important}',
    'body.dark-design .page-tab{color:#fff!important;border:1px solid rgba(255,255,255,.25)!important;background:rgba(255,255,255,.08)!important}',
    'body.dark-design .page-tab.active,body.dark-design .page-tab:hover{background:#fff!important;color:#101827!important;border-color:#fff!important}',
    'body.white-design{background:#fff !important;color:#1f2937}',
    'body.white-design .navbar,body.white-design header{background:#fff!important;color:#111827!important;border:1px solid rgba(15,23,42,.12)!important;box-shadow:0 8px 18px rgba(15,23,42,.1)!important;backdrop-filter:none!important}',
    'body.white-design .logo,body.white-design .logo i{color:#111827!important}',
    'body.white-design .nav-btn,body.white-design .nav button,body.white-design header button{color:#111827!important;background:#eef2f7!important;border:1px solid #d7dee9!important}',
    'body.white-design .nav-btn:hover,body.white-design .nav-btn.active-nav-btn,body.white-design .nav button:hover,body.white-design header button:hover{background:#111827!important;color:#fff!important;border-color:#111827!important}',
    'body.white-design .page-tabs{background:linear-gradient(180deg,#fff 0%,#f6f8fc 100%)!important;border-top:1px solid rgba(15,23,42,.08)!important;border-bottom:1px solid rgba(15,23,42,.12)!important;box-shadow:0 6px 16px rgba(15,23,42,.08)!important;backdrop-filter:none!important}',
    'body.white-design .page-tab{color:#1f2937!important;background:#eef2f7!important;border:1px solid #d7dee9!important;box-shadow:0 2px 6px rgba(15,23,42,.06)!important}',
    'body.white-design .page-tab:hover,body.white-design .page-tab.active{background:#111827!important;color:#fff!important;border-color:#111827!important}',
    'body.white-design .design-toggle-float{background:#fff;color:#111827;border:1px solid rgba(15,23,42,.18);backdrop-filter:none}',
    'body.white-design .design-menu{background:#fff;border-color:rgba(15,23,42,.16);backdrop-filter:none;box-shadow:0 10px 24px rgba(15,23,42,.16)}',
    'body.white-design .design-option{background:#f3f4f6;color:#111827}',
    'body.white-design .design-option:hover{background:#e5e7eb}',
    'body.white-design .design-option.active{background:#111827;color:#fff}',
    '.university-name-favorite-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap}',
    '.university-name-favorite-row .fav-title-btn{width:74px!important;height:46px!important;min-width:74px!important;padding:0 12px!important;border-radius:999px!important;font-size:0!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;line-height:1!important}',
    '.university-name-favorite-row .fav-title-btn::before{content:"\\2661";font-size:1.45rem;line-height:1;color:#64748b;transition:color .2s ease,transform .2s ease}',
    '.university-name-favorite-row .fav-title-btn.favorited::before{content:"\\2665";color:#e11d48;transform:scale(1.05)}',
    '@media (max-width:768px){.university-name-favorite-row{gap:8px}.university-name-favorite-row .fav-title-btn{width:66px!important;height:42px!important;min-width:66px!important;padding:0 10px!important}}',
    '.subscription-more-btn{width:100%!important;margin-top:8px!important}',
    '.subscription-status-box{border-radius:12px;padding:12px 14px;font-size:14px;display:none;margin-top:10px}',
    '.subscription-status-box.ok{background:#e9fbe9;border:1px solid #98d198;color:#216521}',
    '.subscription-status-box.info{background:#eef4ff;border:1px solid #b8caf8;color:#24428c}',
    '.uni-map-address-layout{display:grid;grid-template-columns:minmax(360px,1.55fr) minmax(240px,1fr);gap:14px;align-items:stretch;margin-top:10px}',
    '.uni-map-address-layout .uni-map-box{border-radius:14px;overflow:hidden;border:1px solid rgba(16,32,63,.15);background:#fff;min-height:260px}',
    '.uni-map-address-layout .uni-map-box iframe{width:100%!important;height:100%!important;min-height:260px;border:0;display:block}',
    '.uni-address-card{border-radius:14px;border:1px solid rgba(16,32,63,.15);background:linear-gradient(180deg,#ffffff 0%,#f7faff 100%);padding:14px 14px 12px;display:flex;flex-direction:column;justify-content:center}',
    '.uni-address-label{margin:0 0 8px;font-size:.82rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#3659a6}',
    '.uni-address-text{margin:0;font-size:.98rem;line-height:1.55;color:#1f2a38;font-weight:600}',
    '@media (max-width:980px){.uni-map-address-layout{grid-template-columns:1fr}.uni-map-address-layout .uni-map-box iframe{min-height:240px}}',
    '@media (max-width:768px){.design-switcher{right:12px;top:74px}.design-toggle-float{padding:.58rem .8rem;font-size:.82rem}.design-menu{min-width:220px}}'
  ].join('');
  document.head.appendChild(style);

  var path = (window.location && window.location.pathname) || '';
  var isUniversityPage = path.indexOf('/univer/') !== -1;
  if (isUniversityPage) {
    var luxe = document.createElement('style');
    luxe.id = 'design-switcher-univer-luxe-style';
    luxe.textContent = [
      'body.old-design{background:radial-gradient(circle at 12% 12%,rgba(47,128,237,.16),transparent 40%),radial-gradient(circle at 86% 22%,rgba(13,71,161,.12),transparent 44%),linear-gradient(135deg,#f7faff 0%,#eaf0ff 44%,#f9fbff 100%)!important;color:#10203f!important}',
      'body.old-design header{background:linear-gradient(135deg,#ffffff 0%,#f3f7ff 100%)!important;border:1px solid #d9e4ff!important;border-radius:22px!important;margin:16px auto 0!important;max-width:1320px!important;width:calc(100% - 48px)!important;box-shadow:0 18px 34px rgba(18,52,160,.14)!important;padding:14px 20px!important}',
      'body.old-design .nav button,body.old-design header button{background:#ffffff!important;border:1px solid #cbd9ff!important;color:#1f2a38!important;box-shadow:0 6px 14px rgba(17,24,39,.08)!important}',
      'body.old-design .card-hero{background:linear-gradient(180deg,#ffffff 0%,#f8fbff 100%)!important;border:1px solid #d6e3ff!important;box-shadow:0 28px 48px rgba(21,54,132,.16)!important}',
      'body.old-design .campus-carousel{background:#dfe9ff!important}',
      'body.old-design .card-content h2,body.old-design .section-title{color:#14357f!important}',
      'body.old-design .fact{background:linear-gradient(180deg,#f7fbff 0%,#eef4ff 100%)!important;border:1px solid #d5e2ff!important}',
      'body.old-design .chip{background:#e8f0ff!important;border:1px solid #cadeff!important;color:#294987!important}',
      'body.old-design .action-btn,body.old-design .btn-main{background:#ffffff!important;border:1px solid rgba(16,32,63,.2)!important;color:#10203f!important}',
      'body.old-design .btn-primary,body.old-design .filters button{background:linear-gradient(135deg,#062abb,#0a4bb8)!important;color:#fff!important}',

      'body.dark-design{background:radial-gradient(circle at 15% -10%,rgba(140,170,255,.18) 0%,transparent 35%),radial-gradient(circle at 85% 8%,rgba(153,223,255,.12) 0%,transparent 35%),#020308!important;color:#eaf1ff!important}',
      'body.dark-design header{background:linear-gradient(135deg,rgba(10,12,20,.95),rgba(18,24,38,.95))!important;border:1px solid rgba(255,255,255,.12)!important;border-radius:22px!important;margin:16px auto 0!important;max-width:1320px!important;width:calc(100% - 48px)!important;box-shadow:0 18px 34px rgba(0,0,0,.38)!important;padding:14px 20px!important}',
      'body.dark-design h1,body.dark-design .brand-subtitle,body.dark-design .card-content h2,body.dark-design .section-title,body.dark-design .dorm-name{color:#f3f6ff!important}',
      'body.dark-design .card-content p,body.dark-design .program-list,body.dark-design .fact span,body.dark-design .dorm-sub{color:#b8c5e8!important}',
      'body.dark-design .nav button,body.dark-design header button{background:rgba(255,255,255,.06)!important;border:1px solid rgba(255,255,255,.16)!important;color:#e8edff!important;backdrop-filter:blur(8px)!important}',
      'body.dark-design .card-hero,body.dark-design .hero-box,body.dark-design .details-box,body.dark-design .detail-card,body.dark-design .dorm-card,body.dark-design .feature-card,body.dark-design .status-box{background:rgba(12,16,28,.9)!important;border:1px solid rgba(255,255,255,.12)!important;box-shadow:0 20px 42px rgba(0,0,0,.36)!important;color:#eaf1ff!important}',
      'body.dark-design .campus-carousel,body.dark-design .dorm-cover{background:linear-gradient(135deg,#111827,#1f2937)!important;color:#f3f6ff!important}',
      'body.dark-design .fact{background:rgba(255,255,255,.04)!important;border:1px solid rgba(255,255,255,.12)!important}',
      'body.dark-design .fact strong,body.dark-design .price,body.dark-design .stat-card h3{color:#f3f6ff!important}',
      'body.dark-design .chip,body.dark-design .pill{background:rgba(255,255,255,.10)!important;border:1px solid rgba(255,255,255,.2)!important;color:#eaf1ff!important}',
      'body.dark-design .preview{background:rgba(255,255,255,.05)!important;border:1px dashed rgba(255,255,255,.24)!important;color:#d7e1ff!important}',
      'body.dark-design .btn-main,body.dark-design .btn-primary,body.dark-design .filters button{background:linear-gradient(135deg,#111827,#1f2937)!important;color:#fff!important;border:1px solid rgba(255,255,255,.16)!important;box-shadow:0 10px 22px rgba(0,0,0,.36)!important}',
      'body.dark-design .btn-secondary,body.dark-design .action-btn{background:rgba(255,255,255,.08)!important;border:1px solid rgba(255,255,255,.2)!important;color:#eaf1ff!important}',
      'body.dark-design .carousel-btn{background:rgba(255,255,255,.18)!important;color:#fff!important}',
      'body.dark-design .carousel-dot{background:rgba(255,255,255,.38)!important}',
      'body.dark-design .carousel-dot.active{background:#fff!important}',

      'body.white-design{background:#ffffff!important;color:#1f2937!important}',
      'body.white-design header{background:linear-gradient(135deg,#ffffff 0%,#f7f9fc 100%)!important;border:1px solid #e5e7eb!important;border-radius:22px!important;margin:16px auto 0!important;max-width:1320px!important;width:calc(100% - 48px)!important;box-shadow:0 14px 28px rgba(15,23,42,.12)!important;padding:14px 20px!important}',
      'body.white-design .brand-subtitle,body.white-design .card-content p,body.white-design .program-list,body.white-design .fact span,body.white-design .dorm-sub{color:#4b5563!important}',
      'body.white-design .card-hero,body.white-design .hero-box,body.white-design .details-box,body.white-design .detail-card,body.white-design .dorm-card,body.white-design .feature-card,body.white-design .status-box{background:#ffffff!important;border:1px solid #e5e7eb!important;box-shadow:0 12px 26px rgba(15,23,42,.08)!important}',
      'body.white-design .campus-carousel{background:#f3f4f6!important}',
      'body.white-design .fact{background:#f8fafc!important;border:1px solid #dfe6ef!important}',
      'body.white-design .fact strong,body.white-design .price,body.white-design .stat-card h3{color:#111827!important}',
      'body.white-design .chip,body.white-design .pill{background:#f3f4f6!important;border:1px solid #d1d5db!important;color:#374151!important}',
      'body.white-design .nav button,body.white-design header button{background:#f3f4f6!important;color:#111827!important;border:1px solid #d1d5db!important}',
      'body.white-design .nav button:hover,body.white-design header button:hover{background:#111827!important;color:#ffffff!important;border-color:#111827!important}',
      'body.white-design .btn-main,body.white-design .btn-primary,body.white-design .filters button{background:#111827!important;color:#fff!important;border:1px solid #111827!important}',
      'body.white-design .btn-secondary,body.white-design .action-btn{background:#f3f4f6!important;color:#111827!important;border:1px solid #d1d5db!important}',
      'body.white-design .preview{background:#f8fafc!important;border:1px dashed #d1d5db!important;color:#374151!important}',
      'body.white-design .carousel-btn{background:rgba(17,24,39,.62)!important;color:#fff!important}',

      '@media (max-width:820px){body.old-design header,body.dark-design header,body.white-design header{width:calc(100% - 24px)!important;padding:14px 12px!important}body.old-design .card-hero,body.dark-design .card-hero,body.white-design .card-hero{width:calc(100% - 24px)!important;border-radius:22px!important}}'
    ].join('');
    document.head.appendChild(luxe);
  }

  var switcher = document.createElement('div');
  switcher.className = 'design-switcher';
  switcher.id = 'designSwitcher';
  switcher.innerHTML = '' +
    '<button class="design-toggle-float" id="designToggleBtn" type="button">' +
    '<i class="fas fa-palette"></i> Выбор дизайна' +
    '</button>' +
    '<div class="design-menu" id="designMenu">' +
    '<button class="design-option" type="button" data-variant="old">Главный дизайн</button>' +
    '<button class="design-option" type="button" data-variant="dark">Тёмный</button>' +
    '<button class="design-option" type="button" data-variant="white">Белый</button>' +
    '</div>';

  document.body.appendChild(switcher);

  var KEY = 'universe_global_design_variant';

  function applyVariant() {
    var variant = localStorage.getItem(KEY) || 'old';
    var body = document.body;
    var button = document.getElementById('designToggleBtn');
    var menu = document.getElementById('designMenu');
    var options = document.querySelectorAll('.design-option');

    body.classList.remove('old-design', 'dark-design', 'white-design');
    if (variant === 'dark') {
      body.classList.add('dark-design');
    } else if (variant === 'white') {
      body.classList.add('white-design');
    } else {
      body.classList.add('old-design');
    }

    if (button) {
      var label = variant === 'white' ? 'Белый дизайн' : (variant === 'dark' ? 'Тёмный дизайн' : 'Главный дизайн');
      button.innerHTML = '<i class="fas fa-palette"></i> ' + label;
    }

    options.forEach(function (opt) {
      opt.classList.toggle('active', opt.getAttribute('data-variant') === variant);
    });

    if (menu) {
      menu.classList.remove('open');
    }
  }

  switcher.addEventListener('click', function (event) {
    var target = event.target;
    var button = document.getElementById('designToggleBtn');
    var menu = document.getElementById('designMenu');
    if (!menu || !button) {
      return;
    }

    if (target.closest('#designToggleBtn')) {
      event.stopPropagation();
      menu.classList.toggle('open');
      return;
    }

    var option = target.closest('.design-option');
    if (option) {
      localStorage.setItem(KEY, option.getAttribute('data-variant') || 'old');
      applyVariant();
    }
  });

  document.addEventListener('click', function (event) {
    var menu = document.getElementById('designMenu');
    if (!menu) {
      return;
    }
    if (!switcher.contains(event.target)) {
      menu.classList.remove('open');
    }
  });

  function ensureFavoriteButtonNearUniversityName() {
    var currentPath = (window.location && window.location.pathname) || '';
    var decodedPath = decodeURIComponent(currentPath);
    var targetPaths = {
      '/univer/kazakhstan/Almaty/КаzАСТ.html': true,
      '/univer/kazakhstan/Almaty/almau.html': true,
      '/univer/kazakhstan/Almaty/aty.html': true,
      '/univer/kazakhstan/Almaty/CAU.html': true,
      '/univer/kazakhstan/Almaty/Civil_Aviation_Academy.html': true,
      '/univer/kazakhstan/Almaty/DMU Kazakhstan.html': true,
      '/univer/kazakhstan/Almaty/ety.html': true,
      '/univer/kazakhstan/Almaty/EYIK.html': true,
      '/univer/kazakhstan/Almaty/gumaniter.html': true,
      '/univer/kazakhstan/Almaty/kaynar.html': true,
      '/univer/kazakhstan/Almaty/KazADImG.html': true,
      '/univer/kazakhstan/Almaty/KazATiSO.html': true,
      '/univer/kazakhstan/Almaty/KazMUNO.html': true,
      '/univer/kazakhstan/Almaty/KazNaC.html': true,
      '/univer/kazakhstan/Almaty/KazNAI.html': true,
      '/univer/kazakhstan/Almaty/KazNAU.html': true,
      '/univer/kazakhstan/Almaty/KazNJP.html': true,
      '/univer/kazakhstan/Almaty/Kaznmy.html': true,
      '/univer/kazakhstan/Almaty/KazNPY.html': true,
      '/univer/kazakhstan/Almaty/kaznu.html': true,
      '/univer/kazakhstan/Almaty/Kimep.html': true,
      '/univer/kazakhstan/Almaty/Kunaeva.html': true,
      '/univer/kazakhstan/Almaty/METU.html': true,
      '/univer/kazakhstan/Almaty/MOK.html': true,
      '/univer/kazakhstan/Almaty/MTGU.html': true,
      '/univer/kazakhstan/Almaty/MUIT.html': true,
      '/univer/kazakhstan/Almaty/narhoz.html': true,
      '/univer/kazakhstan/Almaty/Satbayev.html': true,
      '/univer/kazakhstan/Almaty/Turan.html': true,
      '/univer/kazakhstan/Almaty/UIADK.html': true,
      '/univer/kazakhstan/Almaty/UIB.html': true,
      '/univer/kazakhstan/Almaty/univer_enerji.html': true,
      '/univer/kazakhstan/Astana/enu.html': true,
      '/univer/UST/mit.html': true,
      '/univer/Yaponiya/yaponiya.html': true
    };

    if (!targetPaths[currentPath] && !targetPaths[decodedPath]) {
      return;
    }

    var favoriteBtn = document.getElementById('favoriteBtn');
    if (!favoriteBtn || favoriteBtn.dataset.favNearUniversityName === '1') {
      return;
    }

    var title = document.querySelector('.card-content h2, .hero-text h2, .details-box h2, main h2, section h2, h2');
    if (!title || !title.parentElement) {
      return;
    }

    var row = title.parentElement.querySelector('.university-name-favorite-row');
    if (!row) {
      row = document.createElement('div');
      row.className = 'university-name-favorite-row';
      title.parentElement.insertBefore(row, title);
      row.appendChild(title);
    }

    row.appendChild(favoriteBtn);
    favoriteBtn.classList.add('fav-title-btn');
    favoriteBtn.setAttribute('aria-label', 'Избранное');
    favoriteBtn.setAttribute('title', 'Избранное');
    favoriteBtn.dataset.favNearUniversityName = '1';
  }

  function enhanceSubscriptionButtonsForListedPages() {
    var currentPath = (window.location && window.location.pathname) || '';
    var decodedPath = decodeURIComponent(currentPath);
    var targetPaths = {
      '/univer/kazakhstan/Almaty/КаzАСТ.html': true,
      '/univer/kazakhstan/Almaty/almau.html': true,
      '/univer/kazakhstan/Almaty/aty.html': true,
      '/univer/kazakhstan/Almaty/CAU.html': true,
      '/univer/kazakhstan/Almaty/Civil_Aviation_Academy.html': true,
      '/univer/kazakhstan/Almaty/DMU Kazakhstan.html': true,
      '/univer/kazakhstan/Almaty/ety.html': true,
      '/univer/kazakhstan/Almaty/EYIK.html': true,
      '/univer/kazakhstan/Almaty/gumaniter.html': true,
      '/univer/kazakhstan/Almaty/kaynar.html': true,
      '/univer/kazakhstan/Almaty/KazADImG.html': true,
      '/univer/kazakhstan/Almaty/KazATiSO.html': true,
      '/univer/kazakhstan/Almaty/KazMUNO.html': true,
      '/univer/kazakhstan/Almaty/KazNaC.html': true,
      '/univer/kazakhstan/Almaty/KazNAI.html': true,
      '/univer/kazakhstan/Almaty/KazNAU.html': true,
      '/univer/kazakhstan/Almaty/KazNJP.html': true,
      '/univer/kazakhstan/Almaty/Kaznmy.html': true,
      '/univer/kazakhstan/Almaty/KazNPY.html': true,
      '/univer/kazakhstan/Almaty/kaznu.html': true,
      '/univer/kazakhstan/Almaty/Kimep.html': true,
      '/univer/kazakhstan/Almaty/Kunaeva.html': true,
      '/univer/kazakhstan/Almaty/METU.html': true,
      '/univer/kazakhstan/Almaty/MOK.html': true,
      '/univer/kazakhstan/Almaty/MTGU.html': true,
      '/univer/kazakhstan/Almaty/MUIT.html': true,
      '/univer/kazakhstan/Almaty/narhoz.html': true,
      '/univer/kazakhstan/Almaty/Satbayev.html': true,
      '/univer/kazakhstan/Almaty/Turan.html': true,
      '/univer/kazakhstan/Almaty/UIADK.html': true,
      '/univer/kazakhstan/Almaty/UIB.html': true,
      '/univer/kazakhstan/Almaty/univer_enerji.html': true,
      '/univer/kazakhstan/Astana/enu.html': true,
      '/univer/Yaponiya/yaponiya.html': true
    };

    if (!targetPaths[currentPath] && !targetPaths[decodedPath]) {
      return;
    }

    var content = document.querySelector('.card-content, .hero-content, .details-box, .details-content, .content');
    if (!content) {
      return;
    }

    var actionRow = content.querySelector('.action-row');
    if (!actionRow) {
      actionRow = document.createElement('div');
      actionRow.className = 'action-row';
      content.appendChild(actionRow);
    }

    var subscribeBtn = document.getElementById('subscribeBtn');
    if (subscribeBtn) {
      subscribeBtn.remove();
    }

    var openFullBtn = document.getElementById('openFullBtn');
    if (!openFullBtn) {
      openFullBtn = document.createElement('button');
      openFullBtn.id = 'openFullBtn';
      openFullBtn.type = 'button';
      openFullBtn.className = 'action-btn';
      content.appendChild(openFullBtn);
    }

    openFullBtn.textContent = 'Подробнее';
    openFullBtn.classList.add('subscription-more-btn');
    openFullBtn.removeAttribute('onclick');

    if (openFullBtn.parentElement === actionRow) {
      content.insertBefore(openFullBtn, actionRow.nextSibling);
    }

    var statusBox = document.getElementById('subscriptionStatusBox');
    if (!statusBox) {
      statusBox = document.createElement('div');
      statusBox.id = 'subscriptionStatusBox';
      statusBox.className = 'subscription-status-box';
      content.insertBefore(statusBox, actionRow);
    }

    var previewPath = currentPath;
    var premiumPath = currentPath.replace(/\.html$/i, '1.html');
    var universityId = premiumPath.replace(/\.html$/i, '').replace(/^\/+/, '');

    function showStatus(message, type) {
      statusBox.textContent = message;
      statusBox.className = 'subscription-status-box ' + type;
      statusBox.style.display = 'block';
    }

    function goToSubscriptionCheckout(event) {
      if (event && typeof event.preventDefault === 'function') {
        event.preventDefault();
      }

      var query = new URLSearchParams({
        universityId: universityId,
        previewPath: previewPath,
        premiumPath: premiumPath
      });

      window.location.href = '/subscription/checkout.html?' + query.toString();
    }

    openFullBtn.onclick = goToSubscriptionCheckout;

    var params = new URLSearchParams(window.location.search || '');
    if (params.get('paid') === '1') {
      showStatus('Оплата прошла успешно. Подписка активирована.', 'ok');
    } else if (params.get('access') === 'required') {
      showStatus('Для просмотра полной информации нужна отдельная подписка.', 'info');
    } else if (params.get('auth') === 'required') {
      showStatus('Подписка работает без регистрации на этом устройстве.', 'info');
    }
  }

  function removeBriefUniversityTitleForListedPages() {
    var currentPath = (window.location && window.location.pathname) || '';
    var decodedPath = decodeURIComponent(currentPath);
    var targetPaths = {
      '/univer/kazakhstan/Almaty/КаzАСТ.html': true,
      '/univer/kazakhstan/Almaty/almau.html': true,
      '/univer/kazakhstan/Almaty/aty.html': true,
      '/univer/kazakhstan/Almaty/CAU.html': true,
      '/univer/kazakhstan/Almaty/Civil_Aviation_Academy.html': true,
      '/univer/kazakhstan/Almaty/DMU Kazakhstan.html': true,
      '/univer/kazakhstan/Almaty/ety.html': true,
      '/univer/kazakhstan/Almaty/EYIK.html': true,
      '/univer/kazakhstan/Almaty/gumaniter.html': true,
      '/univer/kazakhstan/Almaty/kaynar.html': true,
      '/univer/kazakhstan/Almaty/KazADImG.html': true,
      '/univer/kazakhstan/Almaty/KazATiSO.html': true,
      '/univer/kazakhstan/Almaty/KazMUNO.html': true,
      '/univer/kazakhstan/Almaty/KazNaC.html': true,
      '/univer/kazakhstan/Almaty/KazNAI.html': true,
      '/univer/kazakhstan/Almaty/KazNAU.html': true,
      '/univer/kazakhstan/Almaty/KazNJP.html': true,
      '/univer/kazakhstan/Almaty/Kaznmy.html': true,
      '/univer/kazakhstan/Almaty/KazNPY.html': true,
      '/univer/kazakhstan/Almaty/kaznu.html': true,
      '/univer/kazakhstan/Almaty/Kimep.html': true,
      '/univer/kazakhstan/Almaty/Kunaeva.html': true,
      '/univer/kazakhstan/Almaty/METU.html': true,
      '/univer/kazakhstan/Almaty/MOK.html': true,
      '/univer/kazakhstan/Almaty/MTGU.html': true,
      '/univer/kazakhstan/Almaty/MUIT.html': true,
      '/univer/kazakhstan/Almaty/narhoz.html': true,
      '/univer/kazakhstan/Almaty/Satbayev.html': true,
      '/univer/kazakhstan/Almaty/Turan.html': true,
      '/univer/kazakhstan/Almaty/UIADK.html': true,
      '/univer/kazakhstan/Almaty/UIB.html': true,
      '/univer/kazakhstan/Almaty/univer_enerji.html': true,
      '/univer/kazakhstan/Astana/enu.html': true,
      '/univer/UST/mit.html': true,
      '/univer/Yaponiya/yaponiya.html': true
    };

    if (!targetPaths[currentPath] && !targetPaths[decodedPath]) {
      return;
    }

    var headings = Array.prototype.slice.call(document.querySelectorAll('h3.section-title, h3, h2'));
    headings.forEach(function (heading) {
      var text = (heading.textContent || '').trim();
      if (text === 'Кратко об университете' || text === 'К - Кратко об университете' || text === 'К - вот это убери') {
        heading.remove();
      }
    });
  }

  function enhanceMapAddressLayoutForListedPages() {
    var currentPath = (window.location && window.location.pathname) || '';
    var decodedPath = decodeURIComponent(currentPath);
    var targetPaths = {
      '/univer/kazakhstan/Almaty/КаzАСТ.html': true,
      '/univer/kazakhstan/Almaty/almau.html': true,
      '/univer/kazakhstan/Almaty/aty.html': true,
      '/univer/kazakhstan/Almaty/CAU.html': true,
      '/univer/kazakhstan/Almaty/Civil_Aviation_Academy.html': true,
      '/univer/kazakhstan/Almaty/DMU Kazakhstan.html': true,
      '/univer/kazakhstan/Almaty/ety.html': true,
      '/univer/kazakhstan/Almaty/EYIK.html': true,
      '/univer/kazakhstan/Almaty/gumaniter.html': true,
      '/univer/kazakhstan/Almaty/kaynar.html': true,
      '/univer/kazakhstan/Almaty/KazADImG.html': true,
      '/univer/kazakhstan/Almaty/KazATiSO.html': true,
      '/univer/kazakhstan/Almaty/KazMUNO.html': true,
      '/univer/kazakhstan/Almaty/KazNaC.html': true,
      '/univer/kazakhstan/Almaty/KazNAI.html': true,
      '/univer/kazakhstan/Almaty/KazNAU.html': true,
      '/univer/kazakhstan/Almaty/KazNJP.html': true,
      '/univer/kazakhstan/Almaty/Kaznmy.html': true,
      '/univer/kazakhstan/Almaty/KazNPY.html': true,
      '/univer/kazakhstan/Almaty/kaznu.html': true,
      '/univer/kazakhstan/Almaty/Kimep.html': true,
      '/univer/kazakhstan/Almaty/Kunaeva.html': true,
      '/univer/kazakhstan/Almaty/METU.html': true,
      '/univer/kazakhstan/Almaty/MOK.html': true,
      '/univer/kazakhstan/Almaty/MTGU.html': true,
      '/univer/kazakhstan/Almaty/MUIT.html': true,
      '/univer/kazakhstan/Almaty/narhoz.html': true,
      '/univer/kazakhstan/Almaty/Satbayev.html': true,
      '/univer/kazakhstan/Almaty/Turan.html': true,
      '/univer/kazakhstan/Almaty/UIADK.html': true,
      '/univer/kazakhstan/Almaty/UIB.html': true,
      '/univer/kazakhstan/Almaty/univer_enerji.html': true,
      '/univer/kazakhstan/Astana/enu.html': true,
      '/univer/UST/mit.html': true,
      '/univer/Yaponiya/yaponiya.html': true
    };

    if (!targetPaths[currentPath] && !targetPaths[decodedPath]) {
      return;
    }

    var section = document.querySelector('section[data-uni-quick-info]');
    if (!section) {
      return;
    }

    var iframe = section.querySelector('iframe');
    if (!iframe) {
      return;
    }

    var mapHeading = null;
    var headings = Array.prototype.slice.call(section.querySelectorAll('h3.section-title, h3'));
    headings.forEach(function (heading) {
      var text = (heading.textContent || '').trim().toLowerCase();
      if (!mapHeading && text.indexOf('расположение на карте') !== -1) {
        mapHeading = heading;
      }
    });

    if (!mapHeading) {
      return;
    }

    var mapBox = iframe.parentElement;
    if (!mapBox) {
      return;
    }
    mapBox.classList.add('uni-map-box');

    var universityTitleNode = document.querySelector('.card-content h2, .hero-content h2, h2, h1');
    var universityName = universityTitleNode ? (universityTitleNode.textContent || '').trim() : '';

    var exactMapQueryByPath = {
      '/univer/UST/mit.html': 'Massachusetts Institute of Technology, 77 Massachusetts Ave, Cambridge, MA 02139, USA',
      '/univer/kazakhstan/Astana/enu.html': 'L.N. Gumilyov Eurasian National University, Astana, Kazakhstan'
    };

    var cityContext = '';
    var introForCity = section.querySelector('p');
    if (introForCity) {
      var cityMatch = (introForCity.textContent || '').match(/в городе\s+([^\.]+)/i);
      if (cityMatch && cityMatch[1]) {
        cityContext = cityMatch[1].trim();
      }
    }

    if (!cityContext) {
      var oldSrc = iframe.getAttribute('src') || '';
      var oldQueryMatch = oldSrc.match(/[?&]q=([^&]+)/i);
      if (oldQueryMatch && oldQueryMatch[1]) {
        cityContext = decodeURIComponent(oldQueryMatch[1]).replace(/\+/g, ' ').trim();
      }
    }

    var mapQuery = '';
    if (exactMapQueryByPath[currentPath]) {
      mapQuery = exactMapQueryByPath[currentPath];
    } else if (exactMapQueryByPath[decodedPath]) {
      mapQuery = exactMapQueryByPath[decodedPath];
    } else if (universityName && cityContext) {
      mapQuery = universityName + ', ' + cityContext;
    } else if (universityName) {
      mapQuery = universityName;
    } else if (cityContext) {
      mapQuery = cityContext;
    }

    if (mapQuery) {
      var encodedMapQuery = encodeURIComponent(mapQuery);
      iframe.setAttribute('src', 'https://maps.google.com/maps?q=' + encodedMapQuery + '&z=16&output=embed');
      iframe.setAttribute('loading', 'lazy');
      iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
    }

    var layout = section.querySelector('.uni-map-address-layout');
    if (!layout) {
      layout = document.createElement('div');
      layout.className = 'uni-map-address-layout';
      mapHeading.insertAdjacentElement('afterend', layout);
    }

    if (mapBox.parentElement !== layout) {
      layout.appendChild(mapBox);
    }

    var infoText = '';
    var exactAddressByPath = {
      '/univer/UST/mit.html': '77 Massachusetts Ave, Cambridge, MA 02139, USA',
      '/univer/kazakhstan/Astana/enu.html': 'ул. Каныша Сатпаева, 2, Астана, Казахстан'
    };

    if (exactAddressByPath[currentPath]) {
      infoText = exactAddressByPath[currentPath];
    } else if (exactAddressByPath[decodedPath]) {
      infoText = exactAddressByPath[decodedPath];
    }

    var intro = section.querySelector('p');
    if (!infoText && intro) {
      var match = (intro.textContent || '').match(/в городе\s+([^\.]+)/i);
      if (match && match[1]) {
        var cityText = match[1].trim();
        infoText = universityName ? (universityName + ', ' + cityText) : cityText;
      }
    }

    if (!infoText) {
      var src = iframe.getAttribute('src') || '';
      var queryMatch = src.match(/[?&]q=([^&]+)/i);
      if (queryMatch && queryMatch[1]) {
        var locationText = decodeURIComponent(queryMatch[1]).replace(/\+/g, ' ').trim();
        infoText = universityName ? (universityName + ', ' + locationText) : locationText;
      }
    }

    if (!infoText) {
      var title = document.querySelector('h1, h2');
      infoText = title ? (title.textContent || '').trim() : 'Адрес университета уточняется';
    }

    var addressCard = section.querySelector('.uni-address-card');
    if (!addressCard) {
      addressCard = document.createElement('aside');
      addressCard.className = 'uni-address-card';
      layout.appendChild(addressCard);
    }

    addressCard.innerHTML = '' +
      '<p class="uni-address-label">Адрес университета</p>' +
      '<p class="uni-address-text">' + infoText + '</p>';
  }

  applyVariant();
  ensureFavoriteButtonNearUniversityName();
  enhanceSubscriptionButtonsForListedPages();
  removeBriefUniversityTitleForListedPages();
  enhanceMapAddressLayoutForListedPages();
})();