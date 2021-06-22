const express = require('express');
const router = express.Router();

// controllers 
const { user: userController } = config.path.controllers;

const CustomerController = require(`${userController}/v1/CustomerController`)


 /**
 * @api {get} /api/user/v1/customer/ get customers 
 * @apiVersion 1.0.0
 * @apiName getCustomers
 * @apiDescription get customers . respnse description: by "order" field we meant order length, "lastBuy" is the date of the customer last buy,and "total" is the total price of all customer orders. all params are necessary and in case of no entry , there is a flag in parantheses for each param.if that flag entered it asumed as no entry
 * @apiGroup customer
 * @apiParam {varchar} family customer family ("")
 * @apiParam {varchar} mobile customer mobile ("")
 * @apiParam {varchar} createdAtFrom customer membership from this date ("")
 * @apiParam {varchar} createdAtTo customer membership until this date ("")
 * @apiParam {varchar} lastBuyFrom customer last buy from this date ("")
 * @apiParam {varchar} lastBuyTo customer last buy until this date ("")
 * @apiParam {int} orderFrom minimum number of orders (-1)
 * @apiParam {int} orderTo maximum number of orders (-1)
 * @apiParam {varchar} totalFrom minimum total price of all orders of customer (0)
 * @apiParam {varchar} totalTo maximum total price of all orders of customer (0)
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
  router.get('/:family?/:mobile?/:createdAtFrom?/:createdAtTo?/:lastBuyFrom?/:lastBuyTo?/:orderFrom?/:orderTo?/:totalFrom?/:totalTo?',CustomerController.getCustomers.bind(CustomerController));



  
 module.exports = router;