# Sleepy Bobby 🐦💤

Une petite web app minimaliste pour aider à dormir ou se concentrer.
Je l'ai créée parce que je ne trouvais pas d'appli gratuite qui faisait des boucles de sons **vraiment** parfaites (sans la petite coupure insupportable toutes les 10 secondes).

👉 **[Accéder au site](https://vincentzell.github.io/SleepyBobby2/)**

## C'est quoi ?

C'est juste un oiseau (Bobby) et des bruits d'ambiance.
Pas de pubs, pas de tracking, pas d'inscription.

Ce que ça fait de mieux que les autres :
* **Boucles audio invisibles :** Utilise l'API Web Audio pour mixer les sons. On n'entend jamais le moment où le son recommence.
* **Mode "Écran éteint" :** Ça continue de jouer même si on verrouille le téléphone (grâce à une petite astuce technique).
* **100% Hors-ligne :** Une fois la page chargée une première fois, elle s'installe comme une appli et marche sans internet (PWA).
* **Minuteur doux :** Si on met un timer (ex: 30 min), le son baisse tout doucement à la fin pour ne pas réveiller brutalement.

## Comment l'installer sur mobile

C'est une PWA (Progressive Web App). Pas besoin de passer par l'App Store.

1.  Allez sur le site avec Chrome (Android) ou Safari (iOS).
2.  **Android :** Menu > "Ajouter à l'écran d'accueil".
3.  **iOS :** Bouton Partage > "Sur l'écran d'accueil".

## Pour les curieux (Tech)

C'est du **Vanilla JS** pur. Pas de React, pas de framework, pas de `npm install` de l'enfer. Juste de l'HTML, du CSS et du JS.

Les points intéressants du code :
* `AudioContext` pour le *gapless playback* (lecture sans coupure).
* Un fichier `silent.wav` joué en boucle via une balise `<audio>` standard pour empêcher iOS/Android de tuer le processus quand l'écran est noir.
* Un Service Worker (`sw.js`) pour la mise en cache agressive (offline first).

### Lancer en local
Si vous voulez bricoler dessus (nécessaire à cause des Service Workers) :

    # Exemple avec Python
    python3 -m http.server
    # Puis ouvrir localhost:8000

## Crédits

**Sons (Freesound.org - Creative Commons)**
Merci à ces créateurs pour leurs enregistrements de qualité :

* **Ruisseau :** NickTayloe
* **Rivière :** eardeer
* **Vagues :** Nox_Sound
* **Pluie / Orage :** digifishmusic, BlondPanda
* **Vent / Espace :** nsstudios, darrenpasemko
* **Feu :** Robinhood76, hannagreen
* **Bruit Rose :** newagesoup

**Développement**

* **Concept :** Zell
* **Co-pilote technique :** Gemini (IA)

---
*Fait avec ❤️ pour des nuits paisibles.*
