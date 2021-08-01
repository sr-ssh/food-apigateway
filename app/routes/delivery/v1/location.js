const express = require('express');
const router = express.Router();

// controllers 
const { delivery: deliveryController } = config.path.controllers;

const LocationController = require(`${deliveryController}/v1/LocationController`)


 /**
 * @api {post} /api/delivery/v1/location add location 
 * @apiVersion 1.0.0
 * @apiName addLocation
 * @apiDescription add location
 * @apiGroup delivery
 * @apiParam {Number} lat delivery latitude
 * @apiParam {Number} lng delivery longitude
 * @apiParam {Number} speed delivery speed
 * @apiParam {Number} bearing delivdery bearing
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "موقعیت جغرافیایی فرستاده شده با موفقیت دریافت شد",
 *      data: { status: true }
 * }
 */
  router.post('/',LocationController.addLocation.bind(LocationController));



module.exports = router;