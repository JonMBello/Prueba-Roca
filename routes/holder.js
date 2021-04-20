const router = require('express').Router();
const {
    iniciarSesion,
    crearHolder,
    modificarHolder,
    eliminarHolder
} = require('../controllers/holder')

router.post('/login', iniciarSesion)
router.post('/crear', crearHolder)
router.put('/:usr', modificarHolder)
router.delete('/:usr', eliminarHolder)

module.exports = router;