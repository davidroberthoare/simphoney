// Initialize app -------------------------------------
// Initialize app -------------------------------------
// Initialize app -------------------------------------

var app = new Framework7({
  el: '#app',
  theme: 'auto',
  panel: { swipe: true },
  touch: { tapHold: true },
  routes: [
    { path: '/', name: 'home', componentUrl: './pages/home.html' },
    { path: '/global/', name: 'global', componentUrl: './pages/global.html' },
    { path: '/notification/', name: 'notification', componentUrl: './pages/notification.html' },
    { path: '/notification_edit/', name: 'notification_edit', componentUrl: './pages/notification_edit.html' },
    { path: '/sms/', name: 'sms', componentUrl: './pages/sms.html' },
  ]
});

// Get the main view with hash routing enabled
var mainView = app.views.create('.view-main');

var $$ = Dom7;  //for Dom7 usage

// MAIN DATA FOR APP
var appData = {};

// Load appData from localStorage, initialize with default structure if not found
function loadAppData() {
  const stored = localStorage.getItem('simphoneyAppData');
  if (stored) {
    try {
      appData = JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse stored appData:', e);
      initializeDefaultAppData();
    }
  } else {
    initializeDefaultAppData();
  }
}

// Initialize appData with default structure
function initializeDefaultAppData() {
  appData = defaultAppData;
}


// APPDATA Save & Load----------------------------------
// APPDATA Save & Load----------------------------------
// APPDATA Save & Load----------------------------------

// Save appData to localStorage
function saveAppData() {
  try {
    console.log('Saving appData to localStorage:', appData);
    localStorage.setItem('simphoneyAppData', JSON.stringify(appData));
  } catch (e) {
    console.error('Failed to save appData to localStorage:', e);
  }
}

// Load data on app initialization
loadAppData();




// Fullscreen helpers using standard browser Fullscreen API
function enterFullscreen() {
  // const docEl = document.documentElement;
  // if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
  //   if (docEl.requestFullscreen) {
  //     docEl.requestFullscreen().catch((err) => console.warn('Failed to enter fullscreen:', err));
  //   } else if (docEl.webkitRequestFullscreen) {
  //     docEl.webkitRequestFullscreen();
  //   } else if (docEl.msRequestFullscreen) {
  //     docEl.msRequestFullscreen();
  //   }
  // }
}

function exitFullscreen() {
  // if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
  //   if (document.exitFullscreen) {
  //     document.exitFullscreen().catch((err) => console.warn('Failed to exit fullscreen:', err));
  //   } else if (document.webkitExitFullscreen) {
  //     document.webkitExitFullscreen();
  //   }
  // }
}




