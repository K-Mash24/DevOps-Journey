const CACHE_NAME = 'devops-journey-v5.0';  // ← increment this when you make major changes

const urlsToCache = [
  '/',
  '/index.html',
  '/html/networking.html',   // ← fixed path (not /html/networking.html unless that's correct)
  '/html/linux.html',
  '/style.css',
  '/js/global.js',
  '/js/networking.js',
  '/img/Logo.svg'
];

// Install event - cache files
self.addEventListener('install', event => {
  self.skipWaiting();  // Force waiting service worker to become active
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();  // Take control of all clients immediately
});

// Fetch event - network-first strategy for HTML, cache-first for assets
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // For HTML files, try network first, fall back to cache
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
    // For CSS/JS/images, use cache-first
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
  }
});