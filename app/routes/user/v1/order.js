const express = require('express');
const router = express.Router();

// controllers 
const { user: userController } = config.path.controllers;

const OrderController = require(`${userController}/v1/OrderController`)


/**
 * @api {post} /api/user/v1/order/ add order 
 * @apiVersion 1.0.0
 * @apiName addOrder
 * @apiDescription add order: customer birthday is also optional
 * @apiGroup order
 * @apiParam {Object[]} products array of product objects
 * @apiParam {Object} customer customer information
 * @apiParam {varchar} [description] order description
 * @apiParam {int} [reminder] number of days for reminding
 * @apiParamExample {json} Request-Example:
 *  {
 *      products: [...{
 *          _id: " 60b72a70e353f0385c2fe5af",
 *          quantity: 2,
 *          sellingPrice: "30000"
 *      }],
 *      customer: {
 *          family: "شکوهی",
 *          mobile: "09307580142",
 *          birthday: "2021-05-31T05:42:13.845Z"
 *      },
 *      description: "الکل هم بیاورید",
 *      reminder: 7
 *  }
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "سفارش شما با موفقیت ثبت شد"
 * }
 */
 router.post('/',OrderController.addOrder.bind(OrderController));




 /**
 * @api {get} /api/user/v1/order/ get orders 
 * @apiVersion 1.0.0
 * @apiName getOrders
 * @apiDescription get orders 
 * @apiGroup order
 * @apiParam {varchar} [mobile] customer mobile
 * @apiParam {varchar} [startDate] get orders from this date
 * @apiParam {varchar} [endDate] get orders to this date
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "سفارشات با موفقیت ارسال شد",
 *      data: [...{
 *          active: true,
 *          products: [...{
 *              _id: " 60b72a70e353f0385c2fe5af",
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
 *         updatedAt: "2021-06-01T06:54:01.691Z"
 *      }]
 * }
 */
  router.get('/',OrderController.getOrders.bind(OrderController));


 module.exports = router;