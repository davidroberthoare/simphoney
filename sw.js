const CACHE_NAME = 'simphoney-v2';
const CACHE_ENABLED = false; // Set to true when ready for offline support

// Only cache external libraries during development
// When CACHE_ENABLED is true, local files will also be cached
const EXTERNAL_LIBS = [
  'https://unpkg.com/framework7@9.0.2/framework7-bundle.min.css',
  'https://unpkg.com/framework7@9.0.2/framework7-bundle.min.js',
  'https://unpkg.com/peerjs@1.5.4/dist/peerjs.min.js'
];

const LOCAL_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './utils.js',
  './default.js',
  './manifest.json'
];

self.addEventListener('install', event => {
  console.log('[SW] Installing service worker...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Always cache external libraries
      console.log('[SW] Caching external libraries...');
      return cache.addAll(EXTERNAL_LIBS).catch(err => {
        console.warn('[SW] Failed to cache some external libraries:', err);
      });
    })
  );
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

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Only use cache for external libraries or if cache is enabled
  const shouldCache = CACHE_ENABLED || EXTERNAL_LIBS.some(lib => event.request.url.includes(lib.split('?')[0]));
  
  if (!shouldCache) {
    // Bypass cache for local files during development
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
        // Return cached version as fallback
        return cached;
      });
    })
  );
});
