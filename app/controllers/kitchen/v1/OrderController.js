
const Controller = require(`${config.path.controllers.user}/Controller`);
const TAG = 'v1_Order';

module.exports = new class OrderController extends Controller {

    async index(req, res) {
        return res.json({ success: true, message: "Order v1" });
    }

    async getActiveOrder(req, res) {
        try {

            let filter = { active: true, paid: true }

            let orders = await this.model.Order
                .find(filter, { active : 0, updatedAt: 0, 'products.price': 0, paid: 0, deliveryCost: 0})
                .populate({ path: 'products._id', model: 'Product', select: 'name'})
                .populate('customer', { family: 1, mobile: 1 })
                .populate('status', {status: 1, name: 1, _id: 0})

            let cookOrder = orders.filter(order => 
                order.status.status === config.beforeCookOrder && 
                order.cookId.toString() === req.decodedData.user_id
                )

            if(!cookOrder.length)
                cookOrder = orders.filter(order => order.status.status === config.activeOrdersStatus)
            else 
                return res.json({ success : true, message : 'سفارش با موفقیت ارسال شد', data: cookOrder[0] })
            
            if(!cookOrder.length)
                return res.json({ success : true, message : 'سفارشی برای پخت وجود ندارد', data: {} })

            //get status id
            filter = {active: true, status: config.beforeCookOrder}
            let status = await this.model.OrderStatusBar.findOne(filter, '_id')

            let update = { status: status, cookId: req.decodedData.user_id}
            await this.model.Order.findByIdAndUpdate(cookOrder[0]._id, update)

            return res.json({ success : true, message : 'سفارش با موفقیت ارسال شد', data: cookOrder[0] })
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('getActiveOrder')
                .inputParams(req.params)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }


    async readyOrder(req, res) {
        try {

            req.checkBody('orderId', 'please set order id').notEmpty();
            if (this.showValidationErrors(req, res)) return;

            let filter = { active : true, _id: req.body.orderId }
            let order = await this.model.Order.findOne(filter)

            if(!order)
                return res.json({ success : false, message : 'سفارش موجود نیست'})

            //get status id
            filter = {active: true, name: config.readyOrders}
            let status = await this.model.OrderStatusBar.findOne(filter, '_id')

            order.status = status
            await order.save()

            res.json({ success : true, message : 'وضعیت سفارش با موفقیت ویرایش شد'})
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('readyOrder')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

    async getfinishedOrders(req, res) {
        try {

            let filter = { active: true, cookId: req.decodedData.user_id }

            let orders = await this.model.Order
                .find(filter, { finishDate: 1, customer: 1, address: 1, products: 1 })
                .populate({ path: 'products._id', model: 'Product', select: 'name'})
                .populate('customer', { _id: 0, family: 1})
                .populate('status', {status: 1, name: 1, _id: 0})
                .sort({createdAt:-1})

            orders = orders.filter(order => 
                order.status.status === config.finishedOrder ||
                order.status.status === config.canceledOrder 
                )

            return res.json({ success : true, message : 'سفارشات با موفقیت ارسال شد', data: orders })
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('getfinishedOrders')
                .inputParams(req.params)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }
}


