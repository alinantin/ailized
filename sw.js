if(!self.define){let e,s={};const n=(n,t)=>(n=new URL(n+".js",t).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(t,i)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let c={};const r=e=>n(e,o),l={module:{uri:o},exports:c,require:r};s[o]=Promise.all(t.map((e=>l[e]||r(e)))).then((e=>(i(...e),c)))}}define(["./workbox-502a74ac"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.clientsClaim(),e.precacheAndRoute([{url:"build/bundle.css",revision:"8248fd9c5f2ca813560cb65f1a2df6db"},{url:"build/bundle.js",revision:"a1fe8b653f31dc44b99d845cb72bcaf0"},{url:"index.html",revision:"beea0a35476ebefc30122e5f77604b3b"}],{}),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("/index.html"))),e.registerRoute(/\.(?:png|jpg|jpeg|svg|ico)$/,new e.CacheFirst({cacheName:"images",plugins:[new e.ExpirationPlugin({maxAgeSeconds:2592e3,maxEntries:500})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.gstatic\.com/,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.CacheableResponsePlugin({statuses:[0,200]}),new e.ExpirationPlugin({maxAgeSeconds:31536e3,maxEntries:30})]}),"GET")}));
//# sourceMappingURL=sw.js.map