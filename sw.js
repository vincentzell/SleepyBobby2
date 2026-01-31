const CACHE_NAME = 'sleepy-bobby-v5';

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.png',
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
  './res/823274__hannagreen__sparks_mediumdensity3.wav'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .catch((err) => console.error(err))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (!event.request.url.startsWith(self.location.origin)) return;
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});