
const Controller = require(`${config.path.controllers.user}/Controller`);
const TAG = 'v1_Discount';


module.exports = new class DiscountController extends Controller {

    async index(req, res) {
        return res.json({ success: true, message: "Discount v1" });
    }

    async addDiscount(req, res) {
        try {

            req.checkBody('name', 'please enter name').notEmpty().isString();
            req.checkBody('type', 'please enter type').notEmpty().isInt({min:0, max: 1});
            if(req.body.type === 0)
                req.checkBody('customer', 'please enter customer').notEmpty().isNumeric();
            req.checkBody('percentage', 'please enter percentage').notEmpty().isInt({min:0, max:100});
            req.checkBody('sms', 'please enter sms').notEmpty().isBoolean();
            if (this.showValidationErrors(req, res)) return;

            let params = {
                name: req.body.name,
                type: req.body.type,
                percentage: req.body.percentage,
                sms: req.body.sms,
                provider: req.decodedData.user_employer,
            }    

            if(req.body.type === 0){
                let filter = { mobile: req.body.customer, active: true, user: req.decodedData.user_employer }
                let customer = await this.model.Customer.findOne(filter, { family: 1 })
                if(!customer)
                    return res.json({ success: false, message: 'مشتری وارد شده موجود نمی باشد' })
                params.customer = customer._id
            }
            
            await this.model.Discount.create(params)

            return res.json({ success: true, message: 'تخفیف با موفقیت ثبت شد' })
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('addDiscount')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

    async getDiscounts(req, res) {
        try {

            let filter = { active: true, provider: req.decodedData.user_employer }
            let discounts = await this.model.Discount.find(filter)

            let params = [];
            for (let index = 0; index < discounts.length; index++) {
                let param = {
                    active: discounts[index].active,
                    customer: discounts[index].customer,
                    name: discounts[index].name,
                    type: discounts[index].type,
                    percentage: discounts[index].percentage,
                    sms: discounts[index].sms,
                    provider: discounts[index].provider,
                    createdAt: discounts[index].createdAt,
                    updatedAt: discounts[index].updatedAt,
                }     
                params.push(param)           
            }
            
            let customers = []
            for (let index = 0; index < discounts.length; index++) {
                customers.push(discounts[index].customer)
            }

            filter = { _id: { $in: customers } }
            customers = await this.model.Customer.find(filter, { _id: 1, family: 1 })

            let customerInfo;
            for (let index = 0; index < discounts.length; index++) {
                customerInfo = customers.find(user => user._id.toString() == discounts[index].customer)
                params[index].customer = customerInfo;
            }

            return res.json({ success: true, message: 'لیست تخفیف ها با موفقیت ارسال شد', data: params })
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('getDiscounts')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

}


