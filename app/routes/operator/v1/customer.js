const express = require('express');
const router = express.Router();

// controllers 
const { operator: operatorController } = config.path.controllers;

const CustomerController = require(`${operatorController}/v1/CustomerController`)


/**
 * @api {get} /api/operator/v1/customer/ get customer
 * @apiVersion 1.0.0
 * @apiName getCustomer
 * @apiDescription get customer .It gives you the customer information of the mobile you sent , if there is no customer with that mobile number it sends false
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
 *              GPS: { type: "Point", coordinates: [-43.837452, 33.987689] }
 *            }]
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