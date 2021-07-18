const express = require('express');

const router = express.Router();


const user = require('./user');
const customer = require('./customer');
const cook = require('./cook');


router.use('/user', user);
router.use('/customer', customer);
router.use('/cook', cook);


router.get('/' , (req , res) => {
    res.json('Welcome to Home Page');    
});
router.get('/about' , (req , res) => {
    res.json('Welcome to About Page');
});


module.exports = router;