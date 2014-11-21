var express = require('express');
var router = express.Router();

var stores_schema = require('../models/StoresSchema');
var category_schema = require('../models/CategorysSchema');

router.get('/', function (req, res) {
    category_schema.categorys.find(function (err, category_array) {
        req.session.category_array = category_array;
        res.render('insert_store', {category_array: category_array});
    });
});

router.post('/', function (req, res) {
    var id_user_facebook = "IDUserFacebook";
    var store_name = req.body.StoreName;
    var address = req.body.Address;
    var lat = req.body.Latitude;
    var long = req.body.Longitude;
    var phone = req.body.Phone;
    var description = req.body.Description;
    var category = req.body.Category;
    var cover_image = ".." + req.files.CoverImage.path.replace("public", "");

    new stores_schema.store({
        _id: null,
        id_user_facebook: id_user_facebook,
        store_name: store_name,
        address: address,
        lat: lat,
        long: long,
        phone: phone,
        description: description,
        store_category: category,
        cover_image: cover_image
    }).save(function (err) {
            if (!err) {
                stores_schema.store.find(function (err, arrStore) {
                    if (arrStore && arrStore.length > 0) {
                        console.log(arrStore);
                        req.session.store = arrStore;
                        res.render('home', {store: req.session.store});
                    } else {
                        res.render('index');
                    }
                });
            }
        });
});

module.exports = router;