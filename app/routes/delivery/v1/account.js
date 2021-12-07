const express = require('express');
const router = express.Router();

// controllers 
const { delivery: deliveryController } = config.path.controllers;

const AccountController = require(`${deliveryController}/v1/AccountController`)

  
/**
 * @api {get} /api/delivery/v1/account get delivery account
 * @apiVersion 1.0.0
 * @apiName getAccount
 * @apiDescription get delivery account
 * @apiGroup delivery
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "شارژ کاربر با موفقیت ارسال شد",
 *      data: {
 *        status: true,
 *        data: {
 *          sheba: "1631241743125", 
 *          accountNumber: "659721567835487", 
 *          cardNumber: "5859 8310 9970 9288",
 *          charge: "140000"
 *        }
 *      }
 * }
 * @apiErrorExample {json} Error-Response:
 * {
 *      success: true,
 *      message: "کاربر موجود نمی باشد",
 *      data: {
 *        status: false
 *      }
 * }
 */
 router.get('/',AccountController.getAccount.bind(AccountController));




 /**
 * @api {get} /api/delivery/v1/account add and edit delivery account
 * @apiVersion 1.0.0
 * @apiName registerAccount
 * @apiDescription add and edit delivery account
 * @apiGroup delivery
 * @apiParam {String} cardNumber delivery card number
 * @apiParam {String} [accountNumber] delivery account number
 * @apiParam {String} [sheba] delivery sheba
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "اطلاعات حساب با موفقیت ثبت شد",
 *      data: {
 *        status: true
 *      }
 * }
 */
  router.post('/',AccountController.registerAccount.bind(AccountController));


module.exports = router;