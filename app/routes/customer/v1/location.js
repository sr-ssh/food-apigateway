const express = require('express');
const router = express.Router();

// controllers 
const { customer: customerController } = config.path.controllers;

const LocationController = require(`${customerController}/v1/LocationController`)

  
/**
 * @api {get} /api/customer/v1/location get order products
 * @apiVersion 1.0.0
 * @apiName getOrderProducts
 * @apiDescription get order products
 * @apiGroup customer
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "محصولات سفارش با موفقیت ارسال شد",
 *      data: [...{
 *          _id: '60fd0aacca33dd0374b55650',
 *          name: "نان سیر",
 *          description: "سیر . خمیر تازه . اویشن",
 *          type: {name: 'pizza'},
 *          img: 'https://www.dropbox.com/s/cd9h8ooxo75w5ie/picc-pizza.png?dl=0',
 *          size: [...{ name: "medium", price: 50 }]
 *        }]
 * }
 */
 router.get('/',LocationController.getLocations.bind(LocationController));





module.exports = router;