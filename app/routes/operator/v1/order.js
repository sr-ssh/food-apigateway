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



module.exports = router;