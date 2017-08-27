var CACHE_NAME = 'terminal-cache-v1';
var urlsToCache = [
  '/',
  '/gui.html',
  '/help.html',
  '/resources/css/default.css',
  '/resources/js/index.js',
  '/resources/js/terminal.js',
  '/resources/js/commands.js',
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
            //If there's a cached response, return it
            if (response) {
                return response;
            }
            //Otherwise, fetch a good response
            var fetchRequest = event.request.clone();
            return fetch(fetchRequest)
                .then(function(response) {
                    //If it's an odd response, just return it
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    //If we received a font, cache it
                    if (response.url.match(/fonts\//i)) {
                        var responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then(function(cache) {
                                cache.put(event.request, responseToCache);
                            });
                    }
                    //Otherwise, just return the response
                    return response;
                });
        }).catch(function(error) {
            //We're probably offline and looking for uncached pages
            //Do nothing
            console.log('sw error: ' + error);
        })
    );
});