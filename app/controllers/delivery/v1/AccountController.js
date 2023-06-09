const Controller = require(`${config.path.controllers.user}/Controller`);
const TAG = "v1_Account";
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

module.exports = new (class AccountController extends Controller {
  async index(req, res) {
    return res.json({ success: true, message: "Account v1" });
  }

  async getAccount(req, res) {
    try {
      // charge
      let charge = await this.model.DeliveryFinance.aggregate([
        { $match: { deliveryId: ObjectId(req.decodedData.user_id) } },
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
          $project: {
            charge: { $subtract: ["$debit", "$credit"] },
          },
        },
      ]);

      let data = {};
      if (charge.length) data.charge = charge[0].charge;

      let filter = { active: true, _id: req.decodedData.user_id };
      let delivery = await this.model.User.findOne(filter, "account").lean();

      if (!delivery)
        return res.json({
          success: true,
          message: "کاربر موجود نمی باشد",
          data: { status: false },
        });

      data = {
        ...data,
        sheba: (delivery.account && delivery.account.sheba) || "",
        accountNumber:
          (delivery.account && delivery.account.accountNumber) || "",
        cardNumber: (delivery.account && delivery.account.cardNumber) || "",
      };

      return res.json({
        success: true,
        message: "اطلاعات حساب کاربری با موفقیت ارسال شد",
        data: { status: true, data },
      });
    } catch (err) {
      let handelError = new this.transforms.ErrorTransform(err)
        .parent(this.controllerTag)
        .class(TAG)
        .method("getAccount")
        .inputParams(req.params)
        .call();

      if (!res.headersSent) return res.status(500).json(handelError);
    }
  }

  async registerAccount(req, res) {
    try {
      req
        .checkBody("sheba", "please enter sheba")
        .optional({ nullable: true, checkFalsy: true })
        .isString();
      req
        .checkBody("accountNumber", "please enter account number")
        .optional({ nullable: true, checkFalsy: true })
        .isString();
      req
        .checkBody("cardNumber", "please enter card number")
        .notEmpty()
        .isString();
      if (this.showValidationErrors(req, res)) return;

      let filter = { active: true, _id: ObjectId(req.decodedData.user_id) };
      let update = {
        $set: {
          account: {
            cardNumber: req.body.cardNumber,
            sheba: req.body.sheba || "",
            accountNumber: req.body.accountNumber || ""
          },
        },
      };
      
      await this.model.User.update(filter, update, { multi: true});

      return res.json({
        success: true,
        message: "اطلاعات حساب با موفقیت ثبت شد",
        data: { status: true },
      });
    } catch (err) {
      let handelError = new this.transforms.ErrorTransform(err)
        .parent(this.controllerTag)
        .class(TAG)
        .method("registerAccount")
        .inputParams(req.params)
        .call();

      if (!res.headersSent) return res.status(500).json(handelError);
    }
  }
})();
