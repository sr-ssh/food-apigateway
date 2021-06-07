const express = require('express');
const router = express.Router();

const home = require('./home');
const employee = require('./employee');
const order = require('./order');
const product = require('./product')
const customer = require('./customer');
const finance = require('./finance')



router.use('/', home);
router.use('/employee', employee);
router.use('/order', order);
router.use('/product', product);
router.use('/customer', customer)
router.use('/finance', finance)


module.exports = router;
