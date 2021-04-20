const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const generarJWT = require('../helpers/generar-jwt');
const Holder = mongoose.model('Holder');

function crearHolder(req, res, next) {
    const body = req.body;
    //Encriptación de clave
    const salt = bcrypt.genSaltSync();
    body.clave = bcrypt.hashSync(body.clave, salt);
    //Se guarda el usuario
    const holder = new Holder(body);
    holder.save().then(user => {//Guardando nuevo holder en MongoDB.
        return res.status(201).json(user.publicData())
    }).catch(()=>{res.sendStatus(400);})
}

function modificarHolder(req, res, next) {
    Holder.findOne({usuario : req.params.usr}).then(user => {
        console.log(user)
        if (!user) { return res.sendStatus(401); }
        let nuevaInfo = req.body
        if (typeof nuevaInfo.nombre !== 'undefined')
          user.nombre = nuevaInfo.nombre
        if (typeof nuevaInfo.apellidoP !== 'undefined')
          user.apellidoP = nuevaInfo.apellidoP
        if (typeof nuevaInfo.apellidoM !== 'undefined')
          user.apellidoM = nuevaInfo.apellidoM
        if (typeof nuevaInfo.usuario !== 'undefined')
          user.usuario = nuevaInfo.usuario
        if (typeof nuevaInfo.clave !== 'undefined'){
             //Encriptación de clave
            const salt = bcrypt.genSaltSync();
            user.clave = bcrypt.hashSync(user.clave, salt);
        }
        if (typeof nuevaInfo.noCuenta !== 'undefined')
            user.noCuenta = nuevaInfo.noCuenta
        user.save().then(updatedUser => { //Guardando holder modificado en MongoDB.
          res.status(201).json(updatedUser.publicData())
        }).catch(next)
      }).catch(next)
}

function eliminarHolder(req, res, next) {
    Holder.findOneAndDelete({ usuario: req.params.usr }).then(s => { //Buscando y eliminando holder en MongoDB.
        if(!s) return res.sendStatus(404);
        res.status(200).send(`Holder ${req.params.usr} eliminado.`);
    }).catch(next);
}

const iniciarSesion = async(req, res, next) => {
    if (!req.body.usuario) {
        return res.status(422).json({ errors: {usuario: "no puede estar vacío" } });
    }
    if (!req.body.clave) {
        return res.status(422).json({ errors: { clave: "no puede estar vacía" } });
    }
    const {usuario, clave} = req.body;
    //Verifica usuario
    const holder = await Holder.findOne({usuario});
    if (!holder){
        return res.status(400).json({
            error: "Usuario o clave incorrectos"
        });
    }
    //Verifica clave
    const claveValida = bcrypt.compareSync(clave, holder.clave);
    if(!claveValida) {
        return res.status(400).json({
            error: "Usuario o clave incorrectos"
        });
    }
    //Genera token
    const token = await generarJWT(holder.usuario);
    const usrValido = holder.publicData();
    res.json({
        'usuario validado':usrValido,
        token
    })
}



module.exports = {
    crearHolder,
    modificarHolder,
    eliminarHolder,
    iniciarSesion
}