
const Controller = require(`${config.path.controllers.user}/Controller`);
const TAG = 'v1_Order';

module.exports = new class OrderController extends Controller {

    async index(req, res) {
        return res.json({ success: true, message: "Order v1" });
    }

    
    async getPendingOrders(req, res) {
        try {

            let filter = { active: true }

            let orders = await this.model.Order.find(filter, { createdAt: 1 }).populate('status', {name: 1, _id: 0}) 

            filter = { active: true }
            let cooktime = await this.model.Settings.findOne(filter, 'order.cookTime')

            orders = orders.filter(order => 
                order.status.name === config.readyOrders && 
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

}


