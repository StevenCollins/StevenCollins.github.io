var CACHE_NAME = 'terminal-cache-v1';
var urlsToCache = [
  '/',
  '/index.css',
  '/index.js',
  '/terminal.js',
  '/offline.html'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                return response;
            }
            //Cache fonts
            return fetch(event.request.clone()).then(function(response) {
                if (response.status < 400 && response.url.match(/fonts\//i)) {
                    cache.put(event.request, response.clone());
                }
                return response;
            });
        }).catch(function(error) {
            //We're probably offline and looking for uncached pages
            //Do nothing
        })
    );
});
  