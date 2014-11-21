var express = require('express');
var router = express.Router();

var product_schema = require('../models/ProductsSchema');
router.get('/', function(req, res) {

    var tags = req.param("key");

    product_schema.product.find({Tags: {$in: [tags]}}, function(err, p){
        res.render('tags', {product_array: p});
    });
});

module.exports = router;
