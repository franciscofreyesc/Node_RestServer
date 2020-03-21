const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const conectar = () => {
    let dbHost = 'mongodb+srv://admin_cafe:lucas4321@cluster0-b0hdh.mongodb.net/cafe?retryWrites=true&w=majority';

    return new Promise((resolve, reject) => {

        mongoose.connect(dbHost, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        }, (err) => {
            if (err) {
                reject('No se ha establecido conexión a la BD', err);
                return
            } else {
                resolve('Conectado a la BD');
            }
        });
    })

}

module.exports = {
    conectar
}