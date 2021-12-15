const express = require('express');
const router = express.Router();

// controllers 
const { user: userController } = config.path.controllers;

const StationController = require(`${userController}/v1/StationController`)


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
router.get('/', StationController.getStations.bind(StationController));

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
router.post('/', StationController.addStations.bind(StationController));

/**
 * @api {put} /api/user/v1/stations editStations
 * @apiVersion 1.0.0
 * @apiName editing stations
 * @apiDescription editing stations
 * @apiGroup user
 * @apiParam  {varchar} _id
 * @apiParam  {String} description
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
router.put('/', StationController.editStations.bind(StationController));



module.exports = router;