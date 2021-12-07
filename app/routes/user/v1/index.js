const express = require('express');
const router = express.Router();

const home = require('./home');
const employee = require('./employee');
const order = require('./order');
const product = require('./product')
const customer = require('./customer');
const finance = require('./finance');
const reminder = require('./reminder');
const discount = require('./discount');
const account = require('./account');
const settings = require('./settings');
const charge = require('./charge');



router.use('/', home);
router.use('/employee', employee);
router.use('/order', order);
router.use('/product', product);
router.use('/customer', customer)
router.use('/finance', finance)
router.use('/reminder', reminder)
router.use('/discount', discount)
router.use('/account', account)
router.use('/settings', settings)
router.use('/charge', charge)


module.exports = router;
