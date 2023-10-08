    self.addEventListener('install', (event) => {
        event.waitUntil(
        caches.open('my-cache').then((cache) => {
            return cache.addAll([
            '/',
            '/index.html',
            '/manifest.json',
            // add more assets here
            ]);
        })
        );
    });
    
    self.addEventListener('fetch', (event) => {
        event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
        );
    });
    