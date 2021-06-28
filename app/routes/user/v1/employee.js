const express = require('express');
const router = express.Router();

// controllers 
const { user: userController } = config.path.controllers;

const EmployeeController = require(`${userController}/v1/EmployeeController`)



 /**
 * @api {post} /api/user/v1/employee add employee
 * @apiVersion 1.0.0
 * @apiName addEmployee
 * @apiDescription add employee
 * @apiGroup employee
 * @apiParam {varchar} usernameOrMobile employee username or mobile
 * @apiSuccessExample {json} Success-Response:
 * {
 *     success: true,
 *     message: "کاربر با موفقیت اضافه شد"
 * }
 * @apiErrorExample {json} Error-Response:
 * {
 *     success: false,
 *     message: "کاربر موجود نمی باشد"
 * }
 */
  router.post('/',EmployeeController.addEmployee.bind(EmployeeController)); 




  /**
 * @api {get} /api/user/v1/employee get employees
 * @apiVersion 1.0.0
 * @apiName getEmployees
 * @apiDescription get employees
 * @apiGroup employee
 * @apiSuccessExample {json} Success-Response:
 * {
 *     success: true,
 *     message: "کارمندان با موفقیت فرستاده شدند"
 * }
 */
   router.get('/',EmployeeController.getEmployees.bind(EmployeeController)); 



  

 module.exports = router;