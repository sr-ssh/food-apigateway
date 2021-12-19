const express = require('express');
const router = express.Router();

// controllers 
const { user: userController } = config.path.controllers;

const StationController = require(`${userController}/v1/StationController`)


/**
 * @api {get} /api/user/v1/station getStations
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
router.get('/', StationController.getStations.bind(StationController));

/**
 * @api {post} /api/user/v1/station addStations
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
router.post('/', StationController.addStations.bind(StationController));

/**
 * @api {put} /api/user/v1/station editStations
 * @apiVersion 1.0.0
 * @apiName editing stations
 * @apiDescription editing station
 * @apiGroup user
 * @apiParam  {String} description
 * @apiParam  {Number} latitude
 * @apiParam  {Number} longitudes
 * @apiParam  {Number} code
 * @apiParam  {Number} dimeter
 * @apiSuccessExample {json} Success-Response:
 * {    
 *      success:true,
 *      message:"عملیات با موفقیت انجام شد",
 *      data:{}
 * }
 */
router.put('/', StationController.editStations.bind(StationController));

/**
 * @api {get} /api/user/v1/station get station
 * @apiVersion 1.0.0
 * @apiName get station
 * @apiDescription get station info by id
 * @apiGroup user
 * @apiParam {Number} code station code
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success:true,
 *      message:"عملیات با موفقیت انجام شد",
 *      data: {
 *          _id: '61a5e6c2ac04d597aad58601', 
 *          code: 32, 
 *          description: 'امامت - معلم - استقلال', 
 *          dimeter: 2000, 
 *          location: [59.544461, 36.334363]
 *      }
 * }
 */
 router.get('/:code', StationController.getStation.bind(StationController));



module.exports = router;