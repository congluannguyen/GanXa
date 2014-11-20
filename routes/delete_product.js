var express = require('express');
var router = express.Router();

var products_schema = require('../models/ProductsSchema');
/* GET home page. */
router.get('/', function(req, res) {

    products_schema.store.remove({_id: req.param("id")}, function(err, arrStore){
        //if(arrStore && arrStore.length > 0){
            //req.session.store = arrStore;
            res.render('', {notification: "Đã xóa thành công sản phẩm.", arrStore: req.session.store});
        /*}else{
            res.render('home', {});
        }*/
    })
});

module.exports = router;