const express = require('express');
const router = express.Router();

// controllers 
const { operator: operatorController } = config.path.controllers;

const OrderController = require(`${operatorController}/v1/OrderController`)


/**
* @api {post} /api/operator/v1/order/ add order 
* @apiVersion 1.0.0
* @apiName addOrder
* @apiDescription add order: customer birthday and reminder are optional.all params are necessary and in case of no entry , there is a flag for each optional param.if that flag entered it asumed as no entry.birthday flag is "1900-01-01T05:42:13.845Z".reminder flag and duration flag are -1.address flag is " "
* @apiGroup operator
* @apiParam {Object[]} products array of product objects
* @apiParamExample {json} Request-Example:
*  {products: [...{_id: "60b72a70e353f0385c2fe5af", quantity: 2,price: "30000",size: "medium"}],
*   customer: {family: "شکوهی",mobile: "09307580142",},address: "معلم 24",description: "ساعت 21:00 تحویل داده شود"}
* @apiSuccessExample {json} Success-Response:
* {success: true, message: "سفارش شما با موفقیت ثبت شد",data: {status: true }}
*/
router.post('/', OrderController.addOrder.bind(OrderController));

/**
 * @api {get} /api/operator/v1/order/delivery get delivery location
 * @apiVersion 1.0.0
 * @apiName getdeliveryLocation
 * @apiDescription get order delivery location
 * @apiGroup operator
 * @apiParam {String} orderId order id
 * @apiSuccessExample {json} Success-Response:
 * {success: true, message: "موقعیت پیک با موفقیت ارسال شد",data: {status: true, deliveryLocation: {_id: "60b72a70e353f0385c2fe5af",city: "Mashhad",geo : [ -49.555555, 39.555555],speed : 80, bearing: 32,saveDate: "2021-08-01T09:26:22.320Z" }}}
 */
router.get('/delivery/:orderId', OrderController.getdeliveryLocation.bind(OrderController));

/**
 * @api {get} /api/operator/v1/order/ get orders
 * @apiVersion 1.0.0
 * @apiName getOrdersByFilter
 * @apiDescription get orders by filter. send each of types you want
 * @apiGroup operator
 * @apiParam {String} type filter type ("family", "mobile", "address")
 * @apiParam {String} value filter value 
 * @apiSuccessExample {json} Success-Response:
 * {success: true, message: "سفارشات با موفقیت ارسال شد",data: [...{id: "60b72a70e353f0385c2fe5af",customer: {family: "مصطفایی",mobile: "09152631225",},createdAt: "2021-06-01T06:54:01.691Z", address: "معلم 43",status: { name: "در صف انتظار", status: 0}, paid: true }]}}
 */
router.get('/:type/:value', OrderController.getOrdersByFilter.bind(OrderController));



/**
* @api {get} /api/operator/v1/order/ get order
* @apiVersion 1.0.0
* @apiName getOrder
* @apiDescription get orders by id
* @apiGroup operator
* @apiParam {String} orderId order id
* @apiSuccessExample {json} Success-Response:
* {  success: true, message: "سفارشات با موفقیت ارسال شد",data: { 
*      order: { id: "60b72a70e353f0385c2fe5af", customer: { family: "مصطفایی", mobile: "09152631225", },
*      products: [...{ _id: { _id: "61014026a1701735e409000b", name: "پپرونی"},  quantity: 2,  price: "30000",  size: "medium"  }],
*      createdAt: "2021-06-01T06:54:01.691Z", address: "معلم 43",  status: { name: "در صف انتظار"}, deliveryCost: 5, deliveryId: "610545a7a5365707ccd6a308"  },
*      deliveryLocation: {_id: "60b72a70e353f0385c2fe5af",  city: "Mashhad", geo : [ -49.555555, 39.555555],  speed : 80,  bearing: 32,  saveDate: "2021-08-01T09:26:22.320Z" },tax: 12750,  paid: true  }  }
*/
router.get('/:orderId', OrderController.getOrder.bind(OrderController));

/**
 * @api {delete} /api/operator/v1/order/ cancel order
 * @apiVersion 1.0.0
 * @apiName cancelOrder
 * @apiDescription cancel order by id
 * @apiGroup operator
 * @apiParam {String} orderId order id
 * @apiSuccessExample {json} Success-Response:
 * { success: true, message: "سفارش با موفقیت لغو شد", data: { status: true } }
 * @apiErrorExample {json} Error-Response:
 * { success: true, message: "سفارش موجود نیست", data: { status: false } }
 */
router.delete('/', OrderController.cancelOrder.bind(OrderController));

/**
 * @api {put} /api/operator/v1/order/editAddress editAddress
 * @apiName editAddress
 * @apiVersion 1.0.0
 * @apiDescription edit address of order
 * @apiGroup operator
 * @apiParam {String} orderId order id
 * @apiParam {string} adrs new address
 * @apiSuccessExample {json} Success-Response:
 * { success: true, message: "عملیات با موفقیت انجام شد", data: { status: true } }
 * @apiErrorExample {json} Error-Response:
 * { success: true, message: "سفارش موجود نیست", data: { status: false } }
 */
 router.put('/editAddress', OrderController.editAddress.bind(OrderController));




module.exports = router;