const express = require('express');
const router = express.Router();

// controllers 
const { user: userController } = config.path.controllers;

const ChargeController = require(`${userController}/v1/ChargeController`)


/**
 * @api {get} /api/user/v1/charge getDeliveryCharges
 * @apiVersion 1.0.0
 * @apiName getCharges
 * @apiDescription get delivery charges
 * @apiGroup user
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "شارژ پیک ها با موفقیت ارسال شد",
 *      data: [...{
 *          _id: "612a05bc30b788f3a369ad8e", 
 *          charge: 10000, 
 *          mobile: "09152226363", 
 *          family: "تینا برایی", 
 *          sheba: "IR020190000000101975503003", 
 *          cardNumber: "5859 8310 9970 9258",
 *          accountNumber: "4415474710"
 *       }]
 * }
 */
router.get('/', ChargeController.getCharges.bind(ChargeController));

/**
* @api {post} /api/user/v1/chargeAddingChargeDelivery
* @apiVersion 1.0.0
* @apiName addingCharges
* @apiDescription adding delivery charges
* @apiGroup user
* @apiSuccessExample {json} Success-Response:
* {
*      success: true,
*      message: "شارژ پیک با موفقیت دریافت شد",
*      data: [...{
*          _id: "612a05bc30b788f3a369ad8e", 
*          charge: 10000, 
*          mobile: "09152226363", 
*          family: "تینا برایی", 
*          sheba: "IR020190000000101975503003", 
*          cardNumber: "5859 8310 9970 9258",
*          accountNumber: "4415474710"
*       }]
* }
*/
router.post('/', ChargeController.addCharges.bind(ChargeController));


module.exports = router;