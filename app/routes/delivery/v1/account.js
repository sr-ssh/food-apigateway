const express = require('express');
const router = express.Router();

// controllers 
const { delivery: deliveryController } = config.path.controllers;

const AccountController = require(`${deliveryController}/v1/AccountController`)

  
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
 router.get('/',AccountController.getAccount.bind(AccountController));




 /**
 * @api {get} /api/delivery/v1/charge get delivery charge
 * @apiVersion 1.0.0
 * @apiName registerAccount
 * @apiDescription get delivery charge
 * @apiGroup delivery
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "شارژ کاربر با موفقیت ارسال شد",
 *      data: 60000
 * }
 */
  router.post('/',AccountController.registerAccount.bind(AccountController));


module.exports = router;