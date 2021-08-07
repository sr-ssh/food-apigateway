


const Controller = require(`${config.path.controllers.user}/Controller`);
const TAG = 'v1_Order';

module.exports = new class HomeController extends Controller {

    async index(req, res) {
        return res.json({ success: true, message: "complaint v1" });
    }

    async addComplaint(req, res) {
        try {
            req.checkBody('orderId', 'please set order id').notEmpty();
            req.checkBody('des', 'please set des').notEmpty();
            if (this.showValidationErrors(req, res)) return;

            let filter = { active: true, _id: req.body.orderId }
            let order = await this.model.Order.findOne(filter)

            if (!order)
                return res.json({ success: true, message: 'سفارش موجود نیست', data: { status: false } })

            let customer = order.customer

            params = {
                orderId: req.body.orderId,
                description: req.body.des,
                customer: customer
            }

            await this.model.Complaint.create(params)
            res.json({ success: true, message: 'عملیات با موفقیت انجام شد', data: { status: true } })
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('addComplaint')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

}