const router = require('express').Router();
const {
    iniciarSesion
} = require('../controllers/admin')


router.post('/login', iniciarSesion)


module.exports = router;