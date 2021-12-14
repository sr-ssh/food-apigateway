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
 *             supply: 120,
 *             typeName: "پیتزا",
 *             typeId: "610916826f9446153c5e268d",
 *             description: "گوشت گوساله . پنیر . قارچ . فلفل دلمه ای . پیازجه",
 *             updatedAt: "2021-12-14T05:44:38.386Z"
 *      }
 * }
 */
router.get("/", ProductController.getProducts.bind(ProductController));

/**
 * @api {put} /api/kitchen/v1/product edit product
 * @apiVersion 1.0.0
 * @apiName editSupply
 * @apiDescription edit product 
 * @apiGroup kitchen
 * @apiParam {String} productId product id
 * @apiParam {String} supply product supply
 * @apiParam {String} name product name
 * @apiParam {String} description product description
 * @apiParam {String} type product type id
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "محصول با موفقیت ویرایش شد"
 * }
 */
router.put("/", ProductController.editSupply.bind(ProductController));

/**
 * @api {get} /api/kitchen/v1/product/type get product types
 * @apiVersion 1.0.0
 * @apiName getProductTypes
 * @apiDescription get product types
 * @apiGroup kitchen
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "انواع محصولات با موفقیت ارسال شد",
 *      data: [...{
 *          _id: "610916826f9446153c5e268d", 
 *          name: "پیتزا"
 *          }
 *      }
 * }
 */
 router.get("/type", ProductController.getProductTypes.bind(ProductController));

module.exports = router;
