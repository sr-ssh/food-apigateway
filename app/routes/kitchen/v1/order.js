const express = require('express');
const router = express.Router();

// controllers 
const { kitchen: kitchenController } = config.path.controllers;

const OrderController = require(`${kitchenController}/v1/OrderController`)



 /**
 * @api {get} /api/kitchen/v1/order/active get active order
 * @apiVersion 1.0.0
 * @apiName getActiveOrder
 * @apiDescription get active order : "active" orders are not ready yet.
 * @apiGroup kitchen
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "سفارشات با موفقیت ارسال شد",
 *      data: [...{
 *             "_id": "6107cfccf74a1a3398ca5dc8"
 *             products: [...{
 *                 _id: { _id: "61014026a1701735e409000b", name: "پپرونی"},
 *                 quantity: 2,
 *                 size: 'medium'
 *             }],
 *             customer: {
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
  router.get('/active',OrderController.getActiveOrder.bind(OrderController));



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



/**
 * @api {get} /api/delivery/v1/order/finished get finished orders 
 * @apiVersion 1.0.0
 * @apiName getfinishedOrders
 * @apiDescription get finished orders : "finished" orders have delivered to the customer or canceled
 * @apiGroup kitchen
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "سفارشات با موفقیت ارسال شد",
 *      data: [...{
 *             id: "60b72a70e353f0385c2fe5af",
 *             address: "کلاهدوز 4",
 *             finishDate: "2021-06-01T06:54:01.691Z",
 *             status: { status: 1, name: "لغو شده"},
 *             customer: {
 *                  family: "زهرا رضوی"
 *              },
 *             products: [...{
 *                  name: "پپرونی",
 *                  quantity: 1,
 *              }],
 *            description: "بدون قارچ"
 *          }]
 *      }
 * }
 */
 router.get('/finished',OrderController.getfinishedOrders.bind(OrderController));


 /**
 * @api {get} /api/delivery/v1/order/ready get ready orders 
 * @apiVersion 1.0.0
 * @apiName getreadyOrders
 * @apiDescription get ready orders : "ready" orders are in cooking or in delivery
 * @apiGroup kitchen
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "سفارشات با موفقیت ارسال شد",
 *      data: [...{
 *             id: "60b72a70e353f0385c2fe5af",
 *             address: "کلاهدوز 4",
 *             createdAt: "2021-06-01T06:54:01.691Z",
 *             status: { status: 1, name: لغو شده},
 *             customer: {
 *                  family: "زهرا رضوی",
 *                  mobile: "09307580143"
 *              },
 *             products: [...{
 *                  name: "پپرونی",
 *                  quantity: 1,
 *              }]
 *          }]
 *      }
 * }
 */
  router.get('/ready',OrderController.getreadyOrders.bind(OrderController));


 module.exports = router;