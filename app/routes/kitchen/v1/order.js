const express = require('express');
const router = express.Router();

// controllers 
const { kitchen: kitchenController } = config.path.controllers;

const OrderController = require(`${kitchenController}/v1/OrderController`)



 /**
 * @api {get} /api/kitchen/v1/order/ get orders 
 * @apiVersion 1.0.0
 * @apiName getOrders
 * @apiDescription get orders 
 * @apiGroup kitchen
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "سفارشات با موفقیت ارسال شد",
 *      data: [...{
 *          id: "60b72a70e353f0385c2fe5af",
 *          products: [...{
 *              _id: "60b72a70e353f0385c2fe5af",
 *              name: "لاته",
 *              quantity: 2,
 *              sellingPrice: "30000"
 *          }],
 *          customer: {
 *              _id: "7465148754878",
 *              family: "مصطفایی",
 *              mobile: "09152631225",
 *              createdAt: "2021-06-01T06:54:01.691Z"
 *          },
 *         createdAt: "2021-06-01T06:54:01.691Z",
 *         updatedAt: "2021-06-01T06:54:01.691Z",
 *         readyTime: "2021-06-01T06:54:01.691Z",
 *         description: "با سس اضافه"
 *      }]
 * }
 */
  router.get('/',OrderController.getOrders.bind(OrderController));


 module.exports = router;