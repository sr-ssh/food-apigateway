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
 *     message: "کارمندان با موفقیت فرستاده شدند"و
 *     data: [...{
 *        _id: 
 *      }]
 * }
 */
  router.get('/',EmployeeController.getEmployees.bind(EmployeeController)); 



  /**
 * @api {put} /api/user/v1/employee change employee permission
 * @apiVersion 1.0.0
 * @apiName changeEmployeePermission
 * @apiDescription change employee permission
 * @apiGroup employee
 * @apiParam {varchar} _id employee id
 * @apiParam {object[]} permissions array of employee new permissions {no: 1, status: true}
 * @apiSuccessExample {json} Success-Response:
 * {
 *     success: true,
 *     message: "دسترسی های کارمند خواسته شده با موفقیت تغییر پیدا کرد"
 * }
 * @apiErrorExample {json} Error-Response:
 * {
 *     success: false,
 *     message: "دسترسی های کارمند خواسته شده با موفقیت تغییر پیدا نکرد"
 * }
 */
  router.put('/',EmployeeController.changeEmployeePermission.bind(EmployeeController)); 



  

 module.exports = router;