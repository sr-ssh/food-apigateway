const express = require('express');
const router = express.Router();

// controllers 
const { user: userController } = config.path.controllers;

const FinanceController = require(`${userController}/v1/FinanceController`)


 /**
 * @api {get} /api/user/v1/finance/summary get finance summary
 * @apiVersion 1.0.0
 * @apiName getFinanceSummary
 * @apiDescription get finance summary
 * @apiGroup finance
 * @apiSuccessExample {json} Success-Response:
 * {
 *     success: true,
 *     message: "مجموع درامد ها و مخارج با موفقیت ارسال شد",
 *     data: {
 *         income: "1500000",
 *         outcome: "1000000"
 *     }
 * }
 */
 router.get('/summary',FinanceController.getFinanceSummary.bind(FinanceController)); 



 
 /**
 * @api {get} /api/user/v1/finance/bill get all bills
 * @apiVersion 1.0.0
 * @apiName getBills
 * @apiDescription get all bills
 * @apiGroup finance
 * @apiSuccessExample {json} Success-Response:
 * {
 *     success: true,
 *     message: "هزینه های جاری با موفقیت ارسال شد",
 *     data: [...{
 *          active: true,
 *          name: "اجاره",
 *          cost: "2000000",
 *          createdAt: "2021-06-01T06:54:01.691Z"
 *     }]
 * }
 */
 router.get('/bill',FinanceController.getBills.bind(FinanceController)); 




 /**
 * @api {post} /api/user/v1/finance/bill add bill
 * @apiVersion 1.0.0
 * @apiName addBill
 * @apiDescription add bill
 * @apiGroup finance
 * @apiParam {varchar} name current cost name
 * @apiParam {varchar} cost current cost
 * @apiSuccessExample {json} Success-Response:
 * {
 *     success: true,
 *     message: "هزینه جاری با موفقیت اضافه شد"
 * }
 */
  router.post('/bill',FinanceController.addBill.bind(FinanceController)); 
 
 
  

 module.exports = router;