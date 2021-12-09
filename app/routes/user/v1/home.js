const express = require('express');
const router = express.Router();

// controllers 
const { user: userController } = config.path.controllers;

const HomeController = require(`${userController}/v1/HomeController`)


/**
 * @api {post} /api/user/v1/ register
 * @apiVersion 1.0.0
 * @apiName register
 * @apiDescription register user.all params are necessary and in case of no entry , there is a flag in parantheses for each optional param.if that flag entered it asumed as no entry. position 1 means employer and position 2 means employee.
 * @apiGroup user
 * @apiParam  {varchar} password user password
 * @apiParam  {varchar} family  family 
 * @apiParam  {varchar} email email ("a@a.com")
 * @apiParam  {varchar} mobile mobile
 * @apiParam  {varchar} code verification code 
 * @apiParam  {varchar} position user position: employee(2) or employer(1)
 * @apiParam  {varchar} companyName company name: required for employer only
 * @apiParam  {varchar} companyAddress company address: required for employer only
 * @apiParam  {varchar} employerMobile employer mobile: required for employee only
 * @apiSuccessExample {json} Success-Response:
 * {
 *     success:true,
 *     message:"کاربر با موفقیت ثبت شد"
 * }
 * @apiErrorExample {json} Error-Response:
 * {
 *     success:false,
 *     message:"کاربری با این مشخصات موجود است"
 * }
 */
router.post('/', HomeController.register.bind(HomeController));




/**
 * @api {post} /api/user/v1/app/info app info 
 * @apiVersion 1.0.0
 * @apiName info
 * @apiDescription app info 
 * @apiGroup user
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
router.post('/app/info', HomeController.appInfo.bind(HomeController));




/**
 * @api {post} /api/user/v1/login login
 * @apiVersion 1.0.0
 * @apiName login
 * @apiDescription login user
 * @apiGroup user
 * @apiParam  {varchar} mobileOrEmail user mobile or email
 * @apiParam  {varchar} password user password
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
router.post('/login', HomeController.login.bind(HomeController));




/**
 * @api {post} /api/user/v1/verificationcode requset verification Code 
 * @apiVersion 1.0.0
 * @apiName verificationCode
 * @apiDescription requset verification Code
 * @apiGroup user
 * @apiParam  {varchar} mobile user mobile
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
router.post('/verificationcode', HomeController.verificationCode.bind(HomeController));


/**
 * @api {get} /api/user/v1/stations getStations
 * @apiVersion 1.0.0
 * @apiName get stations
 * @apiDescription getting stations
 * @apiGroup user
 * @apiSuccessExample {json} Success-Response:
 * {success:true,message:"عملیات با موفقیت انجام شد",data:{}}
 * @apiErrorExample {json} Error-Response:
 * {
 * }
 */
router.get('/stations', HomeController.getStations.bind(HomeController));

/**
 * @api {post} /api/user/v1/stations addStations
 * @apiVersion 1.0.0
 * @apiName adding stations
 * @apiDescription adding stations
 * @apiGroup user
 * @apiParam  {String} description
 * @apiParam  {boolean} active
 * @apiParam  {Number} latitude
 * @apiParam  {Number} longitudes
 * @apiParam  {Number} code
 * @apiParam  {Number} dimeter
 * @apiSuccessExample {json} Success-Response:
 * {success:true,message:"عملیات با موفقیت انجام شد",data:{}}
 * @apiErrorExample {json} Error-Response:
 * {
 * }
 */
router.post('/stations', HomeController.addStations.bind(HomeController));

/**
 * @api {put} /api/user/v1/stations editStations
 * @apiVersion 1.0.0
 * @apiName editing stations
 * @apiDescription editing stations
 * @apiGroup user
 * @apiParam  {varchar} _id
 * @apiParam  {String} description
 * @apiParam  {boolean} active
 * @apiParam  {Number} latitude
 * @apiParam  {Number} longitudes
 * @apiParam  {Number} code
 * @apiParam  {Number} dimeter
 * @apiSuccessExample {json} Success-Response:
 * {success:true,message:"عملیات با موفقیت انجام شد",data:{}}
 * @apiErrorExample {json} Error-Response:
 * {
 * }
 */
router.put('/stations', HomeController.editStations.bind(HomeController));



module.exports = router;