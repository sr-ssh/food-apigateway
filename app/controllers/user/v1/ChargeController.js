const Controller = require(`${config.path.controllers.user}/Controller`);
const TAG = "v1_Charge";
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

module.exports = new (class ChargeController extends Controller {
  async index(req, res) {
    return res.json({ success: true, message: "Charge v1" });
  }

  async getCharges(req, res) {
    try {
      let data = await this.model.DeliveryFinance.aggregate([
        // { "$match" : { "deliveryId" : ObjectId(req.decodedData.user_id) }},
        {
          $group: {
            _id: "$deliveryId",
            debit: {
              $sum: {
                $cond: [{ $eq: ["$type", "debit"] }, "$cost", 0],
              },
            },
            credit: {
              $sum: {
                $cond: [{ $eq: ["$type", "credit"] }, "$cost", 0],
              },
            },
          },
        },


        {

          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "_id",
            as: "delivery",
          },
        },
        { $unwind: '$delivery' },
        {
          $project: {
            charge: { $subtract: ["$debit", "$credit"] },
            mobile: "$delivery.mobile",
            family: "$delivery.family",
            sheba: {
              $cond: [
                { $gt: ["$delivery.account.sheba", null] },
                "$delivery.account.sheba",
                "",
              ],
            },
            cardNumber: {
              $cond: [
                { $gt: ["$delivery.account.cardNumber", null] },
                "$delivery.account.cardNumber",
                "",
              ],
            },
            accountNumber: {
              $cond: [
                { $gt: ["$delivery.account.accountNumber", null] },
                "$delivery.account.accountNumber",
                "",
              ],
            },
          },
        },
      ])

      data = data.filter(i => i.charge > 0)

      return res.json({
        success: true,
        message: "شارژ کاربر با موفقیت ارسال شد",
        data,
      });
    } catch (err) {
      let handelError = new this.transforms.ErrorTransform(err)
        .parent(this.controllerTag)
        .class(TAG)
        .method("getCharges")
        .inputParams(req.params)
        .call();

      if (!res.headersSent) return res.status(500).json(handelError);
    }
  }

  async addCharges(req, res) {
    try {

      const params = {
        deliveryId: req.body._id,
        type: config.credit,
        cost: req.body.charge

      }
      await this.model.DeliveryFinance.create(params)


      return res.json({
        success: true,
        message: "حساب کاربر با موفقیت تسویه شد",

      });
    } catch (err) {
      let handelError = new this.transforms.ErrorTransform(err)
        .parent(this.controllerTag)
        .class(TAG)
        .method("addCharges")
        .inputParams(req.params)
        .call();

      if (!res.headersSent) return res.status(500).json(handelError);
    }
  }
})();
