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
 *          name: "نان سیر"
 *          quantity: 2,
 *          price: "30000",
 *          size: "meduim"
 *      }],
 *      address: "کلاهدوز 4",
 *      lat: 36.297920,
 *      lng: 59.605933 ,
 *      deliveryCost: 5000,
 *      description: "تحویل در اسانسور"
 *  }
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "سفارش شما با موفقیت ثبت شد",
 *      data: {
 *          orderId: "6107aacd9f70e5108415fe90"
 *          products: [...{
 *              _id: "60b72a70e353f0385c2fe5af",
 *              name: "نان سیر"
 *              quantity: 2,
 *              price: "30000",
 *              size: "meduim"
 *          }],
 *          deliveryCost: 5,
 *          tax: 2,
 *      }
 * }
 */
  router.post('/',OrderController.addOrder.bind(OrderController));


  /**
 * @api {get} /api/customer/v1/order get orders
 * @apiVersion 1.0.0
 * @apiName getInLineOrders
 * @apiDescription get order products
 * @apiGroup customer
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "محصولات سفارش با موفقیت ارسال شد",
 *      data: [...{
 *            id: "60b72a70e353f0385c2fe5af",
 *            createdAt: "2021-06-01T06:54:01.691Z",
 *            paid: true,
 *            status: { name: "آماده", status: 2}
 *          }]
 *      }
 * }
 */
 router.get('/',OrderController.getInLineOrders.bind(OrderController));



/**
 * @api {get} /api/customer/v1/order get order
 * @apiVersion 1.0.0
 * @apiName getOrder
 * @apiDescription get order
 * @apiGroup customer
 * @apiParam {String} orderId order id
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "سفارشات با موفقیت ارسال شد",
 *      data: {
 *            order: {
 *               id: "60b72a70e353f0385c2fe5af",
 *              products: [...{
 *                _id: { _id: "61014026a1701735e409000b", name: "پپرونی"},
 *                quantity: 2,
 *                price: "30000",
 *                size: "medium"
 *              }],
 *              createdAt: "2021-06-01T06:54:01.691Z",
 *              address: "معلم 43",
 *              status: { name: "در صف انتظار"},
 *              deliveryCost: 5,
 *            },
 *            tax: 12750
 *      }
 * }
 */
 router.get('/:orderId',OrderController.getOrder.bind(OrderController));



module.exports = router;