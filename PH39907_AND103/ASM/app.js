const express = require('express');
const app = express();

const port = 3000;


const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Server dang chay cong ${port}`)
})

const api = require('./routes/api');
app.use('/api', api);

const uri = 'mongodb+srv://ntiendatcanon:ntiendatcanon@cluster0.ao1hfpf.mongodb.net/ASM';

const mongoose = require('mongoose');
app.use('/', (req, res) => {
    res.send('URI:' + uri);
});

exports.uri = uri;
exports.mongoose = mongoose;
