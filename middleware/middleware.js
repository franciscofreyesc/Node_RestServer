require('../config');
const jwt = require('jsonwebtoken');

let verificaToken = (req, resp, next) => {
    let token = req.get('token');

    jwt.verify(token, SECRET_TOKEN, (err, usuarioDB) => {
        if (err) {
            return resp.status(401).json({
                statusCode: '-01',
                message: 'Token Inválido'
            });
        }
        req.usuario = usuarioDB.usuario;
        next();
    });
};

let verificaAdminRole = (req, resp, next) => {
    let rol = req.usuario.role;

    console.log('Rol:', rol);

    if (rol != 'ADMIN_ROLE') {
        return resp.status(400).json({
            statusCode: '-01',
            message: 'Acción no permitida, contactese con el administrador'
        });
    }
    next();
};

module.exports = {
    verificaToken,
    verificaAdminRole
}