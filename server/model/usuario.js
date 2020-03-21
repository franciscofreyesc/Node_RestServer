const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let rolValido = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
}

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Campo nombre es obligatorio']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Campo email es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'Campo password es obligatorio']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolValido
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
};

usuarioSchema.plugin(uniqueValidator, { message: 'El {PATH} ingresado ya se encuentra registrado' });

module.exports = mongoose.model('Usuario', usuarioSchema);