
const Controller = require(`${config.path.controllers.user}/Controller`);
const TAG = 'v1_Product';

module.exports = new class ProductController extends Controller {

    async index(req, res) {
        return res.json({ success: true, message: "Product v1" });
    }

    async getProducts(req, res) {
        try {

            let filter = { active: true }

            let Products = await this.model.Product
                .find(filter, { name: 1, supply: 1 })
               
            return res.json({ success : true, message : 'موجودی محصولات با موفقیت ارسال شد', data: Products })
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('getProducts')
                .inputParams(req.params)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

    async editSupply(req, res) {
        try {

            req
              .checkBody("productId", "please set product id")
              .notEmpty()
              .isMongoId();
            req
              .checkBody("supply", "please set supply")
              .notEmpty()
              .isInt({ min: 0 });
            if (this.showValidationErrors(req, res)) return;

            let filter = { active: true, _id: req.body.productId };
            let update = { $set: { supply: req.body.supply } };
            await this.model.Product.updateOne(filter, update);

            res.json({
              success: true,
              message: "تعداد محصول با موفقیت ویرایش شد"
            });

        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('editSupply')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

}


