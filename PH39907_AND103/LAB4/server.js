
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
const fruit = require('./model/fruits')
app.use ('/api', api);

const uri = 'mongodb+srv://ntiendatcanon:ntiendatcanon@cluster0.ao1hfpf.mongodb.net/LAB4';


const mongoose = require('mongoose');

app.get('/', async (req, res)=>{
    await mongoose.connect(uri);

    let sanphams = await fruit.find();

    console.log(sanphams);

    res.send(sanphams);
})





exports.uri = uri;
exports.mongoose = mongoose;
