const mongoose = require('mongoose');

const objectSchema = {
    nombre: String,
    telefono: Number,
    email: String,
    fechaNacimiento: String,
    password: String,
    id: Number
}

const clientSchema = mongoose.Schema(objectSchema);

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;