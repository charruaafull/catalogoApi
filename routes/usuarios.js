'use strict'

var express = require('express');
var UserController = require('../controllers/usuarios');

var api = express.Router();

api.post('/nuevoUsuario', UserController.nuevoUsuario);
api.get('/getUsers', UserController.getUsers);
api.get('/deleteUsuario', UserController.deleteUsuario);
api.post('/getUsuario', UserController.getUsuario);
api.put('/editarUsuario/:id', UserController.editarUsuario);

module.exports = api;