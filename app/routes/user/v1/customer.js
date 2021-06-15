const express = require('express');
const router = express.Router();

// controllers 
const { user: userController } = config.path.controllers;

const CustomerController = require(`${userController}/v1/CustomerController`)


 /**
 * @api {get} /api/user/v1/customer/ get customers 
 * @apiVersion 1.0.0
 * @apiName getCustomers
 * @apiDescription get customers 
 * @apiGroup customer
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "اطلاعات مشتریان با موفقیت ارسال شد",
 *      data: [...{
 *          active: true,
 *          name: "محسن",
 *          family: "مصطفایی",
 *          username: "m.mostafaie@gmail.com",
 *          mobile: "09625846122",
 *          birthday: "1990-12-18T23:59:00.798Z",
 *          address: "چهارراه احمد اباد",
 *          createdAt: "2010-12-18T23:59:00.798Z",
 *          order: [...{
 *              _id: "15fd15rg15tytee",
 *              products: [...{
 *                  
 *              }]
 *          }],
 *          reminder: "1990-12-18T23:59:00.798Z"
 *       }]
 * }
 */
  router.get('/',CustomerController.getCustomers.bind(CustomerController));



  
 module.exports = router;