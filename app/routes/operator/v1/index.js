const express = require('express');
const router = express.Router();

const home = require('./home');
const order = require('./order');
const customer = require('./customer');

router.use('/', home);
router.use('/order', order);
router.use('/customer', customer);


module.exports = router;