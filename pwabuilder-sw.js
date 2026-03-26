// This is the "Offline page" service worker
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

// Cache name badal diya hai taaki browser naya version load kare
const CACHE = "stiskilli-cache-v1";

// IMPORTANT: Agar aapke paas 'offline.html' nahi hai, toh ise 'index.html' hi rehne dein.
const offlineFallbackPage = "index.html";

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => {
      console.log("Service Worker: Caching offline fallback page");
      // Agar file nahi milti toh ye error throw nahi karega
      return cache.add(offlineFallbackPage).catch(err => {
        console.error("Offline page cache failed, check if the file exists:", err);
      });
    })
  );
});

if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preloadResp = await event.preloadResponse;
        if (preloadResp) {
          return preloadResp;
        }

        const networkResp = await fetch(event.request);
        return networkResp;
      } catch (error) {
        console.log("Network fail, serving from cache...");
        const cache = await caches.open(CACHE);
        const cachedResp = await cache.match(offlineFallbackPage);
        return cachedResp;
      }
    })());
  }
});
