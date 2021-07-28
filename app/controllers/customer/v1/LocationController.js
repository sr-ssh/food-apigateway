
const Controller = require(`${config.path.controllers.user}/Controller`);
const TAG = 'v1_Home';


module.exports = new class LocationController extends Controller {

    async index(req, res) {
        return res.json({ success: true, message: "Location v1" });

    }

    async getLocations(req, res) {
        try {

            let filter = { active: true, _id: req.decodedData.user_id }
            let locations = await this.model.Customer.find(filter, { loaction: 1, _id: 0 })
            
            return res.json({ success: true, message: "محصولات سفارش با موفقیت ارسال شد", data: locations });
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('getLocations')
                .inputParams(req.params)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

    
}


