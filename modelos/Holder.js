const mongoose = require('mongoose');//Importando mongoose.
const uniqueValidator = require("mongoose-unique-validator"); //Importando módulo mongoose-unique-validator

const HolderSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required : [true, 'El nombre es obligatorio']
    },
    apellidoP:{
        type: String,
        required : [true, 'El apellido paterno es obligatorio']
    },
    apellidoM:{
        type: String
    },
    usuario:{
        type: String,
        required : [true, 'El usuario es obligatorio'],
        unique: true,
    },
    clave:{
        type: String,
        required : [true, 'La contraseña es obligatoria']
    },
    noCuenta:{
        type: String,
        required : [true, 'El número de cuenta es obligatorio'],
        unique: true
    }
}, {timestamps: true});

HolderSchema.plugin(uniqueValidator, { message: "Ya existe" });

HolderSchema.methods.publicData = function(){
    return {
      id:this._id,
      nombre:`${this.nombre} ${this.apellidoP} ${this.apellidoM}`, 
      usuario:this.usuario,
      cuenta:this.noCuenta
    };
};


mongoose.model('Holder', HolderSchema);