var express = require('express');
var router = express.Router();

var storesSchema = require('../models/StoresSchema');
/* GET home page. */
router.get('/', function(req, res) {

    storesSchema.store.find(function(err, arrStore){
        if(arrStore && arrStore.length > 0){
            req.session.store = arrStore;
            res.render('home', {store: req.session.store});
        }else{
            res.render('home', {});
        }
    })
});

module.exports = router;