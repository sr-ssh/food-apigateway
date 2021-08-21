
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


            return res.json({ success: true, message: "محصولات سفارش با موفقیت ارسال شد", data: products });
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
            req.checkBody('products.*.name', 'please enter product id').notEmpty().isString();
            req.checkBody('products.*.quantity', 'please enter product quantity').notEmpty().isInt({min:1});
            req.checkBody('products.*.price', 'please enter product price').notEmpty().isInt({min: 0});
            req.checkBody('products.*.size', 'please enter product size').notEmpty().isString();
            req.checkBody('address', 'please enter address').notEmpty().isString();
            req.checkBody('lat', 'please enter lat').notEmpty().isFloat({ min: -90, max: 90});
            req.checkBody('lng', 'please enter lng').notEmpty().isFloat({ min: -180, max: 180});
            req.checkBody('deliveryCost', 'please enter deliveryCost').notEmpty().isInt({min: 0});
            req.checkBody('description', 'please enter description').optional().isString();
            
            if (this.showValidationErrors(req, res)) return;

            // recalculate product supply
            for (let index = 0; index < req.body.products.length; index++) {
                let productSupply = await this.model.Product.findOne({_id: req.body.products[index]._id}, 'supply')
                let supply = productSupply.supply - req.body.products[index].quantity;
                if(supply < 0)
                    return res.json({ success : true, message : 'موجودی محصول کافی نیست', data: {status: false}})
                productSupply.supply = supply;
                await productSupply.save()
            }

            //get status id
            let filter = {active: true, name: config.activeOrders}
            let status = await this.model.OrderStatusBar.findOne(filter, '_id')

            let products = req.body.products.map(product =>  { 
                return {
                    _id: product._id,
                    quantity: product.quantity,
                    price: product.price * 1000,
                    size:product.size
                }
            })

            // add order
            let params = {
                products: products,
                customer: req.decodedData.user_id,
                address: req.body.address,
                deliveryCost: req.body.deliveryCost * 1000,
                status: status._id,
                description: req.body.description,
                GPS: { type: "Point", coordinates: [ req.body.lng, req.body.lat]}
            }

            let order = await this.model.Order.create(params)

            // add order to customer
            let update = { $addToSet: {order: order._id, locations: { address: params.address, GPS: params.GPS }}}
            await this.model.Customer.findByIdAndUpdate(req.decodedData.user_id, update)

            // caculate tax 
            let tax = order.products.map(product => product.price * product.quantity * config.tax)
            tax = tax.reduce((a, b) => parseInt(a) + parseInt(b), 0)

            let data = { 
                orderId: order._id,
                products: req.body.products,
                deliveryCost: params.deliveryCost / 1000,
                tax: tax
            }

            res.json({ success : true, message : 'سفارش شما با موفقیت ثبت شد', data: data})

            //send smd
            let settings = await this.model.Settings.findOne({active: true})
            if(settings.order.addOrderSms.status)
                this.sendSms(req.decodedData.user_mobile, settings.order.addOrderSms.text + '\n' + settings.companyName)
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

    async getInLineOrders(req, res) {
        try {
            
            let filter = { active: true, customer: req.decodedData.user_id }

            let orders = await this.model.Order
                .find(filter, { status: 1, createdAt: 1, paid: 1, products: 1, deliveryCost: 1 })
                .populate('status', { status: 1, name: 1, _id: 0}) 

            orders = orders.filter(order => 
                order.status.status !== config.finishedOrder &&
                order.status.status !== config.canceledOrder
                )
            
            // caculate total
            orders = orders.map(order => {
                let total = order.products.map(product => product.price * product.quantity);
                total = total.reduce((a, b) => parseInt(a) + parseInt(b), 0)

                // caculate tax 
                let tax = order.products.map(product => product.price * product.quantity * config.tax)
                tax = tax.reduce((a, b) => parseInt(a) + parseInt(b), 0)

                total += (order.deliveryCost + tax);
                return {
                    _id: order._id,
                    paid: order.paid,
                    status: order.status,
                    createdAt: order.createdAt,
                    total: total
                }
            })
            

            return res.json({ success : true, message : 'سفارشات با موفقیت ارسال شد', data: orders })
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('getInLineOrders')
                .inputParams(req.params)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

    async getOrder(req, res) {
        try {
            req.checkParams('orderId', 'please enter order Id').notEmpty().isString();
            if (this.showValidationErrors(req, res)) return;

            let filter = { active: true, _id: req.params.orderId, customer: req.decodedData.user_id }

            let order = await this.model.Order
                .findOne(filter, { status: 1, createdAt: 1, address: 1, description: 1, deliveryCost: 1, products: 1})
                .populate({ path: 'products._id', model: 'Product', select: 'name'})
                .populate('status', {name: 1, _id: 0}) 

            // caculate tax 
            let tax = order.products.map(product => product.price * product.quantity * config.tax)
            tax = tax.reduce((a, b) => parseInt(a) + parseInt(b), 0)

            return res.json({ success : true, message : 'سفارشات با موفقیت ارسال شد', data: {order, tax}})
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
                return res.json({ success : true, message : 'سفارش موجود نیست', data:{ status: false}})


            //confirm time 
            filter = { active: true }
            let confirmTime = await this.model.Settings.findOne(filter, 'order.confirmTime')

            if(this.getTimeDiff(order.createdAt.toISOString(), new Date().toISOString(), config.confirmTimeUnit) > confirmTime.order.confirmTime)
                return res.json({ success : true, message : 'امکان کنسل سفارش وجود ندارد', data:{ status: false}})
            
            //get status id
            filter = {active: true, status: config.canceledOrder}
            let status = await this.model.OrderStatusBar.findOne(filter, '_id')

            order.status = status
            order.finishDate = new Date()
            await order.save()

            // recalculate product supply
            for (let index = 0; index < order.products.length; index++) {
                await this.model.Product.findOneAndUpdate(
                    {_id: order.products[index]._id}, 
                    { $inc: { supply: order.products[index].quantity }}
                )
            }

            if(order.paid){
                // caculate total 
                let total = order.products.map(product => product.price * product.quantity)
                total = total.reduce((a, b) => parseInt(a) + parseInt(b), 0)

                // caculate tax 
                let tax = order.products.map(product => product.price * product.quantity * config.tax)
                tax = tax.reduce((a, b) => parseInt(a) + parseInt(b), 0)

                total += (order.deliveryCost + tax);

                //make customerFinance collection
                let params = {
                    orderId: req.body.orderId,
                    customerId: req.decodedData.user_id,
                    type: config.debit,
                    cost: total
                }
                await this.model.CustomerFinance.create(params)
            }
            
            res.json({ success : true, message : 'سفارش شما  لغو شد ', data:{ status: true} })
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


    async getOrderProductsTypes(req, res) {
        try {
            let filter = { active: true }

            let productTypes = await this.model.ProductTypes.find(filter, { name:1 }) 

            let data = productTypes.map(type => type.name)

            return res.json({ success: true, message: "محصولات سفارش با موفقیت ارسال شد", data: data });
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('getOrderProductsTypes')
                .inputParams(req.params)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

    async getfinishedOrders(req, res) {
        try {

            let filter = { active: true, customer: req.decodedData.user_id }

            let orders = await this.model.Order
                .find(filter, { finishDate: 1, address: 1, products: 1, status: 1, deliveryCost: 1})
                .populate({ path: 'products._id', model: 'Product', select: 'name'})
                .populate('status', {status: 1, name: 1, _id: 0})
            
            orders = orders.map(order => {
                order.products = order.products.map(product => {
                    return{
                        name: product._id.name,
                        size: product.size,
                        quantity: product.quantity,
                        price: product.price
                    }
                });
                return order;
            })

            orders = orders.filter(order => 
                order.status.status === config.finishedOrder ||
                order.status.status === config.canceledOrder 
                )

            orders = orders.map(order => {
                // caculate total 
                let total = order.products.map(product => product.price * product.quantity)
                total = total.reduce((a, b) => parseInt(a) + parseInt(b), 0)
                // caculate tax 
                let tax = order.products.map(product => product.price * product.quantity * config.tax)
                tax = tax.reduce((a, b) => parseInt(a) + parseInt(b), 0)

                total += (order.deliveryCost + tax);
                return {
                    order,
                    total,
                    tax
                }
            })
            

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


