const mongoose = require('mongoose');//Importando mongoose.
const uniqueValidator = require("mongoose-unique-validator"); //Importando módulo mongoose-unique-validator

const AdminSchema = new mongoose.Schema({
    usuario:{
        type: String,
        required : [true, 'El usuario es obligatorio'],
        unique: true,
    },
    clave:{
        type: String,
        required : [true, 'La contraseña es obligatoria']
    }
}, {timestamps: true});

HolderSchema.plugin(uniqueValidator, { message: "Ya existe" });


module.exports = model('Holder', HolderSchema);