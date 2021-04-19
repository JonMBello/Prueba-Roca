const mongoose = require('mongoose');//Importando mongoose.

const HolderSchema = new mongoose.Schema({
    origen:{
        type: String,
        required : [true, 'El origen es obligatorio']
    },
    destino:{
        type: String,
        required : [true, 'El destino paterno es obligatorio']
    },
    monto:{
        type: Number,
        required : [true, 'El monto es obligatorio']
    }
}, {timestamps: true});

HolderSchema.plugin(uniqueValidator, { message: "Ya existe" });


module.exports = model('Holder', HolderSchema);