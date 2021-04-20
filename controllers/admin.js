const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const generarJWT = require('../helpers/generar-jwt');
const Admin = mongoose.model('Admin');

const iniciarSesion =  async(req, res, next) => {
    if (!req.body.usuario) {
        return res.status(422).json({ errors: {usuario: "no puede estar vacío" } });
    }
    if (!req.body.clave) {
        return res.status(422).json({ errors: { clave: "no puede estar vacía" } });
    }
    const {usuario, clave} = req.body;
    //Verifica usuario
    const admin = await Admin.findOne({usuario});
    if (!admin){
        return res.status(400).json({
            error: "Usuario o clave incorrectos"
        });
    }
    //Verifica clave
    const claveValida = bcrypt.compareSync(clave, admin.clave);
    if(!claveValida) {
        return res.status(400).json({
            error: "Usuario o clave incorrectos"
        });
    }
    //Genera token
    const token = await generarJWT(admin.usuario)
    res.json({
        'usuario validado':admin.usuario,
        token
    })
}

module.exports = {
    iniciarSesion
}