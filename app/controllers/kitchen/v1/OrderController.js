
const Controller = require(`${config.path.controllers.user}/Controller`);
const TAG = 'v1_Order';

module.exports = new class OrderController extends Controller {

    async index(req, res) {
        return res.json({ success: true, message: "Order v1" });
    }

    async getActiveOrders(req, res) {
        try {

            let filter = { active: true }

            let orders = await this.model.Order.find(filter, { active : 0, updatedAt: 0, 'products.price': 0, paid: 0, deliveryCost: 0 }).populate('customer', { family: 1, mobile: 1 }).populate('status', {name: 1, _id: 0}) 

            orders = orders.filter(order => order.status.name === config.activeOrders)

            return res.json({ success : true, message : 'سفارشات با موفقیت ارسال شد', data: orders })
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('getOrders')
                .inputParams(req.params)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }


    async editOrderStatus(req, res) {
        try {

            req.checkBody('orderId', 'please set order id').notEmpty();
            req.checkBody('status', 'please set order status').notEmpty().isInt({min: 1, max: 1});
            if (this.showValidationErrors(req, res)) return;

            let filter = { active : true, _id: req.body.orderId }
            let order = await this.model.Order.findOne(filter)

            if(!order)
                return res.json({ success : false, message : 'سفارش موجود نیست'})

            order.status = req.body.status
            await order.save()

            res.json({ success : true, message : 'وضعیت سفارش با موفقیت ویرایش شد'})
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('editOrderStatus')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }
}


