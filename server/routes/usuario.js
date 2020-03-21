const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Usuario = require('../model/usuario');
const bcrypt = require('bcrypt');
const _ = require('underscore');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/usuario', (req, resp) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {

            if (err) {
                return resp.status(400).json({
                    statusCode: '-01',
                    message
                });
            }

            Usuario.count({ estado: true }, (err, conteo) => {

                resp.json({
                    statusCode: true,
                    usuarios,
                    cuantos: conteo
                });

            });


        });
});

app.post('/usuario', (req, resp) => {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return resp.status(400).json({
                statusCode: '-01',
                message: err
            });
        }

        resp.json({
            statusCode: '00',
            message: usuarioDB
        });
    });
});

app.put('/usuario/:id', (req, resp) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return resp.status(400).json({
                statusCode: '-01',
                message: err
            });
        }

        resp.json({
            statusCodek: '00',
            usuario: usuarioDB
        });

    })
});

app.delete('/usuario/:id', (req, resp) => {
    let id = req.params.id;

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

    let cambiaEstado = {
        estado: false
    };

    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {

        if (err) {
            return resp.status(400).json({
                ok: false,
                message: err
            });
        };

        if (!usuarioBorrado) {
            return resp.status(400).json({
                statusCode: '-01',
                message: 'Usuario no encontrado'
            });
        }

        resp.json({
            statusCode: '00',
            usuario: usuarioBorrado
        });
    });
});

module.exports = app;