const express = require('express');
const router = express.Router();

// controllers 
const { customer: customerController } = config.path.controllers;

const OrderController = require(`${customerController}/v1/OrderController`)

  
/**
 * @api {get} /api/customer/v1/order/product get order products
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
 router.get('/product',OrderController.getOrderProducts.bind(OrderController));

 /**
 * @api {post} /api/customer/v1/order/ add order 
 * @apiVersion 1.0.0
 * @apiName addOrder
 * @apiDescription add order: send products like request example
 * @apiGroup customer
 * @apiParam {Object[]} products array of product objects
 * @apiParam {String} address order address
 * @apiParam {Number} lat gerographical latitude
 * @apiParam {Number} lng gerographical longitude
 * @apiParam {Number} delivaryCost delivery cost
 * @apiParam {String} description order dexcription
 * @apiParamExample {json} Request-Example:
 *  {
 *      products: [...{
 *          _id: "60b72a70e353f0385c2fe5af",
 *          quantity: 2,
 *          price: "30000",
 *          size: "meduim"
 *      }],
 *      address: "",
 *      lat: 36.297920,
 *      lng: 59.605933 ,
 *      deliveryCost: 5000,
 *      description: "تحویل در اسانسور"
 *  }
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "سفارش شما با موفقیت ثبت شد"
 * }
 * @apiErrorExample {json} Error-Response:
 * {
 *      success: true,
 *      message: "کاربر یافت نشد"
 * }
 */
  router.post('/',OrderController.addOrder.bind(OrderController));



module.exports = router;