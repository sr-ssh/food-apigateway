
const Controller = require(`${config.path.controllers.user}/Controller`);
const TAG = 'v1_Order';

module.exports = new class OrderController extends Controller {

    async index(req, res) {
        return res.json({ success: true, message: "Order v1" });
    }

    async getOrders(req, res) {
        try {

            let filter = { active: true, paid: true, status: 0 }

            let orders = await this.model.Order.find(filter);

            let params = [];
            for (let index = 0; index < orders.length; index++) {
                let param = {
                    id: orders[index]._id,
                    products: orders[index].products,
                    readyTime: orders[index].readyTime,
                    createdAt: orders[index].createdAt,
                    updatedAt: orders[index].updatedAt,
                    description: orders[index].description
                }     
                params.push(param)           
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


