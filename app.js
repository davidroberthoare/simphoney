(() => {
  console.log('SimPhone app.js loaded');
  window.addEventListener('error', function (e) {
    try {
      let el = document.getElementById('jsError');
      if (!el) { el = document.createElement('div'); el.id = 'jsError'; el.className = 'error-overlay'; document.body.appendChild(el); }
      el.textContent = (e && e.message ? e.message : String(e)) + '\n' + (e && e.filename ? e.filename + ':' + e.lineno : '');
    } catch (err) { /* ignore */ }
  });
  const STORAGE_KEY = 'simphone.notifications';
  const SETTINGS_KEY = 'simphone.settings';

  function $(id) { return document.getElementById(id); }

  function loadNotifications() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch (e) { return []; }
  }

  function saveNotifications(arr) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
  }

  function renderList() {
    const list = $("list");
    list.innerHTML = '';
    const items = loadNotifications();
    if (!items.length) { list.innerHTML = '<div class="empty">No notifications saved</div>'; return; }
    items.forEach((it, i) => {
      const el = document.createElement('div');
      el.className = 'saved';
      el.innerHTML = `<div class="saved-left"><img class="saved-icon" src="${it.icon||''}" alt=""></div>
        <div class="saved-body"><div class="saved-sender">${escapeHtml(it.sender)}</div>
        <div class="saved-msg">${escapeHtml(it.message)}</div></div>
        <div class="saved-actions">
          <button data-i="${i}" class="playItem">Play</button>
          <button data-i="${i}" class="deleteItem">Delete</button>
        </div>`;
      list.appendChild(el);
    });
    list.querySelectorAll('.playItem').forEach(b=>b.addEventListener('click', e=>{
      const i = +e.target.dataset.i; playNotification(i);
    }));
    list.querySelectorAll('.deleteItem').forEach(b=>b.addEventListener('click', e=>{
      const i = +e.target.dataset.i; deleteNotification(i);
    }));
  }

  function loadSettings(){
    try { return JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}'); } catch(e){ return {}; }
  }

  function saveSettings(obj){
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(obj));
  }

  function escapeHtml(s){ return (s+'').replace(/[&<>"]+/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c]||c)); }

  function deleteNotification(i){
    const arr = loadNotifications(); arr.splice(i,1); saveNotifications(arr); renderList();
  }

  function handleFileInput(file, cb){
    if (!file) return cb(null);
    const reader = new FileReader();
    reader.onload = ()=> cb(reader.result);
    reader.onerror = ()=> cb(null);
    reader.readAsDataURL(file);
  }

  function addNotification(obj){
    const arr = loadNotifications(); arr.unshift(obj); saveNotifications(arr); renderList();
  }

  function playNotification(index){
    const arr = loadNotifications();
    const item = arr[index];
    if (!item) return; enterPlayback(item);
  }

  function enterPlayback(item){
    document.getElementById('setup').classList.add('hidden');
    document.getElementById('playback').classList.remove('hidden');
    applyPlaybackSettings();
    // show popup a moment later
    setTimeout(()=> showPopup(item), 600);
  }

  function applyPlaybackSettings(){
    const s = loadSettings();
    const playback = document.getElementById('playback');
    playback.classList.remove('platform-android','platform-ios','theme-dark','theme-light');
    playback.classList.add(s.platform === 'ios' ? 'platform-ios' : 'platform-android');
    playback.classList.add(s.theme === 'dark' ? 'theme-dark' : 'theme-light');

    const iframe = $('bgIframe');
    const overlay = $('bgOverlay');
    // reset
    iframe.classList.add('hidden'); iframe.src = '';
    overlay.style.backgroundImage = '';
    overlay.style.backgroundColor = 'transparent';

    if (s.bgType === 'webpage' && s.bgUrl){
      iframe.classList.remove('hidden');
      iframe.src = s.bgUrl;
    } else {
      if (s.bgImage) overlay.style.backgroundImage = `url('${s.bgImage}')`;
      overlay.style.backgroundColor = s.bgColor || '#000';
    }
  }

  function showPopup(item){
    const popup = $('notificationPopup');
    $('popupSender').textContent = item.sender || '';
    $('popupMessage').textContent = item.message || '';
    $('popupIcon').src = item.icon || '';
    popup.classList.remove('hidden');
    // auto-hide after 6s
    clearTimeout(popup._timeout);
    popup._timeout = setTimeout(()=>{ popup.classList.add('hidden'); }, 6000);
  }

  function exitPlayback(){
    document.getElementById('playback').classList.add('hidden');
    document.getElementById('setup').classList.remove('hidden');
    const popup = $('notificationPopup'); popup.classList.add('hidden');
  }

  // Wire UI
  document.addEventListener('DOMContentLoaded', ()=>{
    renderList();
    // populate settings UI
    const settings = loadSettings();
    if (settings.bgType) {
      const radios = document.getElementsByName('bgType');
      radios.forEach(r=>{ if (r.value===settings.bgType) r.checked=true; });
    }
    if (settings.bgColor) $('bgColor').value = settings.bgColor;
    if (settings.bgUrl) $('bgUrl').value = settings.bgUrl;
    if (settings.platform) $('platformSelect').value = settings.platform;
    if (settings.theme) $('themeSelect').value = settings.theme;

    function updateBgModeUI(){
      const v = document.querySelector('input[name="bgType"]:checked').value;
      if (v === 'locked'){ $('bgLocked').classList.remove('hidden'); $('bgWebpage').classList.add('hidden'); }
      else { $('bgLocked').classList.add('hidden'); $('bgWebpage').classList.remove('hidden'); }
    }
    document.getElementsByName('bgType').forEach(r=>r.addEventListener('change', updateBgModeUI));
    updateBgModeUI();

    // tab switching (use preventDefault on anchors)
    const tabDesignBtn = $('tabDesignBtn');
    const tabSettingsBtn = $('tabSettingsBtn');
    if (tabDesignBtn) tabDesignBtn.addEventListener('click', (ev)=>{ ev.preventDefault(); $('tabDesign').classList.remove('hidden'); $('tabSettings').classList.add('hidden'); tabDesignBtn.classList.add('active'); tabSettingsBtn.classList.remove('active'); });
    if (tabSettingsBtn) tabSettingsBtn.addEventListener('click', (ev)=>{ ev.preventDefault(); $('tabDesign').classList.add('hidden'); $('tabSettings').classList.remove('hidden'); tabDesignBtn.classList.remove('active'); tabSettingsBtn.classList.add('active'); });

    $('saveBtn').addEventListener('click', ()=>{
      const sender = $('sender').value.trim();
      const message = $('message').value.trim();
      const file = $('iconFile').files[0];
      if (!sender || !message) { alert('Sender and message required'); return; }
      handleFileInput(file, dataUrl=>{
        addNotification({sender,message,icon:dataUrl});
        $('notifyForm').reset();
      });
    });

    // Save settings
    if ($('saveSettingsBtn')) $('saveSettingsBtn').addEventListener('click', ()=>{
      const bgType = document.querySelector('input[name="bgType"]:checked').value;
      const platform = $('platformSelect').value;
      const theme = $('themeSelect').value;
      const bgColor = $('bgColor').value;
      const file = $('bgImageFile').files[0];
      handleFileInput(file, dataUrl=>{
        const s = { bgType, platform, theme, bgColor, bgImage: dataUrl||null, bgUrl: $('bgUrl').value||'' };
        saveSettings(s);
        // apply immediately so playback preview works
        try { applyPlaybackSettings(); } catch (e) {}
        alert('Settings saved');
      });
    });

    $('playBtn').addEventListener('click', ()=>{
      const arr = loadNotifications();
      if (!arr.length) { alert('No saved notifications'); return; }
      enterPlayback(arr[0]);
    });

    $('backHotspot').addEventListener('click', ()=> exitPlayback());

    $('notificationPopup').addEventListener('click', ()=>{
      // simulate tapping notification — could expand to open conversation
      const popup = $('notificationPopup'); popup.classList.add('hidden');
    });

    // Service worker temporarily disabled for live testing
  });

})();
