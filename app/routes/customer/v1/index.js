const express = require('express');
const router = express.Router();

const home = require('./home');
const order = require('./order');
const location = require('./location');
const charge = require('./charge');

router.use('/', home);
router.use('/order', order);
router.use('/charge', charge);


module.exports = router;