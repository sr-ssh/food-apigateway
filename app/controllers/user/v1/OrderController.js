
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
            req.checkBody('customer.name', 'please enter customer name').notEmpty();
            req.checkBody('customer.family', 'please enter customer family').notEmpty();
            req.checkBody('customer.mobile', 'please enter customer mobile').notEmpty();
            if (this.showValidationErrors(req, res)) return;

            // add customer
            let filter = { mobile: req.body.customer.mobile }
            let customer = await this.model.Customer.findOne(filter)

            let params = {
                name: req.body.customer.name,
                family: req.body.customer.family,
                mobile: req.body.customer.mobile,
                birthday: req.body.customer.birthday,
                user: req.decodedData.user_employer
            }

            if(!customer)
                customer = await this.model.Customer.create(params)
            
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
            if(req.body.reminder){

                // calculate date
                const event = new Date();
                event.setDate(event.getDate() + req.body.reminder);

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
            let filter ;
            if(req.body.startDate && !req.body.endDate)
                filter = { $and:[{provider: req.decodedData.user_employer}, {createdAt: { $gt: req.body.startDate}}] }
            if(!req.body.startDate && req.body.endDate)
                filter = { $and:[{provider: req.decodedData.user_employer}, {createdAt: { $lt: req.body.endDate }}] }
            if(!req.body.startDate && !req.body.endDate)
                filter = { provider: req.decodedData.user_employer }
            if(req.body.startDate && req.body.endDate)
                filter = { $and:[{provider: req.decodedData.user_employer}, {createdAt: { $lt: req.body.endDate }}, {createdAt: { $gt: req.body.startDate}}] }

            let orders = await this.model.Order.find(filter);

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
            customers = await this.model.Customer.find(filter, { _id: 1, name: 1, family: 1, mobile: 1, createdAt: 1 })

            let customerInfo;
            for (let index = 0; index < orders.length; index++) {
                customerInfo = customers.find(user => user._id.toString() == orders[index].customer)
                params[index].customer = customerInfo;
            }

            if(req.body.mobile)
                params = params.filter(param => {
                    if(param.customer)
                        return param.customer.mobile == req.body.mobile
                    })

            return res.json({ success : true, message : 'سفارشات با موفقیت ارسال شد', data : params })
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('getOrders')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

}


