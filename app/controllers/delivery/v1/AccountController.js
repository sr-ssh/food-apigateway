const Controller = require(`${config.path.controllers.user}/Controller`);
const TAG = "v1_Account";

module.exports = new (class AccountController extends Controller {
  async index(req, res) {
    return res.json({ success: true, message: "Account v1" });
  }

  async getAccount(req, res) {
    try {
      let filter = { active: true, _id: req.decodedData.user_id };
      let delivery = await this.model.User.findOne(filter, "account").lean();

      if (!delivery)
        return res.json({
          success: true,
          message: "کاربر موجود نمی باشد",
          data: { status: false },
        });

      let data = {
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

      let filter = { active: true, _id: req.decodedData.user_id };
      let update = {
          account: {
            cardNumber: req.body.cardNumber,
            sheba: req.body.sheba || "",
            accountNumber: req.body.accountNumber || "",
        },
      };
      // if (req.body.sheba) update.$set['account.sheba'] = req.body.sheba;
      // if (req.body.accountNumber)
      //   update.$set['account.accountNumber'] = req.body.accountNumber;
      let user = await this.model.User.findOne(filter);
      user.account.cardNumber = req.body.cardNumber
      user.markModified('account')
      await user.save()


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
