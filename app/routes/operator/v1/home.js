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
 * @apiDescription register delivery man. for scope send 'deliveryMan'
 * @apiGroup delivery
 * @apiParam  {varchar} password user password
 * @apiParam  {varchar} family  family 
 * @apiParam  {varchar} mobile mobile
 * @apiParam  {varchar} code verification code 
 * @apiParam  {varchar} scope delivery scope
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
   
   

module.exports = router;