// 🔄 UPDATE THIS VERSION EVERY TIME YOU DEPLOY CHANGES
// Format: YYYY-MM-DD-sequential (e.g., 2026-06-11-v1, 2026-06-11-v2, 2026-06-12-v1)
// Integrated JS for the sidebar and styling

const CACHE_NAME = 'devops-journey-2026-07-06-v2';  // Update this version string with each deployment

const urlsToCache = [
  '/DevOps-Journey/',
  '/DevOps-Journey/index.html',
  '/DevOps-Journey/html/networking.html',
  '/DevOps-Journey/html/linux.html',
  '/DevOps-Journey/style.css',
  '/DevOps-Journey/js/global.js',
  '/DevOps-Journey/img/favicon.svg',
  '/DevOps-Journey/img/Logo.svg'
];

// Install event – cache essential files
self.addEventListener('install', event => {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Caching files');
        // Add each file individually to handle failures gracefully
        return Promise.allSettled(
          urlsToCache.map(url => 
            cache.add(url).catch(err => console.warn(`[SW] Failed to cache: ${url}`, err))
          )
        );
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event – clean up old caches
self.addEventListener('activate', event => {
  console.log('[SW] Activating...');
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
    }).then(() => self.clients.claim())
  );
});

// Fetch event – serve from cache, fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(response => {
          // Don't cache non-successful responses
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
          return response;
        });
      })
  );
});