'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;

mongoose.connect('mongodb://localhost:27017/usuarios', {useNewUrlParser: true}, (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log("La conexion a la base de datos esta corriendo correctamente");
        app.listen(port, function () {
            console.log("Servidor del Api Rest http://localhost:" + port);
        })
    }
});