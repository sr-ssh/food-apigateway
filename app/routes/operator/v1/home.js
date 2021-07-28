const express = require('express');
const router = express.Router();

// controllers 
const { operator: operatorController } = config.path.controllers;

const HomeController = require(`${operatorController}/v1/HomeController`)

router.get('/home',HomeController.index.bind(HomeController));

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
  router.post('/register',HomeController.register.bind(HomeController));
   
   
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
 router.post('/login/verificationcode',HomeController.loginVerificationCode.bind(HomeController));


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
  router.post('/verificationcode',HomeController.verificationCode.bind(HomeController));


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
  router.post('/login',HomeController.login.bind(HomeController));



module.exports = router;