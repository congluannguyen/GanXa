var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var storesSchema = new Schema({
    _id: ObjectId,
    id_user_facebook : String,
    store_name : String,
    address : String,
    phone : String,
    store_category: String,
    store_tags: [],
    hours_of_work: String,
    description : String,
    cover_image: String,
    lat : String,
    long : String
});

var store = mongoose.model('store', storesSchema);
module.exports = {store: store};