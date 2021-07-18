const express = require('express');
const router = express.Router();

// controllers 
const { user: userController } = config.path.controllers;

const ReminderController = require(`${userController}/v1/ReminderController`)



 /**
 * @api {get} /api/user/v1/reminder get reminders
 * @apiVersion 1.0.0
 * @apiName getReminder
 * @apiDescription get Reminder: sends reminders of today.birthday of the customer may not be send because it's optional in the first place.
 * @apiGroup user
 * @apiSuccessExample {json} Success-Response:
 * {
 *     success: true,
 *     message: "لیست یادآوری با موفقیت ارسال شد",
 *     data: {...[
 *          date: '2021-06-22T12:30:36.747Z',
 *          customer: {
 *              _id: '60d030e8716abd4c9428d373',
 *              family: 'شکوهی',
 *              mobile: '09307580142',
 *              birthday: '2021-05-31T05:42:13.845Z'
 *          },
 *          order: {
 *              _id: '60d3296cc29f9d1898abb62a',
 *              active: true,
 *              creadtedAt: '2021-06-23T12:30:36.679Z',
 *              customer: '60d030e8716abd4c9428d373',
 *              products:{...[
 *                  _id: '60b72a70e353f0385c2fe5af',
 *                  name: 'آیس لته',
 *                  quantity: 1,
 *                  sellingPrice: '30000'
 *              ]}
 *          }
 *      ]}
 * }
 */
  router.get('/',ReminderController.getReminders.bind(ReminderController)); 
 
 
  

 module.exports = router;