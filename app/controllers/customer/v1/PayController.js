
const Controller = require(`${config.path.controllers.user}/Controller`);
const TAG = 'v1_Pay';
const ZarinpalCheckout = require('zarinpal-checkout');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const zarinpal = ZarinpalCheckout.create('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', true);

module.exports = new class PayController extends Controller {

    async index(req, res) {
        return res.json({ success: true, message: "Pay v1" });
    }

    async payOrder(req, res) {
        try {
            req.checkBody('orderId', 'please enter order id').notEmpty().isString();
            if (this.showValidationErrors(req, res)) return;

            let order = await this.model.Order.findOne({_id: req.body.orderId})
            if(!order)
                return res.json({ success: true, message: "سفارش موجود نیست", data: { status: false}});

            // caculate total
            let tax = order.products.map(product => product.price * product.quantity * config.tax)
            tax = tax.reduce((a, b) => parseInt(a) + parseInt(b), 0)
            let total = order.products.map(product => product.price * product.quantity);
            total = total.reduce((a, b) => parseInt(a) + parseInt(b), 0)
            total += (order.deliveryCost + tax);
            
            //calculate customer charge
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

            let customerCharge = 0;
            if (charge.length)
                customerCharge = charge[0].charge
        
            let cost = 0;
            if(customerCharge > 0){
                //create a customerfinance and return response
                cost = total;
                if(total > customerCharge)
                    cost = customerCharge
                let params = {
                    orderId: req.body.orderId,
                    customerId: req.decodedData.user_id,
                    type: config.credit,
                    cost: cost
                }
                await this.model.CustomerFinance.create(params)
                if(total === cost)
                    return res.json({ success: true, message: "هزینه سفارش از شارژ شما پرداخت شد", data: { onlinePay: false } });
            }
            let amount = total - cost;

            //payment 
            let zarinRes = await zarinpal.PaymentRequest({
                Amount: amount, // In Tomans
                CallbackURL: 'http://www.happypizza.ir:3010/api/customer/v1/pay',
                Description: 'از خرید شما ممنونیم'
            })
            if(zarinRes.status != 100)
                return res.json({ success: true, message: "پرداخت ناموفق", data: { onlinePay: true, payStatus: zarinRes.status } });
            
            //save pay authority 
            order.payAuthority = zarinRes.authority
            order.payAmount = amount;
            await order.save();

            return res.json({ success: true, message: "پرداخت با موفقیت انجام شد", data: { onlinePay: true, payStatus: zarinRes.status, payURL: zarinRes.url } });
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('getCharge')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }


    async validatePay(req, res) {
        try {
            req.checkQuery('Authority', 'please enter Authority').notEmpty().isNumeric();
            req.checkQuery('Status', 'please enter Status').notEmpty().isIn(['OK', 'NOK']);
            if (this.showValidationErrors(req, res)) return;

            let filter = { payAuthority: req.query.Authority }
            let order = await this.model.Order.findOne(filter).populate('customer')
            if(!order)
                return res.json({ success: true, message: "سفارش موجود نیست", data: { status: false}});

            let zarinRes = await zarinpal.PaymentVerification({
                Amount: order.payAmount, // In Tomans
                Authority: req.query.Authority,
            })

            if(zarinRes.status === 100 || zarinRes.status === 101){
                order.paid = true
                await order.save()
                //send smd
                let settings = await this.model.Settings.findOne({active: true})
                if(settings.order.successfullPaymentSms.status)
                    this.sendSms(order.customer.mobile, settings.order.successfullPaymentSms.text + '\n' + settings.companyName)
                return res.redirect('http://www.happypizza.ir:3012/pay/success')
                // return res.json({ success: true, message: "پرداخت با موفقیت انجام شد", data: { status: true } });
            }

            // caculate total
            let tax = order.products.map(product => product.price * product.quantity * config.tax)
            tax = tax.reduce((a, b) => parseInt(a) + parseInt(b), 0)
            let total = order.products.map(product => product.price * product.quantity);
            total = total.reduce((a, b) => parseInt(a) + parseInt(b), 0)
            total += (order.deliveryCost + tax);

            if(order.payAmount < total){
                //get back the charge
                console.log(order.payAmount, total, total - order.payAmount )

                let params = {
                    orderId: req.body.orderId,
                    customerId: order.customer,
                    type: config.debit,
                    cost: total - order.payAmount 
                }
                await this.model.CustomerFinance.create(params)
            }
            return res.redirect('http://www.happypizza.ir:3012/pay/fail')
            // return res.json({ success: true, message: "پرداخت انجام نشد", data: { status: false } });
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('validatePay')
                .inputParams(req.params)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }




}


