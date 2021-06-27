
const Controller = require(`${config.path.controllers.user}/Controller`);
const TAG = 'v1_Order';

module.exports = new class HomeController extends Controller {

    async index(req, res) {
        return res.json({ success: true, message: "Order v1" });
    }

    async addOrder(req, res) {
        try {
            req.checkBody('products', 'please enter products').notEmpty();
            req.checkBody('products.*._id', 'please enter product id').notEmpty();
            req.checkBody('products.*.quantity', 'please enter product quantity').notEmpty();
            req.checkBody('products.*.sellingPrice', 'please enter product sellingPrice').notEmpty();
            req.checkBody('customer', 'please enter customer').notEmpty();
            req.checkBody('customer.family', 'please enter customer family').notEmpty();
            req.checkBody('customer.mobile', 'please enter customer mobile').notEmpty().isNumeric();
            req.checkBody('customer.birthday', 'please enter customer birthday').notEmpty().isISO8601();
            req.checkBody('reminder', 'please enter customer birthday').notEmpty().isInt({min: -1});
            if (this.showValidationErrors(req, res)) return;

            const TIME_FLAG = "1900-01-01T05:42:13.845Z";
            const INT_FLAG = "-1";

            // add customer
            let filter = { mobile: req.body.customer.mobile, user: req.decodedData.user_employer }
            let customer = await this.model.Customer.findOne(filter)

            let params = {
                family: req.body.customer.family,
                mobile: req.body.customer.mobile,
                user: req.decodedData.user_employer
            }

            if(req.body.customer.birthday != TIME_FLAG)
                params.birthday = req.body.customer.birthday

            if(!customer)
                customer = await this.model.Customer.create(params)
            if(customer && !customer.birthday && req.body.customer.birthday != TIME_FLAG)
                customer.birthday = req.body.customer.birthday;
            
            // add order
            params = {
                name: req.body.name,
                products: req.body.products,
                customer: customer._id,
                provider: req.decodedData.user_employer,
                description: req.body.description
            }

            let order = await this.model.Order.create(params)

            
            // add reminder
            if(req.body.reminder !== INT_FLAG){

                // calculate date
                const event = new Date();
                event.setDate(event.getDate() + parseInt(req.body.reminder));

                params = {
                    date: event.toISOString(),
                    user: req.decodedData.user_employer,
                    customer: customer._id,
                    order: order._id
                }
                let reminder = await this.model.Reminder.create(params)

                // add reminder to customer
                await customer.reminder.push(reminder._id)
            }

            // add order to customer
            await customer.order.push(order._id)
            await customer.save()


            res.json({ success : true, message : 'سفارش شما با موفقیت ثبت شد'})
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

    async getOrders(req, res) {
        try {
            req.checkParams('customerName', 'please set customerName').notEmpty();
            req.checkParams('customerMobile', 'please set customerMobile').notEmpty();
            req.checkParams('startDate', 'please set startDate').notEmpty().isISO8601();
            req.checkParams('endDate', 'please set endDate').notEmpty().isISO8601();
            
            if (this.showValidationErrors(req, res)) return;

            const TIME_FLAG = "1900-01-01T05:42:13.845Z";

            let filter ;
            if(req.params.startDate != TIME_FLAG && req.params.endDate === TIME_FLAG)
                filter = { $and:[{provider: req.decodedData.user_employer}, {createdAt: { $gt: req.params.startDate}}] }
            if(req.params.startDate === TIME_FLAG && req.params.endDate != TIME_FLAG)
                filter = { $and:[{provider: req.decodedData.user_employer}, {createdAt: { $lt: req.params.endDate }}] }
            if(req.params.startDate === TIME_FLAG && req.params.endDate === TIME_FLAG)
                filter = { provider: req.decodedData.user_employer }
            if(req.params.startDate != TIME_FLAG && req.params.endDate != TIME_FLAG)
                filter = { $and:[{provider: req.decodedData.user_employer}, {createdAt: { $lt: req.params.endDate }}, {createdAt: { $gt: req.params.startDate}}] }

            let orders = await this.model.Order.find(filter).sort({createdAt: -1});

            let params = [];
            for (let index = 0; index < orders.length; index++) {
                let param = {
                    active: orders[index].active,
                    products: orders[index].products,
                    customer: orders[index].customer,
                    createdAt: orders[index].createdAt,
                    updatedAt: orders[index].updatedAt,
                    description: orders[index].description
                }     
                params.push(param)           
            }
            
            let customers = []
            for (let index = 0; index < orders.length; index++) {
                customers.push(orders[index].customer)
            }

            filter = { _id: { $in: customers } }
            customers = await this.model.Customer.find(filter, { _id: 1, family: 1, mobile: 1, createdAt: 1 })

            let customerInfo;
            for (let index = 0; index < orders.length; index++) {
                customerInfo = customers.find(user => user._id.toString() == orders[index].customer)
                params[index].customer = customerInfo;
            }

            if(req.params.customerMobile !== "0")
                params = params.filter(param => param.customer.mobile === req.params.customerMobile)
            
            if(req.params.customerName !== " ")
                params = params.filter(param => {
                    if(param.customer){
                        let re = new RegExp(req.params.customerName, "i");
                        let find = param.customer.family.search(re);
                        return find !== -1;
                    }  
                    })

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
                    if (productInfo)
                        params[index].products[j].name = productInfo.name;
                }
            }
            

            return res.json({ success : true, message : 'سفارشات با موفقیت ارسال شد', data : params })
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


