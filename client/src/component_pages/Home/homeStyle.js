var m_screenWidth = 720;
var screenWidth;
module.exports = {
	initWidth(screenWidth){
		screenWidth = screenWidth;
		main_header_image(this, screenWidth)
		main_container(this,screenWidth)
		media_object(this,screenWidth)
	},
}

function media_object(obj, screenWidth){
	obj.media_object = {
		width: screenWidth > 500 ? "" : (screenWidth/(48/15)) + "px"
	}
}

function main_container(obj, screenWidth){
	obj.main_container = {
		width: screenWidth > 720 ? "70%" : "100%", 
		margin: "0 auto"
	}
}

function main_header_image(obj, screenWidth){
	obj.main_header_image = {
		width: (screenWidth > m_screenWidth) ? "100%" : "100%",
		margin: "0 auto", display: "inherit"
	}
}