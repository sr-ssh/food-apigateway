
const Controller = require(`${config.path.controllers.user}/Controller`);
const TAG = 'v1_Charge';


module.exports = new class ChargeController extends Controller {

    async index(req, res) {
        return res.json({ success: true, message: "Charge v1" });

    }

    async getCharge(req, res) {
        try {

            let filter = { active: true, customer: req.decodedData.user_id }
            let charge = await this.model.DeliveryFinance.aggregate([
                { "$group": {
                    "_id": req.decodedData.user_id,
                    "debit": {
                        "$sum": { 
                            "$cond": [
                                { "$eq": [ "$type", "debit" ] },
                                "$cost", 
                                0
                            ]
                        }
                    },
                    "credit": { 
                        "$sum": { 
                            "$cond": [
                                { "$eq": [ "$type", "credit"] },
                                "$cost", 
                                0
                            ]
                        }
                    },
                }},
                { "$project": {
                    "charge": { "$subtract": [ "$debit", "$credit" ] }
                }}
            ])
        
            
            return res.json({ success: true, message: "شارژ کاربر با موفقیت ارسال شد", data: charge[0].charge });
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('getCharge')
                .inputParams(req.params)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

    

    
}


