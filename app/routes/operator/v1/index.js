const express = require('express');
const router = express.Router();

const home = require('./home');
const order = require('./order');
const customer = require('./customer');
const complaint = require('./complaint');

router.use('/order', order);
router.use('/customer', customer);
router.use('/complaint', complaint);
router.use('/', home);


module.exports = router;