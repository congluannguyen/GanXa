var storesSchema = require('../models/StoresSchema');

var storeController = {

    findAllStore: function (req, res) {

        storesSchema.store.find(function (err, arrStore) {
            if (arrStore && arrStore.length > 0) {
                console.log(arrStore);
                req.session.store = arrStore;
                res.render('home', { title: 'Có', store: req.session.store});
            } else {
                res.render('index', { title: 'Không' });
            }
        })
    },

    goinsertNewStore: function (req, res) {
        res.render('insertNewStore', { title: 'Insert' });
    },

    insertNewStore: function (req, res) {
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
    },

    go_edit_product: function(req, res) {
        console.log("adasdasdas");
    }
};

module.exports = function (routes) {

    routes.get('/', storeController.findAllStore);
    routes.get('/insertNewStore', storeController.goinsertNewStore);
    routes.post('/insertNewStore', storeController.insertNewStore);
    /*routes.get('/edit_store', storeController.);
    routes.post('/edit_store', storeController.);*/
    //routes.get('/edit_product', storeController.go_edit_product());
};