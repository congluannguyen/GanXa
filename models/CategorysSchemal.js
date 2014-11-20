var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var categorysSchema = new Schema({
    _id: ObjectId,
    category_name: String

});

var categorys = mongoose.model('categorys', categorysSchema);
module.exports = {categorys: categorys};