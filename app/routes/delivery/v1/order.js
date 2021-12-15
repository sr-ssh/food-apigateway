const express = require('express');
const router = express.Router();

// controllers 
const { delivery: deliveryController } = config.path.controllers;

const OrderController = require(`${deliveryController}/v1/OrderController`)



/**
* @api {get} /api/delivery/v1/order/pending get pending orders 
* @apiVersion 1.0.0
* @apiName getPendingOrders
* @apiDescription get pending orders : "pending" orders are ready and cooked and ready for delivery
* @apiGroup delivery
* @apiSuccessExample {json} Success-Response:
* {
*      success: true,
*      message: "سفارشات با موفقیت ارسال شد",
*      data: [...{
*             id: "60b72a70e353f0385c2fe5af",
*            createdAt: "2021-06-01T06:54:01.691Z",
*            status: { name: "آماده"}
*          }]
*      }
* }
*/
router.get('/pending', OrderController.getPendingOrders.bind(OrderController));



/**
* @api {post} /api/delivery/v1/order accept order
* @apiVersion 1.0.0
* @apiName acceptOrder
* @apiDescription accept order for delivery
* @apiGroup delivery
* @apiParam {String} orderId order id
* @apiSuccessExample {json} Success-Response:
* {
*      success: true,
*      message: "سفارشات با موفقیت ارسال شد",
*      data: { status: true }
* }
* @apiErrorExample {json} Error-Response:
* {
*      success: true,
*      message: "سفارش موجود نیست",
*      data: { status: false }
* }
*/
router.post('/', OrderController.acceptOrder.bind(OrderController));

/**
 * @api {get} /api/delivery/v1/order/accepted get accepted orders 
 * @apiVersion 1.0.0
 * @apiName getacceptedOrders
 * @apiDescription get accepted orders : "accepted" orders are accepted by delivery."paymentType=1" means online pay and "paymentType=0" means pose pay. "orderType=1" means online order and "orderType=0" means phone order
 * @apiGroup delivery
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "سفارشات با موفقیت ارسال شد",
 *      data: [...{
 *             id: "60b72a70e353f0385c2fe5af",
 *             address: "کلاهدوز 4",
 *             GPS: { coordinates: [59.605933, 36.29792]},
 *             createdAt: "2021-06-01T06:54:01.691Z",
 *             status: { name: "در حال ارسال", status: 3},
 *             customer: {
 *                  mobile: "09307580143",
 *                  family: "زهرا رضوی"
 *              },
 *             products: [...{
 *                  name: "پپرونی",
 *                  price: "60000",
 *                  quantity: 1,
 *                  size: 'medium',
 *                  discount: false
 *              }],
 *              desciption: "ساعت 1 تحویل داده شود",
 *              discounts: 20000,
 *              total: 120000,
 *              deliveryCost: 5000
 *              paid: true ,
 *              paymentType: 1,
 *              orderType: 1
 *          }]
 *      }
 * }
 */
router.get('/accepted', OrderController.getacceptedOrders.bind(OrderController));


/**
 * @api {post} /api/delivery/v1/order/finish finish order
 * @apiVersion 1.0.0
 * @apiName finishOrder
 * @apiDescription finish order for delivery
 * @apiGroup delivery
 * @apiParam {String} orderId order id
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "وضعیت سفارش با موفقیت ثبت شد",
 *      data: { status: true }
 * }
 * @apiErrorExample {json} Error-Response:
 * {
 *      success: true,
 *      message: "سفارش موجود نیست",
 *      data: { status: false }
 * }
 */
router.post('/finish', OrderController.finishOrder.bind(OrderController));



/**
 * @api {get} /api/delivery/v1/order/finished get finished orders 
 * @apiVersion 1.0.0
 * @apiName getfinishedOrders
 * @apiDescription get finished orders : "finished" orders are have delivered to the customer or canceled
 * @apiGroup delivery
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "سفارشات با موفقیت ارسال شد",
 *      data: [...{
 *             id: "60b72a70e353f0385c2fe5af",
 *             address: "کلاهدوز 4",
 *             finishDate: "2021-06-01T06:54:01.691Z",
 *             status: { status: 1, name: لغو شده},
 *             customer: {
 *                  family: "زهرا رضوی"
 *              },
 *             products: [...{
 *                  _id: { _id: "61014026a1701735e409000b", name: "پپرونی"},
 *                  price: "60000",
 *                  quantity: 1,
 *                  size: 'medium',
 *                  discount : true
 *              }]
 *          }]
 *      }
 * }
 */
router.get('/finished', OrderController.getfinishedOrders.bind(OrderController));




/**
 * @api {post} /api/delivery/v1/order/customer not responsive customer
 * @apiVersion 1.0.0
 * @apiName notResposiveCustomer
 * @apiDescription not responsive customer
 * @apiGroup delivery
 * @apiParam {String} orderId order id
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "اطلاعات دریافت شد",
 *      data: { status: true }
 * }
 * @apiErrorExample {json} Error-Response:
 * {
 *      success: true,
 *      message: "سفارش موجود نیست",
 *      data: { status: false }
 * }
 */
router.post('/customer', OrderController.notResposiveCustomer.bind(OrderController));


module.exports = router;