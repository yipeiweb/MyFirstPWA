//Nombre de la cache
const CACHE_NAME = 'yipei_web_cache_pwa';

//Ficheros a cachear en la aplicación
let urlsToCache = [
    './',
    './assets'
];

//Evento install para instalar y cachear pwa
self.addEventListener("install", event => {
    //Espera mientras cachea
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache)
                        .then(() => {
                            self.skipWaiting();
                        })
            })
            .catch(error => {
                console.log(error);
            })
    )
});

//Evento active para activar la cache de PWA y funcione sin conexion
self.addEventListener("activate", event => {
    const cacheWhiteList = [CACHE_NAME];

    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if(cacheWhiteList.indexOf(cacheName) === -1) {
                            //Borrar caches que no necesita
                            return caches.delete(cacheName);
                        }
                    })
                )
            })
            .then(() => {
                //Activar la cache
                self.clients.claim();
            })
    );
});
//Evento fecth para actualizar la cache de la informacion actualizada
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                //Comprueba si esta cacheada
                if(response) {
                    return response;
                }
                //Sino devolvemos datos el servidor
                return fetch(event.request);
            })
    );
});
