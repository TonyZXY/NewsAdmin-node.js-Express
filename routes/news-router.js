const express = require('express');
const router = express.Router();
const News = require('../module/News');

router.get('/',function (req,res,next) {
    res.render('./newsView/newsSearch')
});

router.get('/news',function (req,res,next) {
    var page = req.query.p;
    var start = req.query.start;
    var end = req.query.end;
    News.getNewsList(function (err,newsList) {
        if (err) {
            throw err;
        }
        var count = newsList.length;
        var path = "/news/news/";
        res.render('./newsView/newsList', {newsList:newsList });
    });//"2018,05,18","2018,05,20"
});

router.get('/add', function (req, res, next) {
    res.render('./newsView/newsAdd');
});

router.post('/addNews',function (req,res,next) {
    res.redirect('/news/add');
});

router.get('/news/:_id', function (req, res, next) {
    var id = req.params._id;
    News.getNewsByID(id,function (err, news) {
        if (err) {
            throw err;
        }
        res.render('./newsView/newsEdit',{news:news});
    })
});

module.exports = router;