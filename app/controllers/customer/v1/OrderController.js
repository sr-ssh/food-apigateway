
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

            let data = products.map(product => {product.sellingPrice = parseInt(product.sellingPrice) / 1000; return product})

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

}


