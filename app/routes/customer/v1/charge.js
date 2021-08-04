const express = require('express');
const router = express.Router();

// controllers 
const { customer: customerController } = config.path.controllers;

const ChargeController = require(`${customerController}/v1/ChargeController`)

  
/**
 * @api {get} /api/customer/v1/charge get customer charge
 * @apiVersion 1.0.0
 * @apiName getCharge
 * @apiDescription get customer charge
 * @apiGroup customer
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "شارژ مشتری با موفقیت ارسال شد",
 *      data: 60000
 * }
 */
 router.get('/',ChargeController.getCharge.bind(ChargeController));


module.exports = router;