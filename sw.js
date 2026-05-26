// Service Worker for caching third-party resources and improving performance
const CACHE_VERSION = 'vertex-v1';
const CACHE_URLS = [
  // Google Fonts - cache indefinitely
  /^https:\/\/fonts\.googleapis\.com\//,
  /^https:\/\/fonts\.gstatic\.com\//,
  // Static assets
  /\.webp$/,
  /\.css$/,
  /\.js$/,
];

// Install event - setup caching strategy
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker');
  self.skipWaiting();
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_VERSION)
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - cache network strategy for third-party resources
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only cache GET requests for third-party resources
  if (request.method !== 'GET') {
    return;
  }

  // Check if URL should be cached
  const shouldCache = CACHE_URLS.some((pattern) => {
    if (pattern instanceof RegExp) {
      return pattern.test(request.url);
    }
    return request.url.includes(pattern);
  });

  if (!shouldCache) {
    return;
  }

  // Cache network strategy: try network first, fallback to cache
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Only cache successful responses
        if (!response || response.status !== 200) {
          return response;
        }

        // Clone response for caching
        const responseToCache = response.clone();
        caches.open(CACHE_VERSION).then((cache) => {
          cache.put(request, responseToCache);
        });

        return response;
      })
      .catch(() => {
        // Return from cache if network fails
        return caches.match(request).then((response) => {
          return (
            response ||
            new Response('Offline', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain',
              }),
            })
          );
        });
      })
  );
});
