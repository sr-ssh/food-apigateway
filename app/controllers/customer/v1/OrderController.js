
const Controller = require(`${config.path.controllers.user}/Controller`);
const TAG = 'v1_Home';


module.exports = new class OrderController extends Controller {

    async index(req, res) {
        return res.json({ success: true, message: "Order v1" });

    }

    async getOrderProducts(req, res) {
        try {
            let filter = { active: true }

            let products = await this.model.Product.find(filter, { createdAt: 0, active : 0, updatedAt: 0 }).populate('type', { name: 1, _id: 0}) 

            let data = products.map(product => {
                {product.size.map(size => {size.price = size.price/1000; return size});
                 return product}
                })

            return res.json({ success: true, message: "محصولات سفارش با موفقیت ارسال شد", data: data });
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('getOrderProducts')
                .inputParams(req.params)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

    async addOrder(req, res) {
        try {
            req.checkBody('products', 'please enter products').notEmpty();
            req.checkBody('products.*._id', 'please enter product id').notEmpty().isString();
            req.checkBody('products.*.quantity', 'please enter product quantity').notEmpty().isInt({min:1});
            req.checkBody('products.*.price', 'please enter product price').notEmpty().isInt({min: 0});
            req.checkBody('products.*.size', 'please enter product size').notEmpty().isString();
            req.checkBody('address', 'please enter address').notEmpty().isString();
            req.checkBody('lat', 'please enter lat').notEmpty().isFloat({ min: -90, max: 90});
            req.checkBody('long', 'please enter long').notEmpty().isFloat({ min: -180, max: 180});
            req.checkBody('deliveryCost', 'please enter description').notEmpty().isInt({min: 0});
            req.checkBody('description', 'please enter description').exists().isString();
            
            if (this.showValidationErrors(req, res)) return;

            //get status id
            let filter = {active: true, name: config.activeOrders}
            let status = await this.model.OrderStatusBar.findOne(filter, '_id')

            // add order
            let params = {
                products: req.body.products,
                customer: req.decodedData.user_id,
                address: req.body.address,
                deliveryCost: req.body.deliveryCost,
                status: status._id,
                description: req.body.description,
                GPS: { type: "Point", coordinates: [ req.body.long, req.body.lat]}
            }

            let order = await this.model.Order.create(params)
        
            // add order to customer
            let update = { $addToSet: {order: order._id, locations: { address: params.address, GPS: params.GPS }}}
            await this.model.Customer.findByIdAndUpdate(req.decodedData.user_id, update)

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


