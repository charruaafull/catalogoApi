'use strict'

var User = require('../models/usuarios');

function editarUsuario(req, res) {
    var userId = req.params.id;
    var update = req.body;

    User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
        if (err) {
            res.status(500).send({message: 'Error al actualizar el usuario'});
        } else {
            if (!userUpdated) {
                res.status(404).send({message: 'No se ha podido actualizar el usuario'});
            } else {
                res.status(200).send({user: userUpdated});
            }
        }
    });
}

function nuevoUsuario(req, res) {
    var params = req.body;
    var user = new User();
    user.name = params.name;
    user.name_lower = params.name.toLowerCase();
    user.password = params.password;

    User.countDocuments({name_lower: user.name_lower})
        .then((count) => {
            if (count > 0) {
                res.status(200).send({message: 'El usuario ' + user.name + ' ya existe'});
            } else {
                //guardar usuario
                user.save((err, userStored) => {
                    if (err) {
                        res.status(500).send({message: 'Error al guardar el usuario'});
                    } else {
                        if (!userStored) {
                            res.status(404).send({message: 'No se registro el usuario'});
                        } else {
                            res.status(200).send({user: userStored});
                        }
                    }
                });
            }
        });
}

function getUsers(req, res) {
    var find = User.find({}).sort({name: -1});

    find.populate().exec(function (err, users) {
        if (err) {
            res.status(500).send({message: 'Error en el servidor'});
        } else {
            if (!users) {
                res.status(404).send({message: 'No har canciones'});
            } else {
                res.status(200).send(users);
            }
        }
    });
}

function deleteUsuario(req, res) {
    User.findByIdAndRemove(req.query.id, (err, userRemove) => {
        if (err) {
            res.status(500).send({message: 'Error al eliminar el artista'});
        } else {
            res.status(200).send(userRemove);
        }
    });
}

function getUsuario(req, res) {
    var params = req.body;
    var user = new User();
    user.name = params.name;

    var find = User.find({'name': user.name});

    find.exec(function (err, users) {
        if (err) {
            res.status(500).send({message: 'Error en el servidor'});
        } else {
            if (!users) {
                res.status(404).send({message: 'Bien'});
            } else {
                res.status(200).send(users);
            }
        }
    });

}

module.exports = {
    nuevoUsuario,
    getUsers,
    deleteUsuario,
    getUsuario,
    editarUsuario
}