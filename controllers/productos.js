'use strict'

var fs = require('fs');
var path = require('path');
var Producto = require('../models/productos');

function nuevoProducto(req, res) {
    var params = req.body;
    var producto = new Producto();

    producto.code = params.code;
    producto.name = params.name;
    producto.name_lower = params.name.toLowerCase();
    producto.stock = params.stock;
    producto.category = params.category;
    producto.price = params.price;

    producto.save((err, userStored) => {
        if (err) {
            res.status(500).send({message: 'Error al guardar el producto'});
        } else {
            if (!userStored) {
                res.status(404).send({message: 'No se registro el producto'});
            } else {
                res.status(200).send({producto: userStored});
            }
        }
    });
}

function getProductos(req, res) {
    var find = Producto.find({}).sort({name: -1});

    find.populate().exec(function (err, productos) {
        if (err) {
            res.status(500).send({message: 'Error en el servidor'});
        } else {
            if (!productos) {
                res.status(404).send({message: 'No hay productos'});
            } else {
                res.status(200).send(productos);
            }
        }
    });
}

function getProducto(req, res) {
    var prodId = req.params.id;

    Producto.findById(prodId).populate({path: 'productos'}).exec((err, producto) => {
        if (err) {
            res.status(500).send({message: 'Error en la peticion'});
        } else {
            if (!producto) {
                res.status(404).send({message: 'No existe el producto'});
            } else {
                res.status(200).send(producto);
            }
        }
    });
}

function getCode(req,res) {
    var code = req.params.code;
    Producto.findOne({'code': code}, function (err, producto) {
        if (err) {
            res.status(500).send({message: 'Error al buscar el producto'});
        } else {
            if (!producto) {
                res.status(200).send({producto: true});
            } else {
                res.status(200).send({producto: false});
            }
        }
    });

}

function update(req, res) {
    var id_producto = req.body.id;
    var update = req.body;

    Producto.findByIdAndUpdate(id_producto, update, (err, prodUpdated) => {
        if (err) {
            res.status(500).send({message: 'Error al actualizar el producto'});
        } else {
            if (!prodUpdated) {
                res.status(404).send({message: 'No se ha podido actualizar el producto'});
            } else {
                res.status(200).send({producto: prodUpdated});
            }
        }
    });
}

function deleteProducto(req,res){
    var id_producto = req.params.id;

    Producto.findByIdAndRemove(id_producto, function(err,prodDelete){
        if(err){
            res.status(500).send({message: 'Error al eliminar el producto'});
        }else{
            if(!prodDelete){
                res.status(500).send({message: 'Error al eliminar el producto'});
            }else{
                res.status(200).send({producto: prodDelete});
            }
        }
    });
}

module.exports = {
    nuevoProducto,
    getProductos,
    getProducto,
    update,
    deleteProducto,
    getCode
}