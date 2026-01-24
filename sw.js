const CACHE_NAME = 'simphoney-v3';
const CACHE_ENABLED = true; // Set to false to disable offline caching

// All files to cache for offline support
const CACHE_FILES = [
  './',
  './index.html',
  './about.html',
  './manifest.json',
  
  // CSS
  './css/framework7-bundle.min.css',
  './css/styles.css',
  
  // Fonts
  './css/fonts/Framework7Icons-Regular.woff',
  './css/fonts/Framework7Icons-Regular.woff2',
  './css/fonts/Framework7Icons-Regular.ttf',
  
  // JavaScript
  './js/app.js',
  './js/default.js',
  './js/utils.js',
  './js/random_users.js',
  './js/framework7-bundle.min.js',
  './js/peerjs.min.js',
  './js/howler.min.js',
  
  // Pages
  './pages/home.html',
  './pages/global.html',
  './pages/remote.html',
  './pages/notification.html',
  './pages/notification_edit.html',
  './pages/sms.html',
  './pages/sms_edit.html',
  './pages/email.html',
  './pages/email_edit.html',
  './pages/call_in.html',
  './pages/call_in_edit.html',
  './pages/call_out.html',
  './pages/call_out_edit.html',
  
  // Images
  './img/bg_default.jpg',
  
  // Icons
  './img/icons/favicon.ico',
  './img/icons/favicon.svg',
  './img/icons/apple-touch-icon.png',
  './img/icons/favicon-96x96.png',
  './img/icons/icon-192.png',
  './img/icons/icon-512.png',
  './img/icons/portrait.png',
  './img/icons/landscape.png',
  './img/icons/icons.json',
  
  // Sounds
  './sounds/alert_1.mp3',
  './sounds/alert_2.mp3',
  './sounds/alert_3.mp3',
  './sounds/ringtone_1.mp3',
  './sounds/ringtone_2.mp3',
  './sounds/ringtone_3.mp3',
  './sounds/ringtone_4.mp3',
  './sounds/ringtone_5.mp3',
  './sounds/ringtone_6.mp3',
  './sounds/ringtone_7.mp3',
  './sounds/ringtone_8.mp3',
  './sounds/ringtone_9.mp3',
  './sounds/ringtone_10.mp3',
  './sounds/ringtone_11.mp3',
  './sounds/ringtone_12.mp3',
  './sounds/ringtone_13.mp3',
  './sounds/ringtone_14.mp3',
  './sounds/ringtone_15.mp3',
  './sounds/ringtone_16.mp3',
  './sounds/ringtone_17.mp3',
  './sounds/ringtone_18.mp3',
  './sounds/ringtone_19.mp3',
  './sounds/ringtone_20.mp3',
  './sounds/vibration.mp3'
];

self.addEventListener('install', event => {
  console.log('[SW] Installing service worker...');
  
  if (CACHE_ENABLED) {
    event.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
        console.log('[SW] Caching all files for offline support...');
        return cache.addAll(CACHE_FILES).catch(err => {
          console.warn('[SW] Failed to cache some files:', err);
        });
      })
    );
  }
  
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('[SW] Activating service worker...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Listen for messages from the client
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('[SW] Received SKIP_WAITING message');
    self.skipWaiting();
  }
});

self.addEventListener('fetch', event => {
  // If caching is disabled, bypass cache entirely
  if (!CACHE_ENABLED) {
    return event.respondWith(fetch(event.request));
  }
  
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) {
        return cached;
      }
      
      return fetch(event.request).then(response => {
        // Cache the response for future use
        if (response.ok) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      }).catch(() => {
        // Return cached version as fallback if network fails
        return caches.match(event.request);
      });
    })
  );
});
