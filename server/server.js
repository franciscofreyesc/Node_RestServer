require('../config');

const db = require('../db/db');
const express = require('express');
const app = express();

// routes
app.use(require('./routes/index'));


// Conectar a la BD
db.conectar().then((resp) => {
        console.log(resp);
    })
    .catch((err) => {
        console.log(err);
    })


// Puerto del restServer
app.listen(PORT, () => {
    console.log(`RestServer escuchando puerto ${PORT}`);
});