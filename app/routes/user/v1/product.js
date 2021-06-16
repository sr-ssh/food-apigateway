const express = require('express');
const router = express.Router();

// controllers 
const { user: userController } = config.path.controllers;

const ProductController = require(`${userController}/v1/ProductController`)


/**
 * @api {post} /api/user/v1/product/ add product 
 * @apiVersion 1.0.0
 * @apiName addProduct
 * @apiDescription add product
 * @apiGroup product
 * @apiParam  {varchar} name product name
 * @apiParam  {varchar} sellingPrice product selling price
 * @apiParam  {varachar} description description of product
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
 router.post('/',ProductController.addProduct.bind(ProductController));




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
  router.get('/',ProductController.getProducts.bind(ProductController));


 module.exports = router;