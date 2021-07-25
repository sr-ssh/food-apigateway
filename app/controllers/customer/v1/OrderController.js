
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

            let products = await this.model.Product.find(filter)
            let types = await this.model.ProductTypes.find(filter)

            let params = [];
            for (let index = 0; index < products.length; index++) {
                let param = {
                    name: products[index].name,
                    price: parseInt(products[index].sellingPrice) / 1000,
                    description: products[index].description
                }     
                params.push(param)           
            }

            let data = {}
            
            for (let j = 0; j < types.length; j++) {
                data[types[j].name] = []
                for (let index = 0; index < products.length; index++) {
                    if(products[index].type.toString() === types[j]._id.toString()){
                        data[types[j].name].push(params[index])  
                        break;
                    }  
                }
            }

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


