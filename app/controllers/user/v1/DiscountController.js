
const Controller = require(`${config.path.controllers.user}/Controller`);
const TAG = 'v1_Discount';


module.exports = new class DiscountController extends Controller {

    async index(req, res) {
        return res.json({ success: true, message: "Product v1" });
    }

    async addDiscount(req, res) {
        try {
            
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('addDiscount')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

    async getDiscounts(req, res) {
        try {
            
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('getDiscounts')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

}


