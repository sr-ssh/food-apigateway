const express = require('express');
const router = express.Router();

// controllers 
const { user: userController } = config.path.controllers;

const OrderController = require(`${userController}/v1/OrderController`)


/**
 * @api {post} /api/user/v1/order/ add order 
 * @apiVersion 1.0.0
 * @apiName addOrder
 * @apiDescription add order: customer birthday and reminder are optional.all params are necessary and in case of no entry , there is a flag for each optional param.if that flag entered it asumed as no entry.birthday flag is "1900-01-01T05:42:13.845Z".reminder flag and duration flag are -1.address flag is " "
 * @apiGroup user
 * @apiParam {Object[]} products array of product objects
 * @apiParam {Object} customer customer information
 * @apiParam {int} reminder number of days for reminding
 * @apiParam {int} duration minutes to the order become ready
 * @apiParam {varchar} address number of days for reminding
 * @apiParamExample {json} Request-Example:
 *  {
 *      products: [...{
 *          _id: "60b72a70e353f0385c2fe5af",
 *          quantity: 2,
 *          sellingPrice: "30000"
 *      }],
 *      customer: {
 *          family: "شکوهی",
 *          mobile: "09307580142",
 *          birthday: "2021-05-31T05:42:13.845Z"
 *      },
 *      reminder: 7,
 *      duration: 40,
 *      address: "معلم 24"
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
 * @apiDescription get orders : all params are necessary and in case of no entry , there is a flag for each optional param.if that flag entered it asumed as no entry.
 * @apiGroup user
 * @apiParam {varchar} customerName customer family (" ")
 * @apiParam {varchar} customerMobile customer mobile number ("0")
 * @apiParam {varchar} startDate get orders from this date ("1900-01-01T05:42:13.845Z")
 * @apiParam {varchar} endDate get orders to this date ("1900-01-01T05:42:13.845Z")
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "سفارشات با موفقیت ارسال شد",
 *      data: [...{
 *          active: true,
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
 *         updatedAt: "2021-06-01T06:54:01.691Z"
 *      }]
 * }
 */
  router.get('/:customerName/:customerMobile/:startDate/:endDate',OrderController.getOrders.bind(OrderController));



  /**
 * @api {put} /api/user/v1/order/status edit order status
 * @apiVersion 1.0.0
 * @apiName editOrderStatus
 * @apiDescription edit order status, in status : send 0 for normal order , send 2 to cancele the order
 * @apiGroup user
 * @apiParam {int} status order status
 * @apiParam {varchar} orderId order id
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "وضعیت سفارش با موفقیت ویرایش شد"
 */
   router.put('/status',OrderController.editOrderStatus.bind(OrderController));



/**
 * @api {post} /api/user/v1/order/status add order status
 * @apiVersion 1.0.0
 * @apiName addOrderStatus
 * @apiDescription add order status
 * @apiGroup user
 * @apiParam {int} status order status status
 * @apiParam {String} name order status name
 * @apiParam {String} [description] order status description
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "وضعیت سفارش با موفقیت اضافه شد", 
 *      data: { status: true }
 * }
 * @apiErrorExample {json} Error-Response:
 * {
 *      success: true,
 *      message : "وضعیتی با این اطلاعات موجود است", 
 *      data: {status: false}
 * }
 */
  router.post('/status',OrderController.addOrderStatus.bind(OrderController));


/**
 * @api {post} /api/user/v1/order/delivery/sms send delivery sms
 * @apiVersion 1.0.0
 * @apiName sendDeliverySms
 * @apiDescription send delivery sms, 
 * @apiGroup user
 * @apiParam {varchar} mobile delivery mobile
 * @apiParam {varchar} orderId order id
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "وضعیت سفارش با موفقیت ویرایش شد"
 */
router.post('/delivery/sms',OrderController.sendDeliverySms.bind(OrderController));



/**
 * @api {put} /api/user/v1/order/sms edit sms settings
 * @apiVersion 1.0.0
 * @apiName editSms
 * @apiDescription edit sms settings, type 1 is customer sms after adding order, type 2 is customer info for delivery, type 3 ic acknowledge for customer that your product is sent.
 * @apiGroup user
 * @apiParam {int} type sms type , {min:1, max:3}
 * @apiParam {varchar} text sms text
 * @apiParam {varchar} status sms status
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "ویرایش با موفقیت انجام شد"
 */
 router.put('/sms',OrderController.editSms.bind(OrderController));



/**
 * @api {get} /api/user/v1/order/sms get sms messages and status
 * @apiVersion 1.0.0
 * @apiName getSms
 * @apiDescription get sms messages and status 
 * @apiGroup user
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "با موفقیت انجام شد",
 *      data: {}
 * }
 *     
 */
 router.get('/sms',OrderController.getSms.bind(OrderController));

 module.exports = router;