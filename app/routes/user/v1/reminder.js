const express = require('express');
const router = express.Router();

// controllers 
const { user: userController } = config.path.controllers;

const ReminderController = require(`${userController}/v1/ReminderController`)



 /**
 * @api {get} /api/user/v1/reminder get reminders
 * @apiVersion 1.0.0
 * @apiName getReminder
 * @apiDescription get Reminder
 * @apiGroup reminder
 * @apiSuccessExample {json} Success-Response:
 * {
 *     success: true,
 *     message: "لیست یادآوری با موفقیت ارسال شد"
 * }
 */
  router.get('/',ReminderController.getReminders.bind(ReminderController)); 
 
 
  

 module.exports = router;