const express = require('express');
const router = express.Router();

// controllers 
const { customer: customerController } = config.path.controllers;

const OrderController = require(`${customerController}/v1/OrderController`)

  
/**
 * @api {post} /api/customer/v1/order/product get order products
 * @apiVersion 1.0.0
 * @apiName getOrderProducts
 * @apiDescription get order products
 * @apiGroup customer
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "محصولات سفارش با موفقیت ارسال شد",
 *      data: [...{
 *          _id: '60fd0aacca33dd0374b55650',
 *          name: "نان سیر",
 *          sellingPrice: "25",
 *          description: "سیر . خمیر تازه . اویشن",
 *          type: {name: 'pizza'}
 *        }]
 * }
 */
 router.get('/product',OrderController.getOrderProducts.bind(OrderController));

 /**
 * @api {post} /api/user/v1/order/ add order 
 * @apiVersion 1.0.0
 * @apiName addOrder
 * @apiDescription add order: customer birthday and reminder are optional.all params are necessary and in case of no entry , there is a flag for each optional param.if that flag entered it asumed as no entry.birthday flag is "1900-01-01T05:42:13.845Z".reminder flag and duration flag are -1.address flag is " "
 * @apiGroup user
 * @apiParam {Object[]} products array of product objects
 * @apiParamExample {json} Request-Example:
 *  {
 *      products: [...{
 *          _id: "60b72a70e353f0385c2fe5af",
 *          quantity: 2,
 *          sellingPrice: "30000"
 *      }]
 *  }
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "سفارش شما با موفقیت ثبت شد"
 * }
 * @apiErrorExample {json} Error-Response:
 * {
 *      success: true,
 *      message: "کاربر یافت نشد"
 * }
 */
  router.post('/',OrderController.addOrder.bind(OrderController));



module.exports = router;