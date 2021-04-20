const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const Admin = mongoose.model('Admin');

const validarJWT = async(req, res, next) => {
    const token = req.header('token-auth');
    if(!token) {
        return res.status(401).json({
            error: "Debes iniciar sesión"
        });
    }
    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        console.log(uid);
        req.usuario = uid;
        const admin = await Admin.findOne({usuario:uid});
        console.log(admin)
        if(admin)req.tipoUsuario = "admin";
        next();
    } catch (error) {
        return res.status(401).json({
            error: "Token no valido"
        });
    }
}

module.exports = validarJWT