const express = require('express');

const router = express.Router();


const user = require('./user');
const customer = require('./customer');
const kitchen = require('./kitchen');


router.use('/user', user);
router.use('/customer', customer);
router.use('/kitchen', kitchen);


router.get('/' , (req , res) => {
    res.json('Welcome to Home Page');    
});
router.get('/about' , (req , res) => {
    res.json('Welcome to About Page');
});


module.exports = router;