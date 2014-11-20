var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var products_schema = new Schema({
    _id: ObjectId,
    IDStore: String,
    ProductName: String,
    Price: String,
    Category: [],
    Tags: [],
    Description: String,
    Images: [],
    Status: Boolean,
    rating: []
});

var product = mongoose.model('product', products_schema);
module.exports = {product: product};