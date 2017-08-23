var CACHE_NAME = 'terminal-cache-v1';
var urlsToCache = [
  '/',
  '/index.css',
  '/index.js',
  '/terminal.js',
  'https://fonts.googleapis.com/css?family=Share+Tech+Mono',
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
    console.log('Fetch event for ', event.request.url);
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                console.log('Found ', event.request.url, ' in cache');                    
                return response;
            }
            console.log('Network request for ', event.request.url);                
            return fetch(event.request);
        }).catch(function(error) {
            console.log('Error, ', error);
            return caches.match('./offline.html');
        })
    );
});
  