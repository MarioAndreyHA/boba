// Instalación del Service Worker
self.addEventListener('install', event => {
    console.log('Service Worker: Instalado');
    event.waitUntil(
        caches.open('Boba-cache-v1').then(cache => {
            return cache.addAll([
                "./",
                "./index.html",
                "./about.html",
                "./contact.html",
                "./boba.html",
                "./services.html",
                "./blog.html",
                "./manifest.json",
                "./app.js",
                
                "./css/style.css",
                "./css/bootstrap.min.css",
                "./css/responsive.css",
                "./css/jquery.mCustomScrollbar.min.css",

                "https://cdnjs.cloudflare.com/ajax/libs/bootstrap/4.6.2/css/bootstrap.min.css",
                "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.4/jquery.min.js",
                "https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.11.8/umd/popper.min.js",
                "https://cdnjs.cloudflare.com/ajax/libs/bootstrap/4.6.2/js/bootstrap.bundle.min.js",

                "./images/icono/boba192.png",
                "./images/icono/boba512.png",
                "./images/icono/bobaIcono.png",
                "./images/sc/sc1.png",
                "./images/sc/sc2.png",
                "./images/client-img.png",
                "./images/Baileys.png",
                "./images/banner-bg.png",
                "./images/Boba_Ca.png",
                "./images/Boba_Fa.png",
                "./images/Boba_Na.png",
                "./images/Boba_NC.png",
                "./images/Crema.png",
                "./images/Duo.png",
                "./images/exper.jpg",
                "./images/Frutos.png",
                "./images/jugo.png",
                "./images/Latte.png",
                "./images/Leche.png",
                "./images/LogoBoba.png",
                "./images/Mango.png",
                "./images/Maracuya.png",
                "./images/Naranja.png",
                "./images/Nosotros.png",
                "./images/Oreo.png",
                "./images/te.png",
                "./images/barista.jpg",
                "./images/Ayudante.jpg",
                "./images/Atencion.jpg",


                "./ws.js"
            ]);
        })
    );
});


// Activación del Service Worker
self.addEventListener('activate', (event) => {
    const cacheWhitelist = ['Boba-cache-v1'];
    console.log('Service Worker: Activado');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                return response; // Devuelve el archivo desde la caché
            }

            return fetch(event.request)
                .then((networkResponse) => {
                    return caches.open('Boba-cache-v1').then((cache) => {
                        cache.put(event.request, networkResponse.clone()); // Almacena en caché
                        return networkResponse;
                    });
                })
                .catch(() => {
                    if (event.request.mode === 'navigate') {
                        return caches.match('./index.html'); // Devuelve una página alternativa si falla
                    }
                });
        })
    );
});


// Notificacion
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
        self.registration.showNotification("BobaLab te regala", {
            body: "Gracias por activar nuestras notificaciones, en tu proxima compra tienes un %50 de descuento",
            icon: "/images/icono/bobaIcono.png"
        });
    }
});