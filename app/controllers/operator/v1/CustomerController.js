
const Controller = require(`${config.path.controllers.user}/Controller`);
const TAG = 'v1_Customer';


module.exports = new class CustomerController extends Controller {

    async index(req, res) {
        return res.json({ success: true, message: "Customer v1" });
    }

    async getCustomer(req, res) {
        try {

            req.checkParams('mobile', 'please enter customer mobile').notEmpty().isNumeric();
            if (this.showValidationErrors(req, res)) return;

            let filter = { active: true, mobile: req.params.mobile};

            let customer = await this.model.Customer.findOne(filter, { family:1, mobile:1, locations:1, _id:0 });
            if(!customer)
                return res.json({ success : false, message : 'مشتری موجود نیست', data: { status: false}})

            return res.json({ success : true, message : 'اطلاعات مشتری با موفقیت ارسال شد', data: { status: true, customer}})
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('getCustomers')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

}


