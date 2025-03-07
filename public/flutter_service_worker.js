'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"1.png": "aceb1577ed15d797502fd8df9788a0d6",
"assets/AssetManifest.bin": "27a673aad7ee998b8f7b71dbe89eda0c",
"assets/AssetManifest.bin.json": "a8c3b14a0c5c4b5b02bf576dc59a6d0f",
"assets/AssetManifest.json": "c52960c381afb0d7bb20e2219d686d21",
"assets/assets/images-svg/image.svg": "509cfcfc7d3424717ca682695e125f2c",
"assets/assets/images-svg/logo-white.svg": "509cfcfc7d3424717ca682695e125f2c",
"assets/assets/logo-unbg.png": "c1fb79fe7b09b6b07cdeed73c76384a4",
"assets/assets/logo.png": "aceb1577ed15d797502fd8df9788a0d6",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "0db35ae7a415370b89e807027510caf0",
"assets/NOTICES": "8ce605638002b248e4b66a2fbadcc650",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "66177750aff65a66cb07bb44b8c6422b",
"canvaskit/canvaskit.js.symbols": "48c83a2ce573d9692e8d970e288d75f7",
"canvaskit/canvaskit.wasm": "1f237a213d7370cf95f443d896176460",
"canvaskit/chromium/canvaskit.js": "671c6b4f8fcc199dcc551c7bb125f239",
"canvaskit/chromium/canvaskit.js.symbols": "a012ed99ccba193cf96bb2643003f6fc",
"canvaskit/chromium/canvaskit.wasm": "b1ac05b29c127d86df4bcfbf50dd902a",
"canvaskit/skwasm.js": "694fda5704053957c2594de355805228",
"canvaskit/skwasm.js.symbols": "262f4827a1317abb59d71d6c587a93e2",
"canvaskit/skwasm.wasm": "9f0c0c02b82a910d12ce0543ec130e60",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c",
"favicon.png": "34ab0afbbed8212a241343f70f81ebff",
"flutter.js": "f393d3c16b631f36852323de8e583132",
"flutter_bootstrap.js": "ff394656b3bae7e729df4c6c59df476d",
"icons/100.png": "ce35dc369116bc8c457c7feb131bbf29",
"icons/102.png": "a6545376777060cfb7fe65b0eabdd7ed",
"icons/1024.png": "713acc2cc6f2fff19b957620526f644d",
"icons/108.png": "1966a14af1f230bcb3a355203ba5786c",
"icons/114.png": "df04ccbe9efc27bdf806baf2ee787715",
"icons/120.png": "c8515264c1f80cd0d5d45899f4c7db00",
"icons/128.png": "43fab236df9400b1ad3ecfc5f579c783",
"icons/144.png": "0617853bea69624fa07861107d48a117",
"icons/152.png": "7c0f29056d100b6419485373a7abe2c0",
"icons/16.png": "f84d044e5216eb2ff21ba3b2738fc6e0",
"icons/167.png": "fd2d31f92f252624ab22d6cb772832a0",
"icons/172.png": "6961946a2e5c681da581797dd3f341ea",
"icons/180.png": "b2037e1e33adc55882e1d60c8b7045de",
"icons/196.png": "09a086cc4a775cb629334c1b8260428a",
"icons/20.png": "3769814b5de444722c0123d46d519b52",
"icons/216.png": "286270f72bf91e74b08bafdf242c06a1",
"icons/234.png": "d4d6cb4cbe20681d62bc94140d325021",
"icons/256.png": "f564ae3b934c167f53c707aba67aa101",
"icons/258.png": "79fa95f2a1dae42a619bac73543b626a",
"icons/29.png": "e72e67e33a6b119015827d12dc49fd33",
"icons/32.png": "49ea83927b591dc0d5db87fc39d42931",
"icons/40.png": "a5f0a5a4716d4a52072a51b76ae56775",
"icons/48.png": "3e0827bf33c10f3e76c0779d934490fd",
"icons/50.png": "5d249dacfc9d6afffcff0571bbadd368",
"icons/512.png": "e16ef6ea318118d6022c1bb1ae587ec8",
"icons/55.png": "2317d30c7e95371cd83aceadef60501b",
"icons/57.png": "714fb95ba375908c1f05f18f6aaf5947",
"icons/58.png": "67d4d47de68cc804624725a25763a23d",
"icons/60.png": "813e77f9b47bcb364a2563171116efd0",
"icons/64.png": "cbdf9687e7881092ddaf01836acf30a9",
"icons/66.png": "f5e65a36f64e4fdca1c953632e9e1f53",
"icons/72.png": "756c74e317dc3ae60013274cbd98e606",
"icons/76.png": "dec5c8181545283b114eb157a636a76c",
"icons/80.png": "1924c4935bd102a8a52a9fe2efaa4ac2",
"icons/87.png": "9dd9b09fbaab4ee93de9d21fd7f81b4c",
"icons/88.png": "9ddec7da49baae1589869cddb6c70eb0",
"icons/92.png": "5bfbc888ff56e8f9b3ee00ad3272b078",
"icons/Contents.json": "c4934619d6c806643ed52094ff68adaf",
"index.html": "dcc7c8f78c453febba4581fe34527071",
"/": "dcc7c8f78c453febba4581fe34527071",
"main.dart.js": "c07be3d13b86f98b2dfc1d08d97ecd47",
"manifest.json": "4d2cfb53a1cbc2129dcbd0237a6fea55",
"version.json": "b3b87f9153d4406c14bc11865bbe1089"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
