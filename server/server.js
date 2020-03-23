require('../config');

const db = require('../db/db');
const express = require('express');
const app = express();
const path = require('path');

// routes
app.use(require('./routes/index'));
app.use(express.static(path.resolve(__dirname, '../public')));

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