const express = require('express');
const router = express.Router();

const home = require('./home');
const order = require('./order');


router.use('/', home);
router.use('/order', order);


module.exports = router;