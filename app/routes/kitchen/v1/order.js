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
 *                 name: "لاته",
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
 * @api {put} /api/kitchen/v1/order/status edit order status
 * @apiVersion 1.0.0
 * @apiName editOrderStatus
 * @apiDescription edit order status, in status : only send 1 when order is ready
 * @apiGroup kitchen
 * @apiParam {int} status order status
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
router.put('/status',OrderController.editOrderStatus.bind(OrderController));


 module.exports = router;