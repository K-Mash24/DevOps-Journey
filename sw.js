const CACHE_NAME = "devops-journey-2026-07-06-v5"; // Increment when you deploy

const urlsToCache = [
  // Critical — always cache these
  "/DevOps-Journey/",
  "/DevOps-Journey/index.html",
  "/DevOps-Journey/style.css",
  "/DevOps-Journey/js/global.js",
  "/DevOps-Journey/js/networking.js",
  "/DevOps-Journey/js/stars.js",
  "/DevOps-Journey/js/themes.js",

  // Pages
  "/DevOps-Journey/html/networking.html",

  // Future pillar

  // Assets
  "/DevOps-Journey/img/favicon.svg",
  "/DevOps-Journey/img/Logo.svg",
  "/DevOps-Journey/img/Network.svg",

  // PWA
  "/DevOps-Journey/manifest.json",
];

// Fetch event — intelligent caching strategy
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  const request = event.request;

  // --- HTML pages: Network-first (get fresh content) ---
  if (
    request.mode === "navigate" ||
    url.pathname.endsWith(".html") ||
    url.pathname === "/" ||
    url.pathname === "/DevOps-Journey/"
  ) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache fresh response for offline use
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, clone);
          });
          return response;
        })
        .catch(() => {
          // Offline fallback — serve cached version
          return caches.match(request).then((cached) => {
            if (cached) return cached;
            // Ultimate fallback: serve index.html
            return caches.match("/DevOps-Journey/index.html");
          });
        }),
    );
    return;
  }

  // --- JavaScript & CSS: Cache-first (fastest) ---
  if (url.pathname.includes("/js/") || url.pathname.includes(".css")) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        // Not in cache — fetch and store
        return fetch(request).then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, clone);
            });
          }
          return response;
        });
      }),
    );
    return;
  }

  // --- Images: Cache-first (they rarely change) ---
  if (url.pathname.includes("/img/")) {
    event.respondWith(
      caches.match(request).then((cached) => cached || fetch(request)),
    );
    return;
  }

  // --- Everything else: Cache-first, fallback to network ---
  event.respondWith(
    caches
      .match(request)
      .then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, clone);
            });
          }
          return response;
        });
      })
      .catch(() => {
        // Offline fallback for images (optional)
        if (url.pathname.includes("/img/")) {
          return caches.match("/DevOps-Journey/img/Logo.svg");
        }
        // Return a simple offline page for other requests
        return new Response("Offline — please check your connection", {
          status: 503,
          statusText: "Service Unavailable",
        });
      }),
  );
});
