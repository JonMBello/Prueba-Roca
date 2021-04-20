const mongoose = require('mongoose');//Importando mongoose.

const TransaccionSchema = new mongoose.Schema({
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
    },
    tipo:{
        type: String,
        required: [true, 'El tipo es obligatorio'],
        Enum: ['holder','admin']
    }
}, {timestamps: true});

mongoose.model('Transaccion', TransaccionSchema);