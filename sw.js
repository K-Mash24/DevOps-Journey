// 🔄 UPDATE THIS VERSION EVERY TIME YOU DEPLOY CHANGES
// Format: YYYY-MM-DD-sequential (e.g., 2026-06-11-v1, 2026-06-11-v2, 2026-06-12-v1)
// Added icons to manifest.json

const CACHE_NAME = 'devops-journey-2026-06-12-v7.8';

const urlsToCache = [
  '/',
  '/index.html',
  '/html/networking.html',
  '/html/linux.html',
  '/style.css',
  '/js/global.js',
  '/js/networking.js',
  '/js/Linux.js',        
  '/manifest.json',
  '/img/Logo.svg',
  '/img/Network.svg',
  '/img/linux-icon.svg'
];

self.addEventListener('install', event => {
  console.log('[SW] Installing new version:', CACHE_NAME);
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  console.log('[SW] Activating:', CACHE_NAME);
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  if (url.pathname.endsWith('.html') || url.pathname === '/') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => caches.match(event.request))
    );
  } else {
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
  }
});