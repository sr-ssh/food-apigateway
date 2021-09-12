const express = require('express');
const router = express.Router();

// controllers 
const { user: userController } = config.path.controllers;

const SettingsController = require(`${userController}/v1/SettingsController`)



/**
 * @api {put} /api/user/v1/settings/sms edit sms settings
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
 router.put('/sms',SettingsController.editSms.bind(SettingsController));



/**
 * @api {get} /api/user/v1/settings/sms get sms messages and status
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
 router.get('/sms',SettingsController.getSms.bind(SettingsController));

 module.exports = router;