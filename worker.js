/* global self, fetch, caches */

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.open('gametime-player').then(function (cache) {
      return fetch(event.request).then(function (response) {
        cache.put(event.request, response.clone())
        return response
      }).catch(function () {
        return cache.match(event.request)
      })
    })
  )
})
