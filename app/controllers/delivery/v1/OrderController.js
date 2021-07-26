
const Controller = require(`${config.path.controllers.user}/Controller`);
const TAG = 'v1_Order';

module.exports = new class OrderController extends Controller {

    async index(req, res) {
        return res.json({ success: true, message: "Order v1" });
    }

    async getPendingOrders(req, res) {
        try {

            let filter = { active: true, paid: true, status: { $in: [0, 1, 3] } }

            let orders = await this.model.Order.find(filter, { 'products.sellingPrice' : 0});

            let params = [];
            for (let index = 0; index < orders.length; index++) {
                let param = {
                    id: orders[index]._id,
                    products: orders[index].products,
                    address: orders[index].address,
                    status: orders[index].status,
                    createdAt: orders[index].createdAt
                }     
                params.push(param)           
            }

            let customers = []
            for (let index = 0; index < orders.length; index++) {
                customers.push(orders[index].customer)
            }

            filter = { _id: { $in: customers } }
            customers = await this.model.Customer.find(filter, { _id: 1, family: 1, mobile: 1 })

            let customerInfo;
            for (let index = 0; index < orders.length; index++) {
                customerInfo = customers.find(user => user._id.toString() == orders[index].customer)
                params[index].customer = customerInfo;
            }
            
            let products = []
            for (let index = 0; index < params.length; index++) {
                for (let j = 0; j < params[index].products.length; j++) {
                    products.push(params[index].products[j]._id)
                }
            }
            filter = { _id: { $in: products } }
            products = await this.model.Product.find(filter, { _id: 1, name: 1 })

            
            for (let index = 0; index < params.length; index++) {
                let productInfo;
                for (let j = 0; j < params[index].products.length; j++) {
                    productInfo = products.find(product => product._id.toString() === params[index].products[j]._id.toString())
                    if (productInfo){
                        params[index].products[j].name = productInfo.name;
                        delete params[index].products[j]._id
                    }
                }
            }

            let active = [];
            let ready = [];
            let delivery = [];

            for (let index = 0; index < params.length; index++) {
                switch (params[index].status) {
                    case 0:
                        delete params[index].status
                        active.push(params[index])
                        break;
                    case 1:
                        delete params[index].status
                        ready.push(params[index])
                        break;
                    case 3:
                        delete params[index].status
                        delivery.push(params[index])
                        break;
                    default:
                        break;
                }
            }

            let data = { active, ready, delivery}
            return res.json({ success : true, message : 'سفارشات با موفقیت ارسال شد', data : data })
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


