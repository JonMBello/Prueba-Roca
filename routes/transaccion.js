const router = require('express').Router();
const validarJWT = require('../middlewares/validar-jwt');
const validarAdmin = require('../middlewares/validar-admin');

const {
    transferirFondos,
    obtenerTransferencias,
    obtenerTransferenciasHolders
} = require('../controllers/transaccion');

router.get('/',[validarJWT, validarAdmin], obtenerTransferencias)
router.get('/holders', [validarJWT, validarAdmin], obtenerTransferenciasHolders)
router.post('/', [validarJWT], transferirFondos)


module.exports = router;