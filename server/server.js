require('../config');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/usuario', (req, resp) => {
    resp.json('Get Usuario');
});

app.post('/usuario', (req, resp) => {

    let body = req.body;
    resp.json({
        persona: body
    });
});

app.put('/usuario/:id', (req, resp) => {
    let id = req.params.id;
    resp.json(id);
});

app.delete('/usuario', (req, resp) => {
    resp.json('Delete Usuario');
});

app.listen(PORT, () => {
    console.log(`Escuchando puerto ${PORT}`);
});