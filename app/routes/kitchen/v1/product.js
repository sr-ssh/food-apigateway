const express = require("express");
const router = express.Router();

// controllers
const { kitchen: kitchenController } = config.path.controllers;

const ProductController = require(`${kitchenController}/v1/ProductController`);

/**
 * @api {get} /api/kitchen/v1/product get products
 * @apiVersion 1.0.0
 * @apiName getProducts
 * @apiDescription get products
 * @apiGroup kitchen
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "موجودی محصولات با موفقیت ارسال شد",
 *      data: [...{
 *             _id: "60b72a70e353f0385c2fe5af",
 *             name: "پپرونی",
 *             supply: 120
 *      }
 * }
 */
router.get("/", ProductController.getProducts.bind(ProductController));

/**
 * @api {put} /api/kitchen/v1/product edit product supply
 * @apiVersion 1.0.0
 * @apiName editSupply
 * @apiDescription edit product supply 
 * @apiGroup kitchen
 * @apiParam {String} productId product id
 * @apiParam {String} supply product supply
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "تعداد محصول با موفقیت ویرایش شد"
 * }
 */
router.put("/", ProductController.editSupply.bind(ProductController));

module.exports = router;
