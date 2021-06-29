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
 *          _id: '60d9ce1bef1e876eb29265cf',
 *          family: 'علی رضایی',
 *          mobile: '093012342',
 *          permission: [...{
 *              no: 1,
 *              status: true
 *          }]
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



   /**
 * @api {delete} /api/user/v1/employee remove employee
 * @apiVersion 1.0.0
 * @apiName removeEmployee
 * @apiDescription remove employee by id
 * @apiGroup employee
 * @apiParam {varchar} _id employee id
 * @apiSuccessExample {json} Success-Response:
 * {
 *     success: true,
 *     message: "کارمند خواسته شده با موفقیت حذف شد"
 * }
 * @apiErrorExample {json} Error-Response:
 * {
 *     success: false,
 *     message: "کارمند خواسته شده حذف نشد"
 * }
 */
  router.delete('/',EmployeeController.removeEmployee.bind(EmployeeController)); 


/**
 * @api {get} /api/user/v1/employee/permission get employees permissions
 * @apiVersion 1.0.0
 * @apiName getEmployeesPermission
 * @apiDescription get employees permission
 * @apiGroup employee
 * @apiSuccessExample {json} Success-Response:
 * {
 *     success: true,
 *     message: "با موفقیت انجام شد",
 *     data: 
 *      {
 *         "_id": "60d9ce1bef1e876eb29265cf",
 *         "permission": [...
 *         {
 *           "no": 1,
 *           "status": true
 *         },
 *         {
 *           "no": 2,
 *           "status": false
 *        }]
 * }
 */
  router.get('/permission',EmployeeController.getPermission.bind(EmployeeController)); 

  

 module.exports = router;