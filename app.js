// Initialize app -------------------------------------
// Initialize app -------------------------------------
// Initialize app -------------------------------------

var app = new Framework7({
  el: '#app',
  theme: 'auto',
  panel: { swipe: true },
  touch: { tapHold: true },
  routes: [
    { path: '/', name: 'home', url: './pages/home.html' },
    { path: '/global/', name: 'global', url: './pages/global.html' },
    { path: '/notification/', name: 'notification', url: './pages/notification.html' },
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
        title: 'Hello!',
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
        title: 'This is the title',
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
function navigateTo(route) {
  saveAppData(); // Save data before navigating
  if (route == "/") {
    // console.log("going Back to:", route);
    mainView.router.back(route);
  } else {
    // console.log("Navigating to:", route);
    mainView.router.navigate(route);
  }
}




// SIM ACTIONS -------------------------------------
// SIM ACTIONS -------------------------------------
// SIM ACTIONS -------------------------------------

function playSim(simId) {
  const sim = appData.sims[simId];
  if (!sim) {
    console.error('Sim not found:', simId);
    return;
  }
  console.log('Playing sim:', sim);
  // Store current sim to play in a temporary variable or state
  appData.currentSim = sim;
  navigateTo('/' + sim.type + '/');
}

function editSim(simId) {
  const sim = appData.sims[simId];
  if (!sim) {
    console.error('Sim not found for editing:', simId);
    return;
  }
  console.log('Editing sim:', sim);
  // Store current sim to edit in a temporary variable or state
  appData.currentSim = sim;

  // open the appropriate editor popup or page based on sim type
  app.notification.create({
    title: "whoops",
    text: "No editor: " + sim.name,
    closeTimeout: 1000,
    closeOnClick: true,
  }).open();
}




// DOM Listeners -------------------------------------
// DOM Listeners -------------------------------------
// DOM Listeners -------------------------------------






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

