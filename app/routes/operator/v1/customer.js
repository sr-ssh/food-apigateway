const express = require('express');
const router = express.Router();

// controllers 
const { operator: operatorController } = config.path.controllers;

const CustomerController = require(`${operatorController}/v1/CustomerController`)


/**
 * @api {get} /api/operator/v1/customer/ get customer
 * @apiVersion 1.0.0
 * @apiName getCustomer
 * @apiDescription get customer .It gives you the customer information of the mobile you sent , if there is no customer with that mobile number it sends false. in "orderStatus" status: 2 means last order has registered in less than 40 minutes, status: 0 means last order has registered in more than 40 minutes or there is no order, status: 1 means the customer is blocked
 * @apiGroup operator
 * @apiParam {Number} mobile customer mobile 
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "اطلاعات مشتری با موفقیت ارسال شد",
 *      data: {
 *          status: true,
 *          cuatomer: {
 *            family: "مصطفایی",
 *            mobile: "09625846122",
 *            locations: [...{
 *              address: "کلاهدوز 4", 
 *              station: { code: 31 }
 *            }]
 *          },
 *          orderStatus: {
 *            status: 2,
 *            descriptionStatus: "کاربر کمتر از 40 دقیقه قبل ثبت سفارش کرده است",
 *            orderInterval: 25,
 *            orderState: "در صف انتظار"
 *          }
 *       }
 * }
 * @apiErrorExample {json} Error-Response:
 * {
 *      success: true,
 *      message: "مشتری موجود نیست",
 *      data: { status: false }
 * }
 */
 router.get('/:mobile',CustomerController.getCustomer.bind(CustomerController));



  
 module.exports = router;