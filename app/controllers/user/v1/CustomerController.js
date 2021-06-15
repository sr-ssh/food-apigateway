
const Controller = require(`${config.path.controllers.user}/Controller`);
const TAG = 'v1_Customer';


module.exports = new class CustomerController extends Controller {

    async index(req, res) {
        return res.json({ success: true, message: "Customer v1" });
    }

    async getCustomers(req, res) {
        try {
            let customers = await this.model.Customer.find();

            let params = [];
            for (let index = 0; index < customers.length; index++) {
                let param = {
                    active: true,
                    family: customers[index].family,
                    username: customers[index].username,
                    mobile: customers[index].mobile,
                    birthday: customers[index].birthday,
                    address: customers[index].address,
                    createdAt: customers[index].createdAt,
                    lastBuy: '',
                    total: 0
                }     
                params.push(param)           
            }
            
            let orders = []
            for (let index = 0; index < customers.length; index++) {
                for (let j = 1; j < customers[index].order.length; j++) {
                    orders.push(customers[index].order[j])
                }
            }

            let filter = { _id: { $in: orders } }
            orders = await this.model.Order.find(filter, { _id: 1, updatedAt: 1, products: 1 })

            orders = orders.map(order => {
                order.products = order.products.map(product => product.sellingPrice)
                order.total = order.products.reduce((a, b) => parseInt(a) + parseInt(b), 0)
                return order
                })

            let totalOrders = orders.map(order => order.products.reduce((a, b) => parseInt(a) + parseInt(b), 0))
            params.push({totalOrders : totalOrders.reduce((a, b) => parseInt(a) + parseInt(b), 0)})

            let orderInfo;
            for (let index = 0; index < customers.length; index++) {
                orderInfo = orders.filter(order => customers[index].order.includes(order._id))
                params[index].lastBuy = orderInfo[orderInfo.length-1].updatedAt
                orderInfo = orderInfo.map(order => order._id)
                params[index].order = orderInfo;
                
            }

            res.json({ success : true, message : 'اطلاعات مشتریان با موفقیت ارسال شد', data: params})
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('getCustomers')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

}


