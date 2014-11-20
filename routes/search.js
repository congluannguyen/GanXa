var express = require('express');
var router = express.Router();

var categorys_schema = require('../models/CategorysSchemal');
router.get('/', function (req, res) {

    categorys_schema.categorys.find(function(err, category_array){
        res.render('search', {category_array: category_array});
    });

});
module.exports = router;
