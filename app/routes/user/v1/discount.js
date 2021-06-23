const express = require('express');
const router = express.Router();

// controllers 
const { user: userController } = config.path.controllers;

const DiscountController = require(`${userController}/v1/DiscountController`)



 router.post('/',DiscountController.addDiscount.bind(DiscountController));




  router.get('/',DiscountController.getDiscounts.bind(DiscountController));




 module.exports = router;