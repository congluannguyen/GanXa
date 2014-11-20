var express = require('express');
var router = express.Router();

var stores_schema= require('../models/StoresSchema');
var products_schema = require('../models/ProductsSchema');
var store_id;

router.get('/', function (req, res) {

    store_id = req.param('id');
    products_schema.product.find({IDStore: store_id}, function (err, arrp) {
        req.session.recent_store_id = store_id;
        res.render('product', {arr_product: arrp, store_id: store_id});
    });
});

router.post('/', function (req, res) {

    //Edit nè:

    var IDStore = store_id;
    var ProductName = req.body.product_name;
    var Price = req.body.product_price;
    //Category
    var strCategory = req.body.product_category;
    var Category = strCategory.split(",");
    for(i = 0; i<Category.length; i++){
        Category[i] = Category[i].trim();
    }
    //Tags
    var strTags = req.body.product_tags;
    var Tags = strTags.split(",");
    for(i = 0; i<Tags.length; i++){
        Tags[i] = Tags[i].trim();
    }
    var Description = req.body.product_description;
    //Image
    var count = 0;
    var Images = [];
    console.log(req.files.product_image.length);
    req.files.product_image.forEach(function (file, i) {
        count++;
        if (count <= 4) {
            Images.push(".." + file.path.replace("public", ""));
        }
    });
    var Rating;

    new products_schema.product({
        _id: null,
        IDStore: IDStore,
        ProductName: ProductName,
        Price: Price,
        Category: Category,
        Tags: Tags,
        Description: Description,
        Images: Images,
        Status: false,
        Rating: []
    }).save(function (err) {
            if (!err) {
                stores_schema.store.find(function (err, arrStore) {
                    if (arrStore && arrStore.length > 0) {
                        req.session.store = arrStore;
                        res.render('home', {store: req.session.store});
                    } else {
                        console.log(err);
                    }
                });
            }else{
                console.log(err);
            }
        });
});

module.exports = router;