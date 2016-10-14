var staticCacheName = "news-v1";

this.addEventListener("install", event => {
	//caches waitUntil all resources has been added
	event.waitUntil(
		caches.open(staticCacheName).then(cache => {
			return cache.addAll([
				"/index.html",
				"/favicon.ico",
				"/ajax-loader.gif",
				"/bootstrap/css/bootstrap.css",
				"/bootstrap/fonts/glyphicons-halflings-regular.eot",
				"/bootstrap/fonts/glyphicons-halflings-regular.svg",
				"/bootstrap/fonts/glyphicons-halflings-regular.ttf",
				"/bootstrap/fonts/glyphicons-halflings-regular.woff",
				"/bootstrap/fonts/glyphicons-halflings-regular.woff2",				
				// "/static/css/main.9ee545ee.css",
				// "/static/css/main.9ee545ee.css.map",
				// "/static/js/main.8b71c999.js",
				// "/static/js/main.8b71c999.js.map",
				
				// ---- images -------
				// "/images/Caltrain_Zone_Map.png",
				
			])
		})
	)
});

this.addEventListener("fetch", function(event){
	event.respondWith(
		caches.match(event.request)
		      .then(function(res){
					return res || fetch(event.request)
		      }));
});

this.addEventListener("activate", function(event){
	event.waitUntil(
		caches.keys()
		      .then(function(cacheNames){
		      	return Promise.all(
			      	cacheNames.filter(function(name){
			      		return name.startsWith('news-') && name != staticCacheName;
			      	}).map(function(cacheName){
			      		return cache.delete(cacheName)
			      	})
			    );
		})
	)
})
