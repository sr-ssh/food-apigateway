
const Controller = require(`${config.path.controllers.user}/Controller`);
const TAG = 'v1_Home';


module.exports = new class LocationController extends Controller {

    async index(req, res) {
        return res.json({ success: true, message: "Location v1" });

    }

    async getLocations(req, res) {
        try {

            let filter = { active: true, _id: req.decodedData.user_id }
            let location = await this.model.Customer.findOne(filter, { locations: 1, _id: 0 })
        
            let data = location.locations
            if(typeof location.locations[0].address !== "string")  
                data = {}
            
            return res.json({ success: true, message: "ادرس های مشتری با موفقیت ارسال شد", data: data });
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

    async checkLocation(req, res) {
        try {
            req.checkBody('lat', 'please enter lat').notEmpty().isFloat({ min: -90, max: 90});
            req.checkBody('lng', 'please enter lng').notEmpty().isFloat({ min: -180, max: 180});
            req.checkBody('address', 'please enter address').notEmpty().isString();
            if (this.showValidationErrors(req, res)) return;

            let filter = { active : true }
            let kitchens = await this.model.Kitchen.find()
            // find distance between input address and all kitchens , select the nearest kitchen


            //delivery cost
            let deliveryCost = await this.model.Settings.findOne({}, 'delivery')


            let data = { 
                deliveryCost: deliveryCost.delivery.deliveryCost / 1000,
                provider: {
                    status:true,
                    kitchenArea: kitchens[0].area
                }
            }
            

            return res.json({ success : true, message : 'موقعیت جغرافیایی فرستاده شده با موفقیت دریافت شد', data: data})
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('checkLocation')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

    
}


