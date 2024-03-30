const mongoose = require('mongoose');

const local = 'mongodb+srv://ntiendatcanon:ntiendatcanon@cluster0.ao1hfpf.mongodb.net/Lab8';

const connect = async () => {
    try {
        await mongoose.connect(local);
        console.log('Connect success');
    } catch (error) {
        console.error('Connection to MongoDB failed:', error);
    }
}

module.exports = { connect };
