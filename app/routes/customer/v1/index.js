const express = require('express');
const router = express.Router();

const home = require('./home');
const order = require('./order');
const location = require('./location');


router.use('/', home);
router.use('/order', order);
router.use('/location', location);


module.exports = router;