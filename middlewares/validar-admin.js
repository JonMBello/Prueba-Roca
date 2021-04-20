const validarAdmin = (req, res, next) => {
    console.log(req.tipoUsuario);
    if(req.tipoUsuario!="admin"){
        return res.status(401).json({
            error: "Token no valido"
        });
    }
    next();
}

module.exports = validarAdmin