
const Controller = require(`${config.path.controllers.user}/Controller`);
const TAG = 'v1_Product';


module.exports = new class ProductController extends Controller {

    async index(req, res) {
        return res.json({ success: true, message: "Product v1" });
    }

    async addProduct(req, res) {
        try {
            req.checkBody('name', 'please enter name').notEmpty();
            req.checkBody('buyingPrice', 'please enter buyingPrice').notEmpty();
            req.checkBody('sellingPrice', 'please enter sellingPrice').notEmpty();
            req.checkBody('description', 'please enter description').notEmpty();
            if (this.showValidationErrors(req, res)) return;

            let params = {
                name: req.body.name,
                buyingPrice: req.body.buyingPrice,
                sellingPrice: req.body.sellingPrice,
                description: req.body.description,
                user: req.decodedData.user_employer
            }

            let filter = { name: params.name, buyingPrice: params.buyingPrice, sellingPrice: params.sellingPrice, user: params.user}
            let product = await this.model.Product.findOne(filter)

            if(product)
                return res.json({ success : false, message : 'محصول وارد شده، موجود است'})
                
            await this.model.Product.create(params)

            res.json({ success : true, message : 'محصول شما با موفقیت ثبت شد'})
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('addProduct')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

    async getProducts(req, res) {
        try {
            let filter = { user: req.decodedData.user_employer }
            let products = await this.model.Product.find(filter);

            res.json({ success : true, message : 'محصولات با موفقیت ارسال شد', data: products})
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('getProducts')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

}


