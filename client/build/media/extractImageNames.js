var fs = require("fs");
fs.readdir("./icons", (err, files)=> {
	 files.map(file => console.log(`"/media/icons/${file}",`))
})


/*
"/media/icons/167x167.png",
"/media/icons/168x168.png",
"/media/icons/60x60.png",
"/media/icons/GooglePlayStore.png",
"/media/icons/Icon-60@2x.png",
"/media/icons/Icon-60@3x.png",
"/media/icons/Icon-72.png",
"/media/icons/Icon-72@2x.png",
"/media/icons/Icon-76.png",
"/media/icons/Icon-76@2x.png",
"/media/icons/Icon-Small-50.png",
"/media/icons/Icon-Small-50@2x.png",
"/media/icons/Icon-Small@2x.png",
"/media/icons/hdpi.png",
"/media/icons/mdpi.png",
"/media/icons/xhdpi.png",
"/media/icons/xxhdpi.png",
"/media/icons/xxxhdpi.png",
*/