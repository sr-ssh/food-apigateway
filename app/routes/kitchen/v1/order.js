const express = require('express');
const router = express.Router();

// controllers 
const { kitchen: kitchenController } = config.path.controllers;

const OrderController = require(`${kitchenController}/v1/OrderController`)



 /**
 * @api {get} /api/kitchen/v1/order/ get orders 
 * @apiVersion 1.0.0
 * @apiName getOrders
 * @apiDescription get orders : it gives 3 arrays: "active", "ready", and "delivery" orders. "active" orders are not ready yet, "ready" orders are done by cook, and "delivdery" orders have delivered to delivery man.
 * @apiGroup kitchen
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "سفارشات با موفقیت ارسال شد",
 *      data: {
 *          active: [...{
 *             id: "60b72a70e353f0385c2fe5af",
 *             products: [...{
 *                 name: "لاته",
 *                 quantity: 2,
 *             }],
 *             customer: {
 *                 _id: "7465148754878",
 *                 family: "مصطفایی",
 *                 mobile: "09152631225",
 *             },
 *            createdAt: "2021-06-01T06:54:01.691Z",
 *            address: "معلم 43"
 *          }],
 *          ready: [...{
 *             id: "60b72a70e353f0385c2fe5af",
 *             products: [...{
 *                 name: "لاته",
 *                 quantity: 2,
 *             }],
 *             customer: {
 *                 _id: "7465148754878",
 *                 family: "مصطفایی",
 *                 mobile: "09152631225",
 *             },
 *             createdAt: "2021-06-01T06:54:01.691Z",
 *             address: "معلم 43"
 *          }],
 *          delivery: [...{
 *             id: "60b72a70e353f0385c2fe5af",
 *             products: [...{
 *                 name: "لاته",
 *                 quantity: 2,
 *             }],
 *             customer: {
 *                 _id: "7465148754878",
 *                 family: "مصطفایی",
 *                 mobile: "09152631225",
 *             },
 *             createdAt: "2021-06-01T06:54:01.691Z",
 *             address: "معلم 43"
 *          }]
 *      }
 * }
 */
  router.get('/',OrderController.getOrders.bind(OrderController));



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