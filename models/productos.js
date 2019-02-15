'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductosSchema = Schema({
    code: {
        type: String
    },
    name: {
        type: String
    },
    name_lower: {
        type: String,
        lowercase: true
    },
    stock: Number,
    category: Number,
    price: Number
});

module.exports = mongoose.model('productos', ProductosSchema);