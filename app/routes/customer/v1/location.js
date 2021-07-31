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
 * @apiParam {Number} long gerographical longitude
 * @apiParam {String} address location address
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "موقعیت جغرافیایی فرستاده شده با موفقیت دریافت شد",
 *      data: {
 *          deliveryCost: 5,
            provider: {
                status:true,
                kitchenArea: 'هنرستان'
            }
 *      }
 * }
 */
  router.post('/',LocationController.checkLocation.bind(LocationController));





module.exports = router;