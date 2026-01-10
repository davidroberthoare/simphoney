const CACHE_NAME = 'simphone-v1';
const ASSETS = [
  './', './index.html', './styles.css', './app.js', './manifest.json',
  'https://unpkg.com/framework7/framework7-bundle.min.css',
  'https://unpkg.com/framework7/framework7-bundle.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).catch(()=>cached)));
});
