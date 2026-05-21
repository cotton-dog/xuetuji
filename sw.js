const CACHE_NAME = '雪兔机';
const ASSETS = [
  './',
  './index.html',
  'weixin.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  // 👇 把这两个线上依赖也加进来，断网时图标和拖拽才不会失效哦！
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.15.0/Sortable.min.js'
];

// 安装时缓存文件
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// 拦截请求，使其在无网络时也能打开
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});