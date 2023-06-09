const express = require('express');

const router = express.Router();


const user = require('./user');
const customer = require('./customer');
const kitchen = require('./kitchen');
const delivery = require('./delivery');
const operator = require('./operator');


router.use('/user', user);
router.use('/customer', customer);
router.use('/kitchen', kitchen);
router.use('/delivery', delivery);
router.use('/operator', operator);


router.get('/' , (req , res) => {
    res.json('Welcome to Home Page');    
});
router.get('/about' , (req , res) => {
    res.json('Welcome to About Page');
});


module.exports = router;