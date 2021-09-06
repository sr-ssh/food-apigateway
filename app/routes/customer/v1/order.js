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
 *          size: [...{ name: "medium", price: 50000, discount: 10000 }]
 *        }]
 * }
 */
 router.get('/product',OrderController.getOrderProducts.bind(OrderController));



 
/**
 * @api {get} /api/customer/v1/order/product/type get order products types
 * @apiVersion 1.0.0
 * @apiName getOrderProductsTypes
 * @apiDescription get order products types
 * @apiGroup customer
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "سفارشات با موفقیت ارسال شد",
 *      data: ["پیش غذ", "پیتزا", "نوشیدنی", "سالاد", "سس"]
 * }
 */
 router.get('/product/type',OrderController.getOrderProductsTypes.bind(OrderController));



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
 *          size: "meduim",
 *          discount: "10000"
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
 *      data: {}
 * }
 */
  router.post('/',OrderController.addOrder.bind(OrderController));


  /**
 * @api {get} /api/customer/v1/order get orders
 * @apiVersion 1.0.0
 * @apiName getInLineOrders
 * @apiDescription get order products.'cancelTime' unit is minute.
 * @apiGroup customer
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "محصولات سفارش با موفقیت ارسال شد",
 *      data: {
 *            orders: [...{
 *              id: "60b72a70e353f0385c2fe5af",
 *              createdAt: "2021-06-01T06:54:01.691Z",
 *              paid: true,
 *              status: { name: "آماده", status: 2},
 *              total: 60400
 *            }],
 *           cancelTime: 1 
 *      }
 * }
 */
 router.get('/',OrderController.getInLineOrders.bind(OrderController));



 /**
 * @api {get} /api/customer/v1/order/finished get finished orders 
 * @apiVersion 1.0.0
 * @apiName getfinishedOrders
 * @apiDescription get finished orders : "finished" orders have delivered to the customer or canceled
 * @apiGroup customer
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "سفارشات با موفقیت ارسال شد",
 *      data: [...{
 *             id: "60b72a70e353f0385c2fe5af",
 *             address: "کلاهدوز 4",
 *             finishDate: "2021-06-01T06:54:01.691Z",
 *             status: { status: 1, name: "لغو شده"},
 *             products: [...{
 *                  name: "پپرونی",
 *                  size: "medium",
 *                  quantity: 1,
 *                  price: 60000,
 *                  disconut: 20000
 *              }]
 *          }]
 *      }
 * }
 */
  router.get('/finished',OrderController.getfinishedOrders.bind(OrderController));



  
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
 *                size: "medium",
 *                discount: "10000"
 *              }],
 *              createdAt: "2021-06-01T06:54:01.691Z",
 *              address: "معلم 43",
 *              status: { name: "در صف انتظار"},
 *              deliveryCost: 5,
 *              paid: true
 *            },
 *            tax: 12750,
 *            discounts: 20000
 *      }
 * }
 */
 router.get('/:orderId',OrderController.getOrder.bind(OrderController));




/**
 * @api {delete} /api/customer/v1/order cancel order
 * @apiVersion 1.0.0
 * @apiName cancelOrder
 * @apiDescription cancel order 
 * @apiGroup customer
 * @apiParam {String} orderId order id
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "سفارش شما  لغو شد ,
 *      data: { status: true }
 * }
 * @apiErrorExample {json} Error-Response:
 * {
 *      success: true,
 *      message: "سفارش موجود نیست",
 *      data: { status: false }
 * }
 */
router.delete('/',OrderController.cancelOrder.bind(OrderController));




module.exports = router;