const CACHE = "v86-offline-v1";

const FILES = [
    "./",
    "./index.html",

    "./libv86.js",
    "./v86.wasm",

    "./seabios.bin",
    "./vgabios.bin",

    "./vmlinuz-virt",
    "./initramfs-virt",
    "./alpine.img",

    "./xterm.js",
    "./xterm.css",
    "./xterm-addon-fit.js"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE).then(cache => cache.addAll(FILES))
    );
    self.skipWaiting();
});

self.addEventListener("activate", event => {
    event.waitUntil(clients.claim());
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
