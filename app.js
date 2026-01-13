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
  appData = {
    global: {
      dark_mode: false,
      os: 'ios',
      background_img: 'img/bg_default.jpg',
    },
    sims: {
      s_1: {
        id: 's_1',
        type: 'notification',
        name: 'Sample Notification',
        delay: 1,
        trigger_type: 'timed',
        sent_time: 'now',
        sender_name: 'Sender Name',
        sender_image: generateRandomAvatar(),
        message: 'This is an example notification message.',
      },
      s_2: {
        id: 's_2',
        type: 'notification',
        name: 'Another Notice',
        delay: 3,
        trigger_type: 'timed',
        sent_time: '12:30pm',
        sender_name: 'Your Friend',
        sender_image: generateRandomAvatar(),
        message: 'Here is the message.',
      },
      s_3: {
        id: 's_3',
        type: 'sms',
        name: 'Sample SMS',
        delay: 5,
        trigger_type: 'timed',
        sender_name: 'Your Friend',
        sender_image: generateRandomAvatar(),
        receiver_name: 'My Name',
        receiver_image: generateRandomAvatar(),
        messages: [
          { from: 'sender', text: 'Hey, how are you?' },
          { from: 'receiver', text: 'I am good, thanks! How about you?' },
          { from: 'sender', text: 'Doing well, just wanted to check in.' },
        ],
      }
    },
  };
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



// global page navigation function
// function navigateTo(route) {
  // console.log("navigateTo called with route:", route);
    // // console.log("Navigating to:", route);
    // if (route !== "/global/") {
    //   // enter fullscreen mode for other pages
    //   enterFullscreen();
    // } else {
    //   // ensure we exit fullscreen when going to global
    //   exitFullscreen();
    // }
    // mainView.router.navigate(route);
// }

// Fullscreen helpers using standard browser Fullscreen API
function enterFullscreen() {
  const docEl = document.documentElement;
  if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
    if (docEl.requestFullscreen) {
      docEl.requestFullscreen().catch((err) => console.warn('Failed to enter fullscreen:', err));
    } else if (docEl.webkitRequestFullscreen) {
      docEl.webkitRequestFullscreen();
    } else if (docEl.msRequestFullscreen) {
      docEl.msRequestFullscreen();
    }
  }
}

function exitFullscreen() {
  if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
    if (document.exitFullscreen) {
      document.exitFullscreen().catch((err) => console.warn('Failed to exit fullscreen:', err));
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}





// UTILITY FUNCTIONS -------------------------------------
// UTILITY FUNCTIONS -------------------------------------
// UTILITY FUNCTIONS -------------------------------------

// Generate a unique ID
function generateUniqueId() {
  return 'sim-' + Math.random().toString(36).slice(2, 16);
}

// generate random placeholder avatars  
function generateRandomAvatar(id) {
  if (typeof id === 'undefined' || id === null) {
    id = Date.now();
  }
  const avatar = 'https://testingbot.com/free-online-tools/random-avatar/150?u=' + id;
  return avatar;
}

// generate random placeholder avatars  
function generateRandomBackground(id) {
  if (typeof id === 'undefined' || id === null) {
    id = Date.now();
  }
  const bg = `https://picsum.photos/id/${id}/750/1334.jpg`;
  return bg;
}


// IMAGE UPLOAD HANDLER ****************************
// IMAGE UPLOAD HANDLER ****************************
// IMAGE UPLOAD HANDLER ****************************

// Convert image to base64
function imageFileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const base64Data = e.target.result;
        resolve(base64Data);
      } catch (error) {
        console.error('Error converting image to base64:', error);
        reject(error);
      }
    };
    reader.onerror = function () {
      reject(new Error('Error reading file'));
    };
    reader.readAsDataURL(file);
  });
}

// // Resize and compress image to base64
// async function resizeImageToBase64(file, maxWidth = 150, maxHeight = 150, quality = 0.7) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = function (e) {
//       const img = new Image();
//       img.onload = function () {
//         const canvas = document.createElement('canvas');
//         let width = img.width;
//         let height = img.height;
        
//         // Calculate new dimensions maintaining aspect ratio
//         if (width > height) {
//           if (width > maxWidth) {
//             height = Math.round((height * maxWidth) / width);
//             width = maxWidth;
//           }
//         } else {
//           if (height > maxHeight) {
//             width = Math.round((width * maxHeight) / height);
//             height = maxHeight;
//           }
//         }
        
//         canvas.width = width;
//         canvas.height = height;
//         const ctx = canvas.getContext('2d');
//         ctx.drawImage(img, 0, 0, width, height);
        
//         // Convert to base64 with compression
//         const base64Data = canvas.toDataURL('image/jpeg', quality);
//         resolve(base64Data);
//       };
//       img.onerror = () => reject(new Error('Failed to load image'));
//       img.src = e.target.result;
//     };
//     reader.onerror = () => reject(new Error('Error reading file'));
//     reader.readAsDataURL(file);
//   });
// }

