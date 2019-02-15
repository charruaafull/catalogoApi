'use strict'

var express = require('express');
var ProductosController = require('../controllers/productos');

var api = express.Router();

api.post('/producto', ProductosController.nuevoProducto);
api.get('/getProductos', ProductosController.getProductos);
api.get('/getProducto/:id', ProductosController.getProducto);
api.post('/updateProducto', ProductosController.update);
api.delete('/deleteProducto/:id', ProductosController.deleteProducto);
api.get('/getCode/:code', ProductosController.getCode);

module.exports = api;