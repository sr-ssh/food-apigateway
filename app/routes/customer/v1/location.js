const express = require('express');
const router = express.Router();

// controllers 
const { customer: customerController } = config.path.controllers;

const LocationController = require(`${customerController}/v1/LocationController`)

  
/**
 * @api {get} /api/customer/v1/location get customer locations
 * @apiVersion 1.0.0
 * @apiName getLocations
 * @apiDescription get customer locations
 * @apiGroup customer
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "ادرس های مشتری با موفقیت ارسال شد",
 *      data: [...{
 *          address: "کلاهدوز 4",
 *          GPS: { type: "Point", coordinates: [ 36.345, -130.54]}
 *        }]
 * }
 */
 router.get('/',LocationController.getLocations.bind(LocationController));



 /**
 * @api {post} /api/customer/v1/location check location 
 * @apiVersion 1.0.0
 * @apiName checkLocation
 * @apiDescription check location
 * @apiGroup customer
 * @apiParam {Number} lat gerographical latitude
 * @apiParam {Number} lng gerographical longitude
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "موقعیت جغرافیایی فرستاده شده با موفقیت دریافت شد",
 *      data: {
 *          deliveryCost: 5,
 *          provider: {
 *              status:true,
 *              kitchenArea: 'هنرستان'
 *          }
 *      }
 * }
 */
  router.post('/',LocationController.checkLocation.bind(LocationController));




  /**
 * @api {delete} /api/customer/v1/location delete location 
 * @apiVersion 1.0.0
 * @apiName deleteLocation
 * @apiDescription delete location
 * @apiGroup customer
 * @apiParam {Object} GPS location gps
 * @apiParam {String} address location address
 * @apiParamExample {json} Request-Example:
 * {
 *      address: "درب شمالی راه آهن",
 *      GPS: {
 *          type: "Point",
 *          coordinates: [
 *              59.62104646283381,
 *              36.313584005129016
 *          ]
 *      }
 *  }
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "آدرس شما با موفقیت حذف شد"
 * }
 */
  router.delete('/',LocationController.deleteLocation.bind(LocationController));





module.exports = router;