const express = require('express');
const router = express.Router();

// controllers 
const { delivery: deliveryController } = config.path.controllers;

const HomeController = require(`${deliveryController}/v1/HomeController`)

router.get('/home',HomeController.index.bind(HomeController));

  
/**
 * @api {post} /api/delivery/v1/verificationcode requset verification Code 
 * @apiVersion 1.0.0
 * @apiName verificationCode
 * @apiDescription requset verification Code
 * @apiGroup delivery
 * @apiParam {Number} mobile user mobile
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
  * @api {post} /api/delivery/v1/login login
  * @apiVersion 1.0.0
  * @apiName login
  * @apiDescription login kitchen
  * @apiGroup delivery
  * @apiParam {Sting} family delivery family
  * @apiParam {Number} mobile delivery mobile
  * @apiParam {Number} code verification code
  * @apiSuccessExample {json} Success-Response:
  * {
  *     success:true,
  *     message:"کاربر با موفقیت وارد شد",
  *     data:{
  *          idToken: idToken, 
  *          accessToken: accessToken
  *     }
  * }
  * @apiErrorExample {json} Error-Response:
  * {
  *      success:false,
  *      message:"کاربر وارد نشد",
  *      data:{}
  * }
  */
   router.post('/login',HomeController.login.bind(HomeController));


    /**
  * @api {post} /api/delivery/v1/app/info app info 
  * @apiVersion 1.0.0
  * @apiName info
  * @apiDescription app info 
  * @apiGroup delivery
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