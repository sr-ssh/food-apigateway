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
  router.get('/pending',OrderController.getPendingOrders.bind(OrderController));



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
  router.post('/',OrderController.acceptOrder.bind(OrderController));

/**
 * @api {get} /api/delivery/v1/order/accepted get accepted orders 
 * @apiVersion 1.0.0
 * @apiName getacceptedOrders
 * @apiDescription get accepted orders : "accepted" orders are accepted by delivery
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
 *             status: { name: 3},
 *             customer: {
 *                  mobile: "09307580143",
 *                  family: "زهرا رضوی"
 *              },
 *             products: [...{
 *                  _id: { _id: "61014026a1701735e409000b", name: "پپرونی"},
 *                  price: "60000",
 *                  quantity: 1,
 *                  size: 'medium'
 *              }],
 *              desciption: "ساعت 1 تحویل داده شود"
 *          }]
 *      }
 * }
 */
  router.get('/accepted',OrderController.getacceptedOrders.bind(OrderController));



 module.exports = router;