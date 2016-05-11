var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var heroSchema = new Schema({
    name : String,
    score : Number
});


var Monster = mongoose.model('heroes', heroSchema);

module.exports = Monster;