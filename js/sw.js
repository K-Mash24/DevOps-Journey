// Makes your site work offline by storing a local copy of all important files in the user's browser cache. When the user visits your site again, the service worker intercepts the network requests and serves the cached files, allowing the site to load even without an internet connection. This is especially useful for improving performance and providing a seamless user experience, as it reduces load times and ensures that users can access your content regardless of their connectivity status.

const CACHE_NAME = 'devops-journey-v1.1';
const urlsToCache = [
  '/',
  '/index.html',
  '/html/networking.html',
  '/404.html',
  '/style.css',
  '/js/global.js',
  '/js/networking.js',
  '/img/favicon.svg',
  '/img/Network.svg',
  '/img/T568A vs T568B Practical Wiring Diagram.webp',
  '/img/t568b-wiring-diagram-patch-panel-8086.jpg',
  '/sitemap.xml',
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});