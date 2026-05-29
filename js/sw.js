const CACHE_NAME = 'devops-journey-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/networking.html',
  '/style.css',
  '/js/global.js',
  '/js/networking.js',
  '/img/favicon.svg',
  '/img/Network.svg',
  '/img/T568A vs T568B Practical Wiring Diagram.webp',
  '/img/t568b-wiring-diagram-patch-panel-8086.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});