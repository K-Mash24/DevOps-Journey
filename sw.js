// ============================================================
// SERVICE WORKER — Great Cheatsheets / DevOps Journey
// ============================================================
// 🔄 UPDATE THIS VERSION EVERY TIME YOU DEPLOY CHANGES
// Format: YYYY-MM-DD-sequential (e.g., 2026-07-06-v4)

const CACHE_NAME = 'devops-journey-2026-07-09-v1.5';

// ----- STATIC ASSETS TO CACHE ON INSTALL -----
const urlsToCache = [
  // Core pages
  '/DevOps-Journey/',
  '/DevOps-Journey/index.html',
  '/DevOps-Journey/style.css',
  
  // JavaScript — CRITICAL (without these, the site is broken)
  '/DevOps-Journey/js/global.js',
  '/DevOps-Journey/js/networking.js',
  '/DevOps-Journey/js/Linux.js',
  '/Devops-Journey/js/security.js',
  '/DevOps-Journey/js/stars.js',
  '/DevOps-Journey/js/themes.js',
  
  // HTML pages
  '/DevOps-Journey/html/networking.html',
  '/DevOps-Journey/html/linux.html',
  '/DevOps-Journey/html/security.html',
  
  // Assets
  '/DevOps-Journey/img/favicon.svg',
  '/DevOps-Journey/img/Logo.svg',  
  
  // PWA
  '/DevOps-Journey/manifest.json'
];

// ----- INSTALL — Cache static assets -----
self.addEventListener('install', event => {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Caching static files');
        // Add each file individually to handle failures gracefully
        return Promise.allSettled(
          urlsToCache.map(url => 
            cache.add(url).catch(err => 
              console.warn(`[SW] Failed to cache: ${url}`, err)
            )
          )
        );
      })
      .then(() => self.skipWaiting())
  );
});

// ----- ACTIVATE — Clean up old caches -----
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

// ----- FETCH — Intelligent caching strategy -----
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  // --- HTML pages: Network-first (get fresh content) ---
  if (request.mode === 'navigate' || 
      url.pathname.endsWith('.html') || 
      url.pathname === '/' || 
      url.pathname === '/DevOps-Journey/') {
    
    event.respondWith(
      fetch(request)
        .then(response => {
          // Cache fresh response for offline use
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, clone);
          });
          return response;
        })
        .catch(() => {
          // Offline fallback — serve cached version
          return caches.match(request)
            .then(cached => {
              if (cached) return cached;
              // Ultimate fallback: serve index.html
              return caches.match('/DevOps-Journey/index.html');
            });
        })
    );
    return;
  }

  // --- JavaScript & CSS: Cache-first (fastest) ---
  if (url.pathname.includes('/js/') || 
      url.pathname.includes('.css')) {
    event.respondWith(
      caches.match(request)
        .then(cached => {
          if (cached) return cached;
          // Not in cache — fetch and store
          return fetch(request)
            .then(response => {
              if (response && response.status === 200) {
                const clone = response.clone();
                caches.open(CACHE_NAME).then(cache => {
                  cache.put(request, clone);
                });
              }
              return response;
            });
        })
        .catch(() => {
          // Offline fallback: return a simple error response
          return new Response('Offline — JavaScript not available', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({ 'Content-Type': 'text/plain' })
          });
        })
    );
    return;
  }

  // --- Images: Cache-first (they rarely change) ---
  if (url.pathname.includes('/img/')) {
    event.respondWith(
      caches.match(request)
        .then(cached => {
          if (cached) return cached;
          return fetch(request)
            .then(response => {
              if (response && response.status === 200) {
                const clone = response.clone();
                caches.open(CACHE_NAME).then(cache => {
                  cache.put(request, clone);
                });
              }
              return response;
            });
        })
        .catch(() => {
          // Offline fallback for images
          return caches.match('/DevOps-Journey/img/Logo.svg');
        })
    );
    return;
  }

  // --- Everything else: Cache-first, fallback to network ---
  event.respondWith(
    caches.match(request)
      .then(cached => {
        if (cached) return cached;
        return fetch(request)
          .then(response => {
            if (response && response.status === 200) {
              const clone = response.clone();
              caches.open(CACHE_NAME).then(cache => {
                cache.put(request, clone);
              });
            }
            return response;
          });
      })
      .catch(() => {
        // Generic offline fallback
        return new Response('Offline — please check your connection', {
          status: 503,
          statusText: 'Service Unavailable'
        });
      })
  );
});