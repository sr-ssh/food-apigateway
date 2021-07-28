
const Controller = require(`${config.path.controllers.user}/Controller`);
const TAG = 'v1_Home';
const jwt = require("jsonwebtoken")


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
            req.checkBody('products.*.sellingPrice', 'please enter product sellingPrice').notEmpty().isNumeric();
            if (this.showValidationErrors(req, res)) return;

            // add customer
            let filter = { active: true, _id: req.decodedData.user_id }
            let customer = await this.model.Customer.findOne(filter)

            if(!customer)
                return res.json({ success : true, message : 'کاربر یافت نشد'})

            // add order
            let params = {
                products: req.body.products,
                customer: customer._id
            }

            let order = await this.model.Order.create(params)
        
            // add order to customer
            await customer.order.push(order._id)
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


