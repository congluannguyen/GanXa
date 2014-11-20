var express = require('express');
var router = express.Router();

var  stores_schema = require('../models/StoresSchema');
/* GET home page. */
router.get('/', function (req, res) {
    if (!req.session.store) {
        stores_schema.store.find(function (err, arrStore) {
            if (arrStore && arrStore.length > 0) {
                req.session.store = arrStore;
                res.render('home', {store: req.session.store});
            } else {
                res.render('home', {});
            }
        })
    } else {
        console.log(req.session.store);
        res.render('home', {store: req.session.store});
    }
});
module.exports = router;
