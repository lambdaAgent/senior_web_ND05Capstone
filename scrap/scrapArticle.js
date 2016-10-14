
var fs = require('fs');
var request = require("request");
var cheerio = require("cheerio");
// var app     = express();

var siteUrl = "http://www.thejaktapost.com/"
var log = console.log;

var page = {
	title: "",
	image: {
		src:"",
		alt:""
	},
	day: "",
	time: "",
	body: []// each index represents paragraph.
}

function scrapArticle(url){
	return new Promise((resolve, reject) => {

		request(siteUrl + url, (err, res, html) => {
			if(err) return reject(err)
			console.log(html)
			var $ = cheerio.load(html);
			

			var singlePage = $(".main-single-page");
			var title = $(".title-large")[0].children[0].data
			var day = $(".day")[0].children[0].data;
			var time = $(".time")[0].children[0].data;
			var img = {};
			img.src = $(".lazy")[0].attribs['data-src'];
			img.alt = $(".lazy")[0].attribs['alt']
			var body = [];
			$(".tjp-detail-news")[0].children.map((child, index) => {
				if("name" in child && child.name === "p"){
					body.push(child.children[0].data)
				}
			});

			page = {
				title, image: img, day, time, body
			}

			resolve(page)
		});

	})
}


module.exports = scrapArticle;