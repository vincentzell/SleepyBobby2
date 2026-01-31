// --- CONFIGURATION ---
const CACHE_NAME = 'sleepy-bobby-v3'; // J'ai passé la version à 3 pour forcer la mise à jour

const ASSETS = [
  '/',
  'index.html',
  'manifest.json',
  'icon.png',
  
  // ⚠️ IMPORTANT : Correspond exactement au nom dans ton HTML
  // Si tu décides de le renommer 'bobby-anim.svg' plus tard, change-le ici aussi.
  'bobby-anim.svg', 

  // Tes fichiers audio (Vérifie bien que le dossier s'appelle "res")
  'res/813251__nicktayloe__cave-stream-loop.wav',
  'res/443869__eardeer__water_flow_dam_distant_loop.wav',
  'res/349312__newagesoup__pink_noise-10s.wav',
  'res/829626__ocean.wav',
  'res/66472__digifishmusic__rain_on_a_tin_roof_loop.wav',
  'res/651545__nsstudios__wind-draft-loop-3.wav',
  'res/676854__darrenpasemko__wind_looping_01.wav',
  'res/612277__robinhood76__10835-big-fire-loop.wav',
  'res/778363__blondpanda__distant_rumbling_thunder_in_rain_02.wav',
  'res/823274__hannagreen__sparks_mediumdensity3.wav'
];

// --- 1. INSTALLATION (Mise en cache des fichiers) ---
self.addEventListener('install', (event) => {
  // Force le SW à s'activer immédiatement sans attendre la fermeture des onglets
  self.skipWaiting(); 
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Mise en cache globale');
        return cache.addAll(ASSETS);
      })
      .catch((err) => {
        console.error('[Service Worker] Erreur pendant le cache. Vérifiez les noms de fichiers !', err);
      })
  );
});

// --- 2. ACTIVATION (Nettoyage des vieux caches) ---
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  // Permet au SW de contrôler la page immédiatement
  return self.clients.claim(); 
});

// --- 3. INTERCEPTION RÉSEAU (Offline First) ---
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true })
      .then((response) => {
        // 1. Si le fichier est dans le cache, on le sert (Mode Hors Ligne)
        if (response) {
          return response;
        }
        // 2. Sinon, on essaie de le télécharger sur le réseau
        return fetch(event.request);
      })
  );
});