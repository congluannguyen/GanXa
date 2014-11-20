var express = require('express');
var router = express.Router();
var storeController = require('../controller/StoreController');

router.get('/', function (req, res) {
    res.render('insert_store');
});

router.post('/', function (req, res) {
    var iDUserFacebook = "IDUserFacebook";
    var storeName = req.body.StoreName;
    var address = req.body.Address;
    var lat = req.body.Latitude;
    var long = req.body.Longitude;
    var phone = req.body.Phone;
    var description = req.body.Description;


    new storesSchema.store({
        _id: null,
        iDUserFacebook: iDUserFacebook,
        storeName: storeName,
        address: address,
        lat: lat,
        long: long,
        phone: phone,
        description: description
    }).save(function (err) {
            if (!err) {
                storesSchema.store.find(function (err, arrStore) {
                    if (arrStore && arrStore.length > 0) {
                        console.log(arrStore);
                        req.session.store = arrStore;
                        res.render('home', { title: 'Có', store: req.session.store});
                    } else {
                        res.render('index', { title: 'Không' });
                    }
                });
            }
        });
});

module.exports = router;