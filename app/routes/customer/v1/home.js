const express = require('express');
const router = express.Router();

// controllers 
const { customer: customerController } = config.path.controllers;

const HomeController = require(`${customerController}/v1/HomeController`)

router.get('/home',HomeController.index.bind(HomeController));

  
/**
 * @api {post} /api/customer/v1/verificationcode requset verification Code 
 * @apiVersion 1.0.0
 * @apiName verificationCode
 * @apiDescription requset verification Code
 * @apiGroup customer
 * @apiParam  {Number} mobile user mobile
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success:true,
 *      message: "کد تاییدیه به شماره موبایل داده شده ، با موفقیت فرستاده شد"
 * }
 * @apiErrorExample {json} Error-Response:
 * {
 *      success:false,
 *      message:"کاربری با این شماره موبایل در دسترس نمی باشد"
 * }
 */
 router.post('/verificationcode',HomeController.verificationCode.bind(HomeController));

  /**
  * @api {post} /api/customer/v1/login login
  * @apiVersion 1.0.0
  * @apiName login
  * @apiDescription login customer
  * @apiGroup customer
  * @apiParam {String} family customer family
  * @apiParam {Number} mobile customer mobile
  * @apiParam {Number} code verification code
  * @apiSuccessExample {json} Success-Response:
  * {
  *     success:true,
  *     message:"مشتری با موفقیت وارد شد",
  *     data:{
  *          idToken: idToken, 
  *          accessToken: accessToken
  *     }
  * }
  * @apiErrorExample {json} Error-Response:
  * {
  *      success:false,
  *      message:"مشتری وارد نشد",
  *      data:{}
  * }
  */
   router.post('/login',HomeController.login.bind(HomeController));


    /**
  * @api {post} /api/customer/v1/app/info app info 
  * @apiVersion 1.0.0
  * @apiName info
  * @apiDescription app info 
  * @apiGroup customer
  * @apiParam  {int} versionCode versionCode
  * @apiParam  {varchar} os os
  * @apiSuccessExample {json} Success-Response:
  * {
  *   status: true,
  *   message:"اطلاعات نرم افزار فرستاده شد",
  *   data:{
  *       update:false,
  *       updateUrl:"http://cafebazar.com/ir.team-x.ir/mohsenapp,
  *       force:false
  *  }
  *}
  * @apiErrorExample {json} Error-Response:
  *{
  *    status: false,
  *    message:"کاربر بلاک می باشد",
  *    data:{}
  *}
  */
  router.post('/app/info',HomeController.appInfo.bind(HomeController));


module.exports = router;