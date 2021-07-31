const express = require('express');
const router = express.Router();

// controllers 
const { operator: operatorController } = config.path.controllers;

const OrderController = require(`${operatorController}/v1/OrderController`)


 /**
 * @api {post} /api/operator/v1/order/ add order 
 * @apiVersion 1.0.0
 * @apiName addOrder
 * @apiDescription add order: customer birthday and reminder are optional.all params are necessary and in case of no entry , there is a flag for each optional param.if that flag entered it asumed as no entry.birthday flag is "1900-01-01T05:42:13.845Z".reminder flag and duration flag are -1.address flag is " "
 * @apiGroup operator
 * @apiParam {Object[]} products array of product objects
 * @apiParamExample {json} Request-Example:
 *  {
 *      products: [...{
 *          _id: "60b72a70e353f0385c2fe5af",
 *          quantity: 2,
 *          price: "30000",
 *          size: "medium"
 *      }],
 *      customer: {
 *          family: "شکوهی",
 *          mobile: "09307580142",
 *      },
 *      address: "معلم 24",
 *      description: "ساعت 21:00 تحویل داده شود"
 *  }
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "سفارش شما با موفقیت ثبت شد",
 *      data: {
 *        status: true
 *      }
 * }
 */
  router.post('/',OrderController.addOrder.bind(OrderController));



/**
 * @api {get} /api/operator/v1/order/ get orders by family
 * @apiVersion 1.0.0
 * @apiName getOrdersByFamily
 * @apiDescription get orders
 * @apiGroup operator
 * @apiParam {String} family customer family 
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "سفارشات با موفقیت ارسال شد",
 *      data: [...{
 *             id: "60b72a70e353f0385c2fe5af",
 *             products: [...{
 *                 name: "لاته",
 *                 quantity: 2,
 *                 size: 'medium'
 *             }],
 *             customer: {
 *                 _id: "7465148754878",
 *                 family: "مصطفایی",
 *                 mobile: "09152631225",
 *             },
 *            createdAt: "2021-06-01T06:54:01.691Z",
 *            address: "معلم 43",
 *            GPS: { type: "point", coordinates: [-122.5, 37.7]},
 *            status: { name: "active"}
 *          }]
 *      }
 * }
 */
  router.get('/:family',OrderController.getOrdersByFamily.bind(OrderController));



module.exports = router;