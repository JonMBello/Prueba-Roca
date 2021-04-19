const router = require('express').Router();
const {
    iniciarSesion
} = require('../controllers/holder')

router.post('/login', iniciarSesion)

module.exports = router;