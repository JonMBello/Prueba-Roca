var router = require('express').Router();

router.get('/', (req, res)=>{
  res.send('Prueba técnica');
});

router.use('/admin', require('./admin'));
router.use('/holder', require('./holder'));
router.use('/transferencia', require('./transaccion'))

module.exports = router;
