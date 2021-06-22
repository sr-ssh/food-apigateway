const express = require('express');
const router = express.Router();

// controllers 
const { user: userController } = config.path.controllers;

const DiscountController = require(`${userController}/v1/DiscountController`)


/**
 * @api {post} /api/user/v1/product/ add discount 
 * @apiVersion 1.0.0
 * @apiName addProduct
 * @apiDescription add product.all params are necessary and in case of no entry , there is a flag in parantheses for each optional param.if that flag entered it asumed as no entry
 * @apiGroup product
 * @apiParam  {varchar} name product name
 * @apiParam  {varchar} sellingPrice product selling price
 * @apiParam  {varachar} description description of product (" ")
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "محصول شما با موفقیت ثبت شد"
 * }
 * @apiErrorExample {json} Error-Response:
 * { 
 *      success : false, 
 *      message : "محصول وارد شده، موجود است"
 * }
 */
 router.post('/',DiscountController.addDiscount.bind(DiscountController));




 /**
 * @api {get} /api/user/v1/product/ get products 
 * @apiVersion 1.0.0
 * @apiName getProducts
 * @apiDescription get products 
 * @apiGroup product
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "محصولات با موفقیت ارسال شد",
 *      data: [...{
 *          active: true,
 *          name: "روغن" ,
 *          sellingPrice: "100000",
 *          description: "خریداری شده از شرکت روغن سازان مشهد"
 *          createdAt: "2021-06-01T06:54:01.691Z"
 *      }]
 * }
 */
  router.get('/',DiscountController.getDiscounts.bind(DiscountController));




 module.exports = router;