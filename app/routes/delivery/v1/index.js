const express = require('express');
const router = express.Router();

const home = require('./home');
const order = require('./order');
const location = require('./location');
const charge = require('./charge');
const account = require('./account');

router.use('/', home);
router.use('/order', order);
router.use('/location', location);
router.use('/charge', charge);
router.use('/account', account);


module.exports = router;