const express = require('express');
const router = express.Router();

const home = require('./home');
const order = require('./order');
const location = require('./location');
const charge = require('./charge');
const pay = require('./pay');


router.use('/', home);
router.use('/order', order);
router.use('/location', location);
router.use('/charge', charge);
router.use('/pay', pay);


module.exports = router;