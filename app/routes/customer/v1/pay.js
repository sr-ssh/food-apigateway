const express = require('express');
const router = express.Router();

// controllers 
const { customer: customerController } = config.path.controllers;

const PayController = require(`${customerController}/v1/PayController`)

  
/**
 * @api {get} /api/customer/v1/pay pay order
 * @apiVersion 1.0.0
 * @apiName payOrder
 * @apiDescription pay order: if the order pay with charge, "onlinePay: false" and no more fields, if the online pay was unsuccessfull , there will be no "payURl".
 * @apiGroup customer
 * @apiParam {String} orderId order id
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "شارژ کاربر با موفقیت ارسال شد",
 *      data: {
 *        onlinePay: true, 
 *        payStatus: 100, 
 *        payURL: "https://www.zarinpal.com/pg/transaction/pay/585657"
 *      }
 * }
 * @apiErrorExample {json} Error-Response:
 * {
 *      success: true,
 *      message: "سفارش موجود نیست", 
 *      data: { status: false }
 * }
 */
 router.post('/',PayController.payOrder.bind(PayController));



 /**
 * @api {get} /api/customer/v1/pay validate pay
 * @apiVersion 1.0.0
 * @apiName validatePay
 * @apiDescription validate pay.send params as query.Status is "OK",or "NOK"
 * @apiGroup customer
 * @apiParam {String} Authority pay authority
 * @apiParam {String} Status pay status
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "پرداخت با موفقیت انجام شد", 
 *      data: { status: true }
 * }
 * @apiErrorExample {json} Error-Response:
 * {
 *      success: true,
 *      message: "پرداخت انجام نشد", 
 *      data: { status: false }
 * }
 */
  router.get('/',PayController.validatePay.bind(PayController));


module.exports = router;