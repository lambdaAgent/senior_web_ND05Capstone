var staticCacheName = "news-v1";

this.addEventListener("install", event => {
	//caches waitUntil all resources has been added
	event.waitUntil(
		caches.open(staticCacheName).then(cache => {
			return cache.addAll([
				"/index.html",
				"/favicon.ico",
				"/library/annyang.js",			
				"/media/manifest.json",
				"/media/preloader.gif",

				// ==== css ======
				"/library/bootstrap/css/bootstrap.css",
				"/library/bootstrap/css/font-awesome.min.css",
				
				// ==== fonts ======
				"/library/bootstrap/fonts/fontawesome-webfont.eot",
				"/library/bootstrap/fonts/fontawesome-webfont.svg",
				"/library/bootstrap/fonts/fontawesome-webfont.ttf",
				"/library/bootstrap/fonts/fontawesome-webfont.woff",
				"/library/bootstrap/fonts/fontawesome-webfont.woff2",
				"/library/bootstrap/fonts/FontAwesome.otf",	
				"/library/bootstrap/fonts/glyphicons-halflings-regular.eot",
				"/library/bootstrap/fonts/glyphicons-halflings-regular.svg",
				"/library/bootstrap/fonts/glyphicons-halflings-regular.ttf",
				"/library/bootstrap/fonts/glyphicons-halflings-regular.woff",
				"/library/bootstrap/fonts/glyphicons-halflings-regular.woff2",	
				// "/static/css/main.0f7b0d61.css",
				// "/static/css/main.0f7b0d61.css.map",
				// "/static/js/main.41df621d.js",
				// "/static/js/main.41df621d.js.map",
							
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
		      }).catch(err => console.error(err))
	)
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
