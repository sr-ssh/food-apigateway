const express = require('express');
const router = express.Router();

// controllers 
const { user: userController } = config.path.controllers;

const CustomerController = require(`${userController}/v1/CustomerController`)


 /**
 * @api {get} /api/user/v1/customer/ get customers 
 * @apiVersion 1.0.0
 * @apiName getCustomers
 * @apiDescription get customers . respnse description: by "order" field we meant order length, "lastBuy" is the date of the customer last buy,and "total" is the total price of all customer orders
 * @apiGroup customer
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "اطلاعات مشتریان با موفقیت ارسال شد",
 *      data: [...{
 *          active: true,
 *          family: "مصطفایی",
 *          mobile: "09625846122",
 *          birthday: "1990-12-18T23:59:00.798Z",
 *          createdAt: "2010-12-18T23:59:00.798Z",
 *          order: 4,
 *          lastBy: "2021-12-18T23:59:00.798Z",
 *          total: 270000
 *       }]
 * }
 */
  router.get('/',CustomerController.getCustomers.bind(CustomerController));



  
 module.exports = router;