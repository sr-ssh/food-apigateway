
const Controller = require(`${config.path.controllers.user}/Controller`);
const TAG = 'v1_Charge';
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports = new class ChargeController extends Controller {

    async index(req, res) {
        return res.json({ success: true, message: "Charge v1" });
    }

    async getCharge(req, res) {
        try {

            let charge = await this.model.CustomerFinance.aggregate([
                { "$match" : { "customerId" : ObjectId(req.decodedData.user_id) }},                
                {                   
                    "$group": {
                        "_id": '$customerId',
                        "debit": {
                            "$sum": {
                                "$cond": [
                                    { "$eq": ["$type", "debit"] },
                                    "$cost",
                                    0
                                ]
                            }
                        },
                        "credit": {
                            "$sum": {
                                "$cond": [
                                    { "$eq": ["$type", "credit"] },
                                    "$cost",
                                    0
                                ]
                            }
                        },
                    }
                },
                {
                    "$project": {
                        "charge": { "$subtract": ["$debit", "$credit"] }
                    }
                }
            ])

            let data = 0;
            if (charge.length)
                data = charge[0].charge

            return res.json({ success: true, message: "شارژ کاربر با موفقیت ارسال شد", data: data });
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


