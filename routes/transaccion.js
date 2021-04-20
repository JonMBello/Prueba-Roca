const router = require('express').Router();
const {
    transferirFondos,
    obtenerTransferencias,
    obtenerTransferenciasHolders
} = require('../controllers/transaccion')

router.get('/', obtenerTransferencias)
router.get('/holders', obtenerTransferenciasHolders)
router.post('/', transferirFondos)


module.exports = router;