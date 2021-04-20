const validarJWT = require('../middlewares/validar-jwt');
const validarAdmin = require('../middlewares/validar-admin');

const router = require('express').Router();
const {
    iniciarSesion,
    crearHolder,
    modificarHolder,
    eliminarHolder
} = require('../controllers/holder')

router.post('/login', iniciarSesion)
router.post('/crear',[validarJWT, validarAdmin], crearHolder)
router.put('/:usr',[validarJWT, validarAdmin], modificarHolder)
router.delete('/:usr',[validarJWT, validarAdmin], eliminarHolder)

module.exports = router;