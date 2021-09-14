
const Controller = require(`${config.path.controllers.user}/Controller`);
const TAG = 'v1_Settings';

module.exports = new class SettingsController extends Controller {

    async index(req, res) {
        return res.json({ success: true, message: "Settings v1" });
    }

    
    async getOrderSettings(req, res) {
        try {
            let filter = { active : true }
            let settings = await this.model.Settings.findOne(filter, 'order')

            res.json({ success: true, message: "تنظیمات سفارش با موفقیت فرستاده شد", data: settings.order}) 

        } catch (err) {
                let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('getOrderSettings')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

    async editOrderSettings(req, res) {
        try {

            req.checkBody('addOrderSms.status', 'please set the addOrderSms status').notEmpty().isBoolean();
            req.checkBody('addOrderSms.text', 'please set the addOrderSms text').notEmpty().isString();

            req.checkBody('successfullPaymentSms.status', 'please set the successfullPaymentSms status').notEmpty().isBoolean();
            req.checkBody('successfullPaymentSms.text', 'please set the successfullPaymentSms text').notEmpty().isString();

            req.checkBody('inProcessOrderSms.status', 'please set the inProcessOrderSms status').notEmpty().isBoolean();
            req.checkBody('inProcessOrderSms.text', 'please set the inProcessOrderSms text').notEmpty().isString();

            req.checkBody('inCookingOrderSms.status', 'please set the inCookingOrderSms status').notEmpty().isBoolean();
            req.checkBody('inCookingOrderSms.text', 'please set the inCookingOrderSms text').notEmpty().isString();

            req.checkBody('inServiceOrderSms.status', 'please set the inServiceOrderSms status').notEmpty().isBoolean();
            req.checkBody('inServiceOrderSms.text', 'please set the inServiceOrderSms text').notEmpty().isString();

            req.checkBody('finishedOrderSms.status', 'please set the finishedOrderSms status').notEmpty().isBoolean();
            req.checkBody('finishedOrderSms.text', 'please set the finishedOrderSms text').notEmpty().isString();

            req.checkBody('cookTime', 'please set the cookTime').notEmpty().isInt({min: 0});
            req.checkBody('confirmTime', 'please set the confirmTime').notEmpty().isInt({min: 0});
            req.checkBody('isPayNecessary', 'please set the isPayNecessary').notEmpty().isBoolean();

            if (this.showValidationErrors(req, res)) return;



            await this.model.Settings.update(
                {active: true}, 
                {
                    'order.addOrderSms': req.body.addOrderSms,
                    'order.successfullPaymentSms': req.body.successfullPaymentSms,
                    'order.inProcessOrderSms': req.body.inProcessOrderSms,
                    'order.cookTime': req.body.cookTime,
                    'order.inCookingOrderSms': req.body.inCookingOrderSms,
                    'order.inServiceOrderSms': req.body.inServiceOrderSms,
                    'order.finishedOrderSms': req.body.finishedOrderSms,
                    'order.confirmTime': req.body.confirmTime,
                    'order.isPayNecessary': req.body.isPayNecessary,
                },
                { safe: true, multi:true }
            )
            

            return res.json({ success : true, message : 'ویرایش با موفقیت انجام شد'})
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('editOrderSettings')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

}


