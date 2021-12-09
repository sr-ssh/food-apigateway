const express = require("express");
const router = express.Router();

// controllers
const { user: userController } = config.path.controllers;

const SettingsController = require(`${userController}/v1/SettingsController`);

/**
 * @api {put} /api/user/v1/settings/sms edit sms settings
 * @apiVersion 1.0.0
 * @apiName editOrderSettings
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
router.put(
  "/order",
  SettingsController.editOrderSettings.bind(SettingsController)
);

/**
 * @api {get} /api/user/v1/settings/order get order settings
 * @apiVersion 1.0.0
 * @apiName getOrderSettings
 * @apiDescription get order settings
 * @apiGroup user
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "تنظیمات سفارش با موفقیت فرستاده شد",
 *      data: {
 *          addOrderSms: {
 *              text: "سفارش شما با موفقیت ثبت شد.\n ورود : \n http://happypizza.ir", 
 *              status: true
 *          },
            confirmTime: 1,
            cookTime: 8,
            finishedOrderSms: {
                text: "سفارش شما به مقصد رسید. از اعتماد شما به هپی پیتزا ممنونیم. منتظر سفارش های بعدی شما هستیم.", 
                status: true
            },
            inCookingOrderSms: {
                text: "سفارش شما در حال پخت می باشد.", 
                status: true
            },
            inProcessOrderSms: {
                text: "سفارش شما در حال آماده سازی است.", 
                status: true
            },
            inServiceOrderSms: {
                text: "سفارش شما در حال ارسال است.", 
                status: true
            },
            isPayNecessary: false,
            successfullPaymentSms: {
                text: "سفارش شما با موفقیت پرداخت شد.", 
                status: true
            }
        }
 * }
 */
router.get(
  "/order",
  SettingsController.getOrderSettings.bind(SettingsController)
);

/**
 * @api {get} /api/user/v1/settings/order get pricing settings
 * @apiVersion 1.0.0
 * @apiName getPricing
 * @apiDescription get pricing settings
 * @apiGroup user
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "تنظیمات قیمت دهی با موفقیت فرستاده شد",
 *      data: {
 *          enter: "3000", 
 *          distance: 2, 
 *          duration: 2, 
 *          lowest: "8000"
 *      }
 * }
 */
router.get(
  "/pricing",
  SettingsController.getPricing.bind(SettingsController)
);

/**
 * @api {put} /api/user/v1/settings/pricing editPricing
 * @apiVersion 1.0.0
 * @apiName editPricing
 * @apiDescription manager can change pricing with this api !
 * @apiGroup user
 * @apiParam {String} enter
 * @apiParam {Number} distance
 * @apiParam {Number} duration
 * @apiParam {String} lowest
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "ویرایش با موفقیت انجام شد"
 */
router.put("/pricing", SettingsController.editPricing.bind(SettingsController));

module.exports = router;
