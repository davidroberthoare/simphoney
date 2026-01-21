// Initialize app -------------------------------------
// Initialize app -------------------------------------
// Initialize app -------------------------------------

// Load saved settings before initializing app
let savedData = localStorage.getItem('simphoneyAppData');
let savedSettings = savedData ? JSON.parse(savedData).global : { os: 'ios', dark_mode: false };

var app = new Framework7({
  el: '#app',
  theme: savedSettings.os || 'ios',
  dark: savedSettings.dark_mode || false,
  panel: { swipe: true },
  touch: { tapHold: true },
  // keyboard: {
  //   enabled: true,
  //   resize: true,
  //   resizePage: true,
  //   resizeDelay: 200,
  // },
  input: {
    scrollIntoViewOnFocus: true,
    scrollIntoViewCentered: true,
    scrollIntoViewAlways: true,
  },
  routes: [
    { path: '/', name: 'home', componentUrl: './pages/home.html' },
    { path: '/global/', name: 'global', componentUrl: './pages/global.html' },
    { path: '/notification/', name: 'notification', componentUrl: './pages/notification.html' },
    { path: '/notification_edit/', name: 'notification_edit', componentUrl: './pages/notification_edit.html' },
    { path: '/sms/', name: 'sms', componentUrl: './pages/sms.html' },
    { path: '/sms_edit/', name: 'sms_edit', componentUrl: './pages/sms_edit.html' },
    { path: '/email/', name: 'email', componentUrl: './pages/email.html' },
    { path: '/email_edit/', name: 'email_edit', componentUrl: './pages/email_edit.html' },
    { path: '/call_in/', name: 'call_in', componentUrl: './pages/call_in.html' },
    { path: '/call_in_edit/', name: 'call_in_edit', componentUrl: './pages/call_in_edit.html' },
    { path: '/call_out/', name: 'call_out', componentUrl: './pages/call_out.html' },
    { path: '/call_out_edit/', name: 'call_out_edit', componentUrl: './pages/call_out_edit.html' },
    { path: '/remote/', name: 'remote', componentUrl: './pages/remote.html' },
  ]
});

// Get the main view with hash routing enabled
var mainView = app.views.create('.view-main');

var $$ = Dom7;  //for Dom7 usage

// MAIN DATA FOR APP
var appData = {}; //holds all app data including sims and global settings
var currentSim = {};  //used to hold the currently edited sim object

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

// Apply dark mode on initial load if enabled
if (appData.global.dark_mode) {
  document.documentElement.classList.add('dark');
}

// Theme switching functions
function applyTheme(theme) {
  if (theme === 'ios' || theme === 'md') {
    // Framework7 requires a page reload to change themes
    // Save the preference and reload
    appData.global.os = theme;
    saveAppData();
    window.location.reload();
  }
}

function applyDarkMode(isDark) {
  const htmlEl = document.documentElement;
  if (isDark) {
    htmlEl.classList.add('dark');
  } else {
    htmlEl.classList.remove('dark');
  }
}


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




