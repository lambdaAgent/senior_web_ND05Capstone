// var express = require('express');
var fs = require('fs');
var request = require("request");
var cheerio = require("cheerio");
var scrapArticle = require("./scrapArticle");
var Promise = require("bluebird");

var url = "http://www.thejakartapost.com/"
var log = console.log;

function scrapNews(){
	return new Promise((resolve, reject) => {
		request(url, function(err, res, html) {
			console.log('finish request')
			if(err) return reject(err)

			var $ = cheerio.load(html);
			var news = [];

			var latestEntry = $(".tjp-latest-entry")[0].children.filter(child => child.name === "ul")[0];
			latestEntry.children.filter((list, index) => {
				// logOne(index, list)
				return "attribs" in list && "class" in list.attribs && list.attribs.class.indexOf("li-child") > 0
			}).map((list, index) => {
				var singleNew = {
					title: "",
					url:"",
					img: {src: "", alt: ""},
					description: "",
				}
				
				list.children.map(child => {
					if("attribs" in child && "class" in child.attribs && child.attribs.class === "image-latest"){
						var img = Array.from(child.children).filter(c => "name" in c && c.name === "img")[0];
						singleNew.img.src = img.attribs['data-src']
						singleNew.img.alt = img.attribs['alt'];
					}

					if("attribs" in child && child.attribs.class === "detail-latest"){
						child.children.map((c, index) => {
							if( "attribs" in c && "href" in c.attribs){
								var h5  = c.children.filter(elem => ("name" in elem && elem.name === "h5"));
								if(h5.length > 0){
									singleNew.title = h5[0].children[0].data;
									singleNew.url = h5[0].parent.attribs.href;
								}
							}

							//find description
							if("name" in c && c.name === "p"){
								singleNew.description = c.children[0].data;
							}

							//find link
							
						})
					}//.detail-latest
				})			
				//push the singleNew to news, and done!
				if(singleNew.title !== "") news.push(singleNew);
			});// latestEntry.map

			Promise.all(news.map(singleNew => {
				return scrapArticle(singleNew.url)
			}))
			.then(articles => {
				for(var i=0; i<articles.length; i++){
					news[i].image = articles[i].image;
					news[i].body = articles[i].body;
					var day = articles[i].day + " " + articles[i].time.replace("|", "").trim();
					const id = articles[i].title.replace(/[^\w\s]/gi, '').slice(0,5).split('').map(letter => letter.charCodeAt(0)).join('');
					news[i].id = Number(id);
				}
				resolve(news); 
			})
			.catch(err => {
				console.log(err);
				resolve();
			})
		})

	});//Promise
}

module.exports = scrapNews;


function logOne(index, item){
	if(index === 1) console.log(item)
}