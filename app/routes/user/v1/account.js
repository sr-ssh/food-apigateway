const express = require('express');
const router = express.Router();

// controllers 
const { user: userController } = config.path.controllers;

const AccountController = require(`${userController}/v1/AccountController`)

/**
 * @api {get} /api/user/v1/account get user account
 * @apiVersion 1.0.0
 * @apiName getUserAccount
 * @apiDescription get user account. قسمت کارفرما بسته به کارمند یا کارفرما بودن کاربر ممکن است خالی باشد
 * @apiGroup account
 * @apiSuccessExample {json} Success-Response:
 * {
 *     success:true,
 *     message:"اطلاعات کاربر با موفقیت ارسال شد",
 *     data: {
 *          active: true,
 *          _id: "60d72865519b311c905f9566",
 *          family: "شکوهی",
 *          password: "reihaneh@123",
 *          email: "r.shokouhi@gmail.com",
 *          mobile: "09307580142",
 *          employer: {
 *              _id: "60d72865519b311c905f9566",
 *              family: "مصطفایی",
 *              company: "teamx"
 *          }
 * }
 */
 router.get('/',AccountController.getUserAccount.bind(AccountController)); 



 module.exports = router;