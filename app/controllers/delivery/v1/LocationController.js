
const Controller = require(`${config.path.controllers.user}/Controller`);
const TAG = 'v1_Location';


module.exports = new class LocationController extends Controller {

    async index(req, res) {
        return res.json({ success: true, message: "Location v1" });

    }

    async addLocation(req, res) {
        try {
            req.checkBody('lat', 'please enter lat').notEmpty().isFloat({ min: -90, max: 90});
            req.checkBody('lng', 'please enter lng').notEmpty().isFloat({ min: -180, max: 180});
            req.checkBody('speed', 'please enter speed').notEmpty()
            req.checkBody('bearing', 'please enter bearing').notEmpty()
            if (this.showValidationErrors(req, res)) return;
            
            res.json({ success : true, message : 'موقعیت پیک با موفقیت ثبت شد', data: { status: true }})

            let lng = Math.round(req.body.lng * 1000000) / 1000000;
            let lat = Math.round(req.body.lat * 1000000) / 1000000;

            let params = {
                userId: req.decodedData.user_id,
                geo : [ lng, lat],
                speed : req.body.speed,
                bearing : req.body.bearing,
                saveDate: new Date()
            }

            await this.model.Location.create(params)

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


