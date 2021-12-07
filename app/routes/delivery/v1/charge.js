const express = require('express');
const router = express.Router();

// controllers 
const { delivery: deliveryController } = config.path.controllers;

const ChargeController = require(`${deliveryController}/v1/ChargeController`)


/**
 * @api {get} /api/delivery/v1/charge get delivery charge
 * @apiVersion 1.0.0
 * @apiName getCharge
 * @apiDescription get delivery charge
 * @apiGroup delivery
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "شارژ کاربر با موفقیت ارسال شد",
 *      data: 60000
 * }
 */
router.get('/', ChargeController.getCharge.bind(ChargeController));


module.exports = router;