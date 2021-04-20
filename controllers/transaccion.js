const mongoose = require('mongoose');
const Transaccion = mongoose.model('Transaccion')

function transferirFondos(req, res, next) {
    const body = req.body;
    const transaccion = new Transaccion(body);
    transaccion.save().then(tr => {//Guardando nueva transacción en MongoDB.
        return res.status(201).json(tr)
    }).catch(next)
}

function obtenerTransferencias(req, res, next) {
    Transaccion.find({tipo: 'admin'}).then(tr =>{ //Buscando transacciones de Administradores
        res.send(tr);
    }).catch(next)
}

function obtenerTransferenciasHolders(req, res, next) {
    Transaccion.find({tipo: 'holder'}).then(tr =>{ //Buscando transacciones de Holders
        res.send(tr);
    }).catch(next)
}

module.exports = {
    transferirFondos,
    obtenerTransferencias,
    obtenerTransferenciasHolders
}