
const Controller = require(`${config.path.controllers.user}/Controller`);
const TAG = 'v1_Order';

module.exports = new class HomeController extends Controller {

    async index(req, res) {
        return res.json({ success: true, message: "Order v1" });
    }

    async getOrdersByFilter(req, res) {
        try {
            req.checkParams('type', 'please enter filter type').notEmpty().isIn(['family', 'mobile', 'address']);
            req.checkParams('value', 'please enter filter type').notEmpty().isString();
            if (this.showValidationErrors(req, res)) return;

            let filter = { active: true }

            let orders = await this.model.Order.find(filter, { status: 1, createdAt: 1, address: 1, paid: 1}).populate('customer', { family: 1, mobile: 1, _id: 0 }).populate('status', {name: 1, status: 1, _id: 0}) 

            if(req.params.type === "family"){

                orders = orders.filter(param => {
                let re = new RegExp(req.params.value, "i");
                let find = param.customer.family.search(re);
                return find !== -1;
            })
            } else if(req.params.type === "mobile"){

                orders = orders.filter(order => order.customer.mobile === req.params.value)

            } else if(req.params.type === "address"){

                orders = orders.filter(param => {
                    let re = new RegExp(req.params.value, "i");
                    let find = param.address.search(re);
                    return find !== -1;
                })    
            }

            
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

    async getOrder(req, res) {
        try {
            req.checkParams('orderId', 'please enter order Id').notEmpty().isString();
            if (this.showValidationErrors(req, res)) return;

            let filter = { active: true, _id: req.params.orderId }

            let order = await this.model.Order
                .findOne(filter, { status: 1, createdAt: 1, address: 1, description: 1, deliveryCost: 1, products: 1, deliveryId: 1, paid: 1 })
                .populate({ path: 'products._id', model: 'Product', select: 'name'})
                .populate('customer', { family: 1, mobile: 1, _id: 0 })
                .populate('status', {name: 1, status: 1, _id: 0}) 

            order.deliveryCost = order.deliveryCost / 1000;

            filter = { userId: order.deliveryId}
            let delivery = await this.model.Location.findOne(filter, { userId: 0 }).sort({createdAt:-1}).limit(1)

            let deliveryLocation = {}
            if(delivery){
                deliveryLocation.lat = delivery.geo[1]
                deliveryLocation.lng = delivery.geo[0]
            }
                

            // caculate tax 
            let tax = order.products.map(product => product.price * product.quantity * config.tax)
            tax = tax.reduce((a, b) => parseInt(a) + parseInt(b), 0)

            let total = order.products.map(product => product.price * product.quantity);
            total = total.reduce((a, b) => parseInt(a) + parseInt(b), 0)
            total += (order.deliveryCost + tax);
            
           
            return res.json({ success : true, message : 'سفارشات با موفقیت ارسال شد', data: {order, deliveryLocation, tax, total}})
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('getOrder')
                .inputParams(req.params)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

    async cancelOrder(req, res) {
        try {
            req.checkBody('orderId', 'please set order id').notEmpty();
            if (this.showValidationErrors(req, res)) return;

            let filter = { active : true, _id: req.body.orderId }
            let order = await this.model.Order.findOne(filter)

            if(!order)
                return res.json({ success : false, message : 'سفارش موجود نیست', data: { status: false }})

            //get status id
            filter = {active: true, status: config.canceledOrder}
            let status = await this.model.OrderStatusBar.findOne(filter, '_id')

            order.status = status
            order.finishDate = new Date()
            await order.save()

            res.json({ success : true, message : 'سفارش با موفقیت لغو شد', data: { status: true }})
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('cancelOrder')
                .inputParams(req.params)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

    async getdeliveryLocation(req, res) {
        try {
            req.checkParams('orderId', 'please set order id').notEmpty();
            if (this.showValidationErrors(req, res)) return;

            let filter = { active : true, _id: req.params.orderId }
            let order = await this.model.Order.findOne(filter, 'deliveryId').populate('status')

            if(!order.deliveryId)
                return res.json({ success : true, message : `است ${order.status.name} سفارش شما در مرحله `, data: { status: false }})

            filter = { userId: order.deliveryId}
            let deliveryLocation = await this.model.Location.findOne(filter, { userId: 0 }).sort({createdAt:-1}).limit(1)
            
            res.json({ success : true, message : 'موقعیت پیک با موفقیت ارسال شد', data: { status: true, deliveryLocation }})
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('getdeliveryLocation')
                .inputParams(req.params)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
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

    async editAddress(req, res) {
        try {
            req.checkBody('orderId', 'please set order id').notEmpty();
            req.checkBody('adrs', 'please set adrs').notEmpty();
            if (this.showValidationErrors(req, res)) return;

            let filter = { active : true, _id: req.body.orderId }
            let order = await this.model.Order.findOne(filter)

            if(!order)
                return res.json({ success : true, message : 'سفارش موجود نیست', data: { status: false }})

            order.address = req.body.adrs
            await order.save()

            res.json({ success : true, message : 'عملیات با موفقیت انجام شد', data: { status: true }})
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('editAddress')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }


}


