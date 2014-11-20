var express = require('express');
var router = express.Router();
var products_schema = require('../models/ProductsSchema');

var image = [];
router.get('/', function (req, res) {
    if (req.param('id')) {
        var id = req.param('id');
        products_schema.product.find({_id: id}, function (product_error, product) {
            if (product && product.length > 0) {
                res.render('edit_product', {product: product});
                product.forEach(function (p) {
                    image = p.Images;
                });
            }else{
                console.log("Lỗi - edit_product.js");
            }
        });
    } else {
        res.render('home');
    }
});

router.post('/', function (req, res) {

    var product_id = req.param('id');
    var product_name = req.body.product_name;
    var product_price = req.body.product_price;
    //Category
    var strCategory = req.body.product_category;
    var category = strCategory.split(",");
    for (i = 0; i < category.length; i++) {
        category[i] = category[i].trim();
    }
    //Tags
    var strTags = req.body.product_tags;
    var tags = strTags.split(",");
    for (i = 0; i < tags.length; i++) {
        tags[i] = tags[i].trim();
    }
    var description = req.body.product_description;
    /*console.log("0");
     if (typeof req.files.CoverImage === 'undefined') {
     cover_image = cover;
     } else {
     console.log("2");
     cover_image = ".." + req.files.CoverImage.path.replace("public", "");
     }*/
    //Image
    var Images;
    if (typeof req.files.product_image === 'undefined') {
        Images = image;
    } else {
        var count = 0;
        Images = [];
        req.files.product_image.forEach(function (file, i) {
            count++;
            if (count <= 4) {
                Images.push(".." + file.path.replace("public", ""));
            }
        });
    }

    products_schema.product.update({_id: product_id}, {$set: {ProductName: product_name, Price: product_price, Category: category, Tags: tags, Description: description, Images: Images}}, function (err, result) {
        if (!err && result) {
            console.log(req.session.recent_store_id);
            products_schema.product.find({IDStore: req.session.recent_store_id}, function (product_error, product) {
                res.render('product', {arr_product: product, store_id: req.session.recent_store_id});
            });
        } else {
            console.log(err);
        }
    });
});
module.exports = router;