
const Controller = require(`${config.path.controllers.user}/Controller`);
const TAG = 'v1_Order';

module.exports = new class OrderController extends Controller {

    async index(req, res) {
        return res.json({ success: true, message: "Order v1" });
    }

    
    async getPendingOrders(req, res) {
        try {

            let filter = { active: true }

            let orders = await this.model.Order.find(filter, { createdAt: 1 }).populate('status', {status: 1, name: 1, _id: 0}).sort({createdAt:-1})

            filter = { active: true }
            let cooktime = await this.model.Settings.findOne(filter, 'order.cookTime')

            orders = orders.filter(order => 
                order.status.status === config.inCookingOrder && 
                (this.getTimeDiff(order.createdAt.toISOString(), new Date().toISOString(), config.cookTimeUnit) > cooktime.order.cookTime))

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

    async acceptOrder(req, res) {
        try {

            req.checkBody('orderId', 'please set order id').notEmpty();
            if (this.showValidationErrors(req, res)) return;

            let filter = { active: true, deliveryId: req.decodedData.user_id }
            let acceptedOrders = await this.model.Order.find(filter).populate('status', {_id: 0, status: 1, name: 1})

            acceptedOrders = acceptedOrders.map(order => 
                order.status.status !== config.finishedOrder || 
                order.status.status !== config.canceledOrder
                )

            //get accepted count from settings
            let settings = await this.model.Settings.findOne({active: true}, 'delivery.acceptCount')

            if(acceptedOrders.length >= settings.delivery.acceptCount)
                return res.json({ success : true, message : 'تعداد سفارش های شما به حد نصاب رسیده است', data: { status: false }})


            filter = { active : true, _id: req.body.orderId }
            let order = await this.model.Order.findOne(filter)

            if(!order)
                return res.json({ success : true, message : 'سفارش موجود نیست', data: { status: false }})


            //get status id
            filter = {active: true, status: config.acceptDeliveryOrder}
            let status = await this.model.OrderStatusBar.findOne(filter, '_id')

            order.status = status
            order.deliveryId = req.decodedData.user_id
            await order.save()

            res.json({ success : true, message : 'وضعیت سفارش با موفقیت ویرایش شد', data: { status: true }})
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('acceptOrder')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }


    async getacceptedOrders(req, res) {
        try {

            let filter = { active: true, deliveryId: req.decodedData.user_id }

            let orders = await this.model.Order
                .find(filter, { createdAt: 1, customer: 1, address: 1, 'GPS.coordinates': 1, products: 1, description: 1 })
                .populate({ path: 'products._id', model: 'Product', select: 'name'})
                .populate('customer', { _id: 0, family: 1, mobile: 1})
                .populate('status', {status: 1, name: 1, _id: 0})
                .sort({createdAt:-1})

            orders = orders.filter(order => order.status.status === config.acceptDeliveryOrder )

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

    async finishOrder(req, res) {
        try {

            req.checkBody('orderId', 'please set order id').notEmpty();
            if (this.showValidationErrors(req, res)) return;

            let filter = { active : true, _id: req.body.orderId, deliveryId: req.decodedData.user_id }
            let order = await this.model.Order.findOne(filter)

            if(!order)
                return res.json({ success : false, message : 'سفارش موجود نیست', data: { status: false }})

            //get status id
            filter = {active: true, status: config.finishedOrder}
            let status = await this.model.OrderStatusBar.findOne(filter, '_id')

            order.status = status
            order.finishDate = new Date()
            await order.save()

            res.json({ success : true, message : 'وضعیت سفارش با موفقیت ویرایش شد', data: { status: true }})
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('finishOrder')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }


    async getfinishedOrders(req, res) {
        try {

            let filter = { active: true, deliveryId: req.decodedData.user_id }

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

    async notResposiveCustomer(req, res) {
        try {

            req.checkBody('orderId', 'please set order id').notEmpty();
            if (this.showValidationErrors(req, res)) return;

            
            return res.json({ success : true, message : 'اطلاعات دریافت شد', data: { status: true }})
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('notResposiveCustomer')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

}


