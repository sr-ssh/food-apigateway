
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
            data.shift()
            if(!data.length)  
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
            if (this.showValidationErrors(req, res)) return;

            let filter = { active : true }
            let kitchens = await this.model.Kitchen.find()
            // find distance between input address and all kitchens , select the nearest kitchen


            //delivery cost
            let deliveryCost = await this.model.Settings.findOne({}, 'delivery')


            let data = { 
                deliveryCost: deliveryCost.delivery.deliveryCost,
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


    async checkLocation(req, res) {
        try {
            req.checkBody('location', 'please enter address').notEmpty().isObject();
            req.checkBody('location.address', 'please enter address').notEmpty().isString();
            if (this.showValidationErrors(req, res)) return;

            let filter = { active : true }
            await this.model.Customer.update({_id: req.decodedData.user_id}, { $pull: { locations: req.decodedData.location }})

            Dive.update({ _id: diveId }, { "$pull": { "divers": { "user": userIdToRemove } }}, { safe: true, multi:true })


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


