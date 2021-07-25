const express = require('express');
const router = express.Router();

// controllers 
const { customer: customerController } = config.path.controllers;

const OrderController = require(`${customerController}/v1/OrderController`)

  
/**
 * @api {post} /api/customer/v1/order/product get order products
 * @apiVersion 1.0.0
 * @apiName getOrderProducts
 * @apiDescription get order products
 * @apiGroup customer
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success:true,
 *      message: "محصولات سفارش با موفقیت ارسال شد",
 *      data: {
 *        appetizer: [...{
 *          name: "نان سیر",
 *          price: "25",
 *          description: "سیر . خمیر تازه . اویشن"
 *        }],
 *        pizza: [...{
 *          name: "رست بیف",
 *          price: "75",
 *          description: "گوشت گوساله . پنیر . قارچ . فلفل دلمه ای . پیازجه"
 *        }],
 *        drinks: [...{
 *          name: "کوکا",
 *          price: "5",
 *          description: ""
 *        }],
 *        salad: [...{
 *          name: "سالاد فصل",
 *          price: "3",
 *          description: ""
 *        }],
 *        sauce: [...{
 *          name: "سس کچاپ",
 *          price: "1",
 *          description: ""
 *        }]
 *      }
 * }
 */
 router.get('/product',OrderController.getOrderProducts.bind(OrderController));



module.exports = router;