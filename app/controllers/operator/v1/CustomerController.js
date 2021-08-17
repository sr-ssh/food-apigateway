
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

            let filter = {mobile: req.params.mobile};

            let customer = await this.model.Customer.findOne(filter, { active: 1, family:1, mobile:1, locations:1, order: {$slice: -1}}).populate('order', {createdAt: 1, status: 1})
            if(!customer)
                return res.json({ success : true, message : 'مشتری موجود نیست', data: { status: false}})
            await this.model.Order.populate(customer.order, {path: 'status', select: 'name'})

            let orderStatus = {};
            let orderInterval = 0;
            
            if(!customer.active)
                orderStatus.status = 1
            else if(customer.order.length){
                orderInterval = this.getTimeDiff(customer.order[0].createdAt.toISOString(), new Date().toISOString(), config.customerOrderIntervalUnit)
                if(orderInterval < config.customerMaxOrderInterval)
                    orderStatus = {
                        status: 2,
                        descriptionStatus: "کاربر کمتر از 40 دقیقه قبل ثبت سفارش کرده است",
                        orderInterval: orderInterval,
                        orderState: customer.order[0].status.name
                    }
                else orderStatus.status = 0
            }else if(!customer.order.length)
                orderStatus.status = 0

            customer = {
                family: customer.family,
                mobile: customer.mobile,
                locations: customer.locations
            }

            return res.json({ success : true, message : 'اطلاعات مشتری با موفقیت ارسال شد', data: { status: true, customer, orderStatus}})
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('getCustomer')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

}


