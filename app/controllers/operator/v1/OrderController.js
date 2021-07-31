
const Controller = require(`${config.path.controllers.user}/Controller`);
const TAG = 'v1_Order';

module.exports = new class HomeController extends Controller {

    async index(req, res) {
        return res.json({ success: true, message: "Order v1" });
    }

    async addOrder(req, res) {
        try {
            req.checkBody('products', 'please enter products').notEmpty();
            req.checkBody('products.*._id', 'please enter product id').notEmpty().isString();
            req.checkBody('products.*.quantity', 'please enter product quantity').notEmpty().inInt({min: 1});
            req.checkBody('products.*.price', 'please enter product sellingPrice').notEmpty().inInt({min: 0});
            req.checkBody('products.*.size', 'please enter product sellingPrice').notEmpty().isString();
            req.checkBody('customer', 'please enter customer').notEmpty();
            req.checkBody('customer.family', 'please enter customer family').notEmpty().isString();
            req.checkBody('customer.mobile', 'please enter customer mobile').notEmpty().isNumeric();
            req.checkBody('address', 'please enter address').notEmpty().isString();
            req.checkBody('description', 'please enter description').exists().isString();
            if (this.showValidationErrors(req, res)) return;

            // add customer
            let filter = { mobile: req.body.customer.mobile }
            let customer = await this.model.Customer.findOne(filter)

            let params = {
                family: req.body.customer.family,
                mobile: req.body.customer.mobile,
                locations: [{addres: req.body.address}]
            }

            if(!customer){
                customer = await this.model.Customer.create(params)
            }
                
            //get delivery cost
            let deliveryCost = await this.model.Settings.findOne({}, 'delivery')

            //get status id
            filter = {active: true, name: config.activeOrders}
            let status = await this.model.OrderStatusBar.findOne(filter, '_id')

            // add order
            params = {
                products: req.body.products,
                customer: customer._id,
                address: req.body.address,
                deliveryCost: deliveryCost.delivery.deliveryCost,
                status: status._id,
                description: req.body.description
            }

            let order = await this.model.Order.create(params)

            // add order and address to customer
            await customer.order.push(order._id)
            await customer.locations.push({addres: req.body.address})
            await customer.save()

            return res.json({ success : true, message : 'سفارش شما با موفقیت ثبت شد'})
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('addOrder')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

}


