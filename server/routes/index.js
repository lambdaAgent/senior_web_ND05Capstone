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
		res.json(news)
	})
	.catch(err => {
		res.status(400).json(news)
	})
});

router.get("/article/:url", (req, res, next) => {
	if(!req.params.url) return res.status(400)
	var url = req.params.url;

	scrapArticle(url)
	.then(article => {
		res.json(article)
	})
	.catch(err => {
		res.status(400).json(news)
	})
});

module.exports = router;
