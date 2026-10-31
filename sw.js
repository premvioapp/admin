// Lets phones show order pop-ups (needed on Android and for the home-screen app). No caching, so new uploads show at once.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cs => {
    const c = cs.find(x => x.url.startsWith(self.registration.scope)) || cs[0];
    return c ? c.focus() : self.clients.openWindow(self.registration.scope);
  }));
});
