const CACHE_NAME = 'sleepy-bobby-v9'; // J'ai incrémenté la version pour forcer la mise à jour

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './bobby-anim.svg',
  './maskable_icon_x192.png',
  './maskable_icon_x512.png',
  './res/813251__nicktayloe__cave-stream-loop.wav',
  './res/443869__eardeer__water_flow_dam_distant_loop.wav',
  './res/349312__newagesoup__pink_noise-10s.wav',
  './res/829626__ocean.wav',
  './res/66472__digifishmusic__rain_on_a_tin_roof_loop.wav',
  './res/651545__nsstudios__wind-draft-loop-3.wav',
  './res/676854__darrenpasemko__wind_looping_01.wav',
  './res/612277__robinhood76__10835-big-fire-loop.wav',
  './res/778363__blondpanda__distant_rumbling_thunder_in_rain_02.wav',
  './res/823274__hannagreen__sparks_mediumdensity3.wav',
  './res/silent.wav',
  './res/Meditative-Ambiance-741-Hz.mp3'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Ouverture du cache...');
      return Promise.all(
        ASSETS.map(url => {
          return cache.add(url).catch(err => {
            console.error('[SW] ERREUR chargement fichier :', url, err);
          });
        })
      );
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => {
            console.log('[SW] Suppression vieux cache :', key);
            return caches.delete(key);
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      }).catch(err => {
        console.error('[SW] Erreur Fetch :', err);
      });
    })
  );
});