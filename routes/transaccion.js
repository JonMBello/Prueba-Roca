const router = require('express').Router();
const {
    transferirFondos
} = require('../controllers/transaccion')

router.post('/transferir', transferirFondos)

module.exports = router;