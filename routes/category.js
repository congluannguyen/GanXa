var express = require('express');
var router = express.Router();

var category_schema = require('../models/CategorysSchema');
var store_schema = require('../models/StoresSchema');
router.get('/', function (req, res) {

    if (!req.param("type")) {
        category_schema.categorys.find(function (err, category_array) {
            req.session.category_array = category_array;
            res.render('category', {category_array: category_array});
        });
    } else {
        store_schema.store.find({store_category: {$in: [req.param("type")]}}, function (err, store_array) {
            res.render('category', {category_array: req.session.category_array, store_array: store_array});
        });
    }
});

router.post('/', function (req, res) {

    var category_name = req.body.category_name;

    new category_schema.categorys({
        _id: null,
        category_name: category_name
    }).save(function (err) {
            if (!err) {
                res.render('home', {store: req.session.store});
            }
        });
});

module.exports = router;

