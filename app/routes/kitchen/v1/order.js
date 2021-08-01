const express = require('express');
const router = express.Router();

// controllers 
const { kitchen: kitchenController } = config.path.controllers;

const OrderController = require(`${kitchenController}/v1/OrderController`)



 /**
 * @api {get} /api/kitchen/v1/order/active get active orders 
 * @apiVersion 1.0.0
 * @apiName getActiveOrders
 * @apiDescription get active orders : "active" orders are not ready yet.
 * @apiGroup kitchen
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "سفارشات با موفقیت ارسال شد",
 *      data: [...{
 *             id: "60b72a70e353f0385c2fe5af",
 *             products: [...{
 *                 _id: { _id: "61014026a1701735e409000b", name: "پپرونی"},
 *                 quantity: 2,
 *                 size: 'medium'
 *             }],
 *             customer: {
 *                 _id: "7465148754878",
 *                 family: "مصطفایی",
 *                 mobile: "09152631225",
 *             },
 *            createdAt: "2021-06-01T06:54:01.691Z",
 *            address: "معلم 43",
 *            GPS: { type: "point", coordinates: [-122.5, 37.7]},
 *            status: { name: "active"}
 *          }]
 *      }
 * }
 */
  router.get('/active',OrderController.getActiveOrders.bind(OrderController));



/**
 * @api {put} /api/kitchen/v1/order/ready ready order
 * @apiVersion 1.0.0
 * @apiName readyOrder
 * @apiDescription ready order
 * @apiGroup kitchen
 * @apiParam {varchar} orderId order id
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "وضعیت سفارش با موفقیت ویرایش شد"
 * }
 * @apiErrorExample {json} Error-Response:
 * {
 *      success: false,
 *      message: "سفارش موجود نیست"
 * }
 */
router.put('/ready',OrderController.readyOrder.bind(OrderController));


 module.exports = router;