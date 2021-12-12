const express = require('express');
const router = express.Router();

const home = require('./home');
const order = require('./order');
const product = require('./product');

router.use('/', home);
router.use('/order', order);
router.use('/product', product);


module.exports = router;