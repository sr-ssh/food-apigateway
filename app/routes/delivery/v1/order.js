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



 module.exports = router;