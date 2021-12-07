const express = require('express');
const router = express.Router();

// controllers 
const { user: userController } = config.path.controllers;

const DiscountController = require(`${userController}/v1/DiscountController`)


/**
 * @api {post} /api/user/v1/discount/ add discount 
 * @apiVersion 1.0.0
 * @apiName addDiscount
 * @apiDescription add discount.
 * @apiGroup user
 * @apiParam  {varchar} name product name
 * @apiParam  {Number} customer customer mobile
 * @apiParam  {Number} percentage discount percent (min=0, max=100)
 * @apiParam  {varchar} type discount type ("تولد" or "فرد")
 * @apiParam  {Boolean} sms send sms boolean
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "تخفیف با موفقیت ثبت شد"
 * }
 */
 router.post('/',DiscountController.addDiscount.bind(DiscountController));



 /**
 * @api {get} /api/user/v1/discount/ get discounts 
 * @apiVersion 1.0.0
 * @apiName getDeliveryCharges
 * @apiDescription get discounts.There is only 2 types: "تولد" and "فرد" ,if the type be "تولد" then we don't have customer field otherwise we have customer.
 * @apiGroup user
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "لیست تخفیف ها با موفقیت ارسال شد",
 *      data: [...{
 *          active: true,
 *          name: "ولنتاین" ,
 *          type: "فرد",
 *          percentage: 20,
 *          sms: true,
 *          customer: "60b72a70e353f0385c2fe5af"
 *      }]
 * }
 */
  router.get('/',DiscountController.getDiscounts.bind(DiscountController));




 module.exports = router;