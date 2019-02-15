'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name: {
        type: String
    },
    name_lower: {
        type: String,
        lowercase: true
    },
    password: 'String',
});

module.exports = mongoose.model('usuarios', UserSchema);