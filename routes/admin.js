const router = require('express').Router();
const {
    crearHolder,
    obtenerTransferencias,
    obtenerTransferenciasHolders,
    modificarHolder,
    eliminarHolder,
    iniciarSesion
} = require('../controllers/admin')

router.get('/transferencias', obtenerTransferencias)
router.get('/tranferencias-holders', obtenerTransferenciasHolders)
router.post('/crear-holder', crearHolder)
router.post('/login', iniciarSesion)
router.put('/modificar-holder', modificarHolder)
router.delete('/:id', eliminarHolder)

module.exports = router;