const express = require('express');
const router = express.Router();

// controllers 
const { kitchen: kitchenController } = config.path.controllers;

const HomeController = require(`${kitchenController}/v1/HomeController`)

router.get('/home',HomeController.index.bind(HomeController));

  
/**
 * @api {post} /api/kitchen/v1/verificationcode requset verification Code 
 * @apiVersion 1.0.0
 * @apiName verificationCode
 * @apiDescription requset verification Code
 * @apiGroup kitchen
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
  * @api {post} /api/kitchen/v1/login login
  * @apiVersion 1.0.0
  * @apiName login
  * @apiDescription login kitchen
  * @apiGroup kitchen
  * @apiParam {Number} mobile user mobile
  * @apiParam {String} scope kitchen scope
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
  * @api {post} /api/kitchen/v1/app/info app info 
  * @apiVersion 1.0.0
  * @apiName info
  * @apiDescription app info . send 'Android' as os if you are on android
  * @apiGroup kitchen
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
  router.post('/app/info',HomeController.appInfo.bind(HomeController));


module.exports = router;