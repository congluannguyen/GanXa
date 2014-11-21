var express = require('express');
var router = express.Router();
var store_schema = require('../models/StoresSchema');
var product_schema = require('../models/ProductsSchema');
var category_schema = require('../models/CategorysSchema');
var cover;
router.get('/', function (req, res) {

    var store_id = req.param('id');

    store_schema.store.find({_id: store_id}, function (s_err, s) {
        if (!s_err && s && s.length > 0) {
            product_schema.product.find({IDStore: store_id}, function (p_err, p) {
                s.forEach(function (c) { //Lỗi
                    category_schema.categorys.find(function (err, category_array) {
                        cover = c.cover_image;
                        req.session.category_array = category_array;
                        res.render('edit_store', {store: s, product: p, store_id: store_id, category_array: category_array});
                    });
                });
            })
        }
    });
});

router.post('/', function (req, res) {

    var store_id = req.param('id');
    var storeName = req.body.StoreName;
    var address = req.body.Address;
    var lat = req.body.Latitude;
    var long = req.body.Longitude;
    var phone = req.body.Phone;
    var description = req.body.Description;
    var cover_image = cover;
    if (typeof req.files.CoverImage === 'undefined') {
        cover_image = cover;
    } else {
        cover_image = ".." + req.files.CoverImage.path.replace("public", "");
    }
    var category = req.body.category_select;

    store_schema.store.update({_id: store_id}, {$set: {storeName: storeName, address: address, lat: lat, long: long, phone: phone, description: description, store_category: category, cover_image: cover_image}}, function (err, result) {
        if (!err && result) {
            store_schema.store.find(function (err, arrStore) {
                console.log(result);
                res.render('home', {store: arrStore});
            })
        } else {
            console.log(err);
        }
    });
});
module.exports = router;