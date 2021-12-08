const express = require('express');
const router = express.Router();

// controllers 
const { operator: operatorController } = config.path.controllers;

const HomeController = require(`${operatorController}/v1/HomeController`)

router.get('/home', HomeController.index.bind(HomeController));

/**
 * @api {post} /api/delivery/v1/register register
 * @apiVersion 1.0.0
 * @apiName register
 * @apiDescription register operator. for scope send 'operator'
 * @apiGroup operator
 * @apiParam  {varchar} password user password
 * @apiParam  {varchar} family  family 
 * @apiParam  {varchar} mobile mobile
 * @apiParam  {varchar} code verification code 
 * @apiParam  {varchar} scope operator scope
 * @apiSuccessExample {json} Success-Response:
 * {
 *     success:true,
 *     message:"کاربر با موفقیت ثبت شد",
 *     data: {
 *       status: true,
 *       idToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6ImtpdGNoZW4iLCJpYXQiOjE2MjcyOTczMjYsImV4cCI6MTY1MzIxNzMyNiwiYXVkIjoiYXVkaWVuY2UiLCJpc3MiOiJpc3N1ZXIifQ.GauQ4Ls0Hz6aPkpaPyh7eXQGfRK9UAqxkrhW3GDu6I",
 *       accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjBmZTk0MTIwYmU1ZTUzNmM4MWNiNzEzIiwidXNlcl9hY3RpdmUiOnRydWUsImlhdCI6MTYyNzI5NzMyNiwiZXhwIjoxNjQ4ODk3MzI2LCJhdWQiOiJhdWRpZW5jZSIsImlzcyI6Imlzc3VlciJ9.eO6JvCHPcoSFMPQ0wClsh7gsdZmGANs55x6x9hNc7u"
 *     }
 * }
 * @apiErrorExample {json} Error-Response:
 * {
 *     success:true,
 *     message:"کاربری با این مشخصات موجود است",
 *     data:{ status: false }
 * }
 */
router.post('/register', HomeController.register.bind(HomeController));


/**
 * @api {post} /api/operator/v1/login/verificationcode requset login verification Code 
 * @apiVersion 1.0.0
 * @apiName loginVerificationCode
 * @apiDescription requset login verification Code. for scope send 'operator'
 * @apiGroup operator
 * @apiParam {Number} mobile user mobile
 * @apiParam  {varchar} scope operator scope
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success:true,
 *      message: "کد تاییدیه به شماره موبایل داده شده ، با موفقیت فرستاده شد",
 *      data: { status: true }
 * }
 * @apiErrorExample {json} Error-Response:
 * {
 *      success:true,
 *      message:"کاربری با این شماره موبایل در دسترس نمی باشد",
 *      data: { status: false }
 * }
 */
router.post('/login/verificationcode', HomeController.loginVerificationCode.bind(HomeController));


/**
* @api {post} /api/operator/v1/verificationcode requset verification Code 
* @apiVersion 1.0.0
* @apiName verificationCode
* @apiDescription requset verification Code without scope for register
* @apiGroup operator
* @apiParam {Number} mobile user mobile
* @apiSuccessExample {json} Success-Response:
* {
*      success:true,
*      message: "کد تاییدیه به شماره موبایل داده شده ، با موفقیت فرستاده شد"
* }
*/
router.post('/verificationcode', HomeController.verificationCode.bind(HomeController));


/**
* @api {post} /api/operator/v1/login login
* @apiVersion 1.0.0
* @apiName login
* @apiDescription login kitchen. for scope send 'operator'
* @apiGroup operator
* @apiParam {Number} mobile operator mobile
* @apiParam {String} scope operator scope
* @apiParam {Number} code verification code
* @apiSuccessExample {json} Success-Response:
* {
*     success:true,
*     message:"کاربر با موفقیت وارد شد",
*     data:{
*          idToken: idToken, 
*          accessToken: accessToken,
*          status: true
*     }
* }
* @apiErrorExample {json} Error-Response:
* {
*      success:true,
*      message:"کاربر وارد نشد",
*      data:{ status: false }
* }
*/
router.post('/login', HomeController.login.bind(HomeController));



/**
* @api {post} /api/operator/v1/app/info app info 
* @apiVersion 1.0.0
* @apiName info
* @apiDescription app info . send 'Android' as os if you are on android
* @apiGroup operator
* @apiParam  {int} versionCode versionCode
* @apiParam  {varchar} os os
* @apiSuccessExample {json} Success-Response:
* {
*   status: true,
*   message:"اطلاعات نرم افزار فرستاده شد",
*   data:{
*        status: true, 
*        update: true, 
*        isForce: false, 
*        updateUrl: "http://cafebazar.com/happypizza",
*        pushId: 0,
*        pushToken: 0,
*        family: "شکوهی",
*        sipNumber: 0,
*        sipServer: 0,
*        sipPassword: 0
*   }
*}
* @apiErrorExample {json} Error-Response:
*{
*    status: false,
*    message:"کاربر بلاک می باشد",
*    data:{}
*}
*/
router.post('/app/info', HomeController.appInfo.bind(HomeController));

/**
 * @api {put} /api/operator/v1/activate active
 * @apiName activate
 * @apiVersion 1.0.0
 * @apiDescription active or deactive operator
 * @apiGroup operator
 * @apiParam {String} state active:1 , deactive:0
 * @apiSuccessExample {json} Success-Response:
 * { success: true, message: "عملیات با موفقیت انجام شد", data: { status: true } }
 * @apiErrorExample {json} Error-Response:
 * { success: true, message: "سفارش موجود نیست", data: { status: false } }
 */
router.put('/activate', HomeController.activate.bind(HomeController));


/**
 * @api {post} /api/operator/v1/queue/enter enter
 * @apiName enterQueue
 * @apiVersion 1.0.0
 * @apiDescription enter queue 
 * db: api_op_enterqueue
 * @apiGroup operator
 * @apiParam {int} sipNumber
 * @apiSuccessExample {json} Success-Response:
 * {success: true, message: 'عملیات با موفقیت انجام شد.', data: {queues: "100,200"}}
 * @apiErrorExample {json} Error-Response:
 * {"errors":[{"param":"sipNumber","msg":"please enter sipNumber"}]}
 */
router.post('/queue/enter', HomeController.enterQueue.bind(HomeController));

/**
 * @api {delete} /api/operator/v1/queue/exit queue
 * @apiName deleteQueue
 * @apiVersion 1.0.0
 * @apiDescription delete queue 
 * db: api_op_deleteQueue
 * @apiGroup operator
 * @apiParam {int} sipNumber
 * @apiSuccessExample {json} Success-Response:
 * {success: true, message: 'عملیات با موفقیت انجام شد.', data: {queues: "100,200",sipnumber: 545}}
 * @apiErrorExample {json} Error-Response:
 * {"errors":[]}
 */
router.delete('/queue/exit', HomeController.deleteQueue.bind(HomeController));


module.exports = router;