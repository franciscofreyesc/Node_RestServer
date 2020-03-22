require('../../config');
const Usuario = require('../model/usuario');
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.post('/login', (req, resp) => {

    let body = req.body;
    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        if (err) {
            return resp.status(500).json({
                statusCode: '-02',
                message: err
            });
        }

        if (!usuarioDB) {
            return resp.status(400).json({
                statusCode: '-01',
                message: '(Usuario) y/o contraseña no validos'
            });
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return resp.status(400).json({
                statusCode: '-01',
                message: 'Usuario y/o (contraseña) no validos'
            });
        }

        let token = jwt.sign({
            usuario: usuarioDB,
        }, SECRET_TOKEN, { expiresIn: EXP_TOKEN });

        resp.json({
            statusCode: '00',
            message: usuarioDB,
            token
        })

    });
});

module.exports = app;