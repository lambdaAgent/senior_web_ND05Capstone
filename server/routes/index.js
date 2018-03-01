var express = require('express');
var router = express.Router();

var scrapNews = require("../scrap/scrapNews");
var scrapArticle = require("../scrap/scrapArticle");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get("/news", (req, res, next) => {
	console.log('get news')
	scrapNews()
	.then(news => {
		console.log(news);
		res.status(200).json(news);
		res.end();
	})
	.catch(err => {
		res.status(400).json(news)
	})
});

router.get("/article/:url", (req, res, next) => {
	if(!req.params.url) return res.status(400)
	var url = req.params.url;
	console.log('url',url);
	scrapArticle(url)
	.then(article => {
		res.status(200).json(article);
		res.end();
	})
	.catch(err => {
		console.log(err);
		res.status(400).json(err)
	})
});

module.exports = router;
