const express = require('express');
const router = express.Router();

// controllers 
const { operator: operatorController } = config.path.controllers;

const ComplaintController = require(`${operatorController}/v1/ComplaintController`)


/**
 * @api {post} /api/operator/v1/complaint
 * @apiName addComplaint
 * @apiVersion 1.0.0
 * @apiDescription insert complaint for an order
 * @apiGroup operator
 * @apiParam {String} orderId order id
 * @apiParam {string} des description
 * @apiSuccessExample {json} Success-Response:
 * { success: true, message: "عملیات با موفقیت انجام شد", data: { status: true } }
 * @apiErrorExample {json} Error-Response:
 * { success: true, message: "سفارش موجود نیست", data: { status: false } }
 */
 router.post('/', ComplaintController.addComplaint.bind(ComplaintController));



module.exports = router;