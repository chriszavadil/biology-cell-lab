/* This service worker is scoped only to this app, never to other GitHub Pages apps. */
const VERSION='cell-lab-v1.0.0';
const FILES=['./','./index.html','./styles.css','./app.js','./core.js','./data.js','./visuals.js','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(VERSION).then(cache=>cache.addAll(FILES))));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(key=>key.startsWith('cell-lab-v')&&key!==VERSION).map(key=>caches.delete(key)));
  await self.clients.claim();
})()));
self.addEventListener('message',event=>{if(event.data?.type==='ACTIVATE_UPDATE')self.skipWaiting();});
self.addEventListener('fetch',event=>{
  const url=new URL(event.request.url);
  if(event.request.method!=='GET'||url.origin!==self.location.origin||!url.href.startsWith(self.registration.scope))return;
  event.respondWith((async()=>{
    const cache=await caches.open(VERSION);
    const cached=await cache.match(event.request,{ignoreSearch:true});
    if(cached)return cached;
    try{return await fetch(event.request);}catch(error){
      if(event.request.mode==='navigate'){const fallback=await cache.match(new URL('./index.html',self.registration.scope));if(fallback)return fallback;}
      throw error;
    }
  })());
});
