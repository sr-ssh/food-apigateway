const { param } = require("express-validator/check");

const Controller = require(`${config.path.controllers.user}/Controller`);
const TAG = 'v1_Customer';


module.exports = new class CustomerController extends Controller {

    async index(req, res) {
        return res.json({ success: true, message: "Customer v1" });
    }

    async getCustomers(req, res) {
        try {

            param('family', 'please enter family').exists();
            param('mobile', 'please enter mobile').exists();
            param('createdAtFrom', 'please enter createdAtFrom').exists();
            param('createdAtTo', 'please enter createdAtTo').exists();
            param('totalFrom', 'please enter totalFrom').exists();
            param('totalTo', 'please enter totalTo').exists();
            param('lastBuyFrom', 'please enter lastBuyFrom').exists();
            param('lastBuyTo', 'please enter lastBuyTo').exists();
            param('orderFrom', 'please enter orderFrom').exists();
            param('orderTo', 'please enter orderTo').exists();
            if (this.showValidationErrors(req, res)) return;

            let filter = {active: true, user: req.decodedData.user_employer};
            
            //filtering mobile, creadtedAtTo, and creadtedAtFrom
            if(req.params.mobile !== " ")
                filter = { active:true, user: req.decodedData.user_employer, mobile: req.params.mobile }
            if(req.params.createdAtFrom !== " ")
                filter = { active:true, user: req.decodedData.user_employer, createdAt: { $gt: req.params.createdAtFrom} }
            if(req.params.createdAtTo !== " ")
                filter = { active:true, user: req.decodedData.user_employer, createdAt: { $lt: req.params.createdAtFrom} }
            
            if(req.params.mobile !== " " && req.params.createdAtFrom !== " ")
                filter = { active:true, user: req.decodedData.user_employer, mobile: req.params.mobile, createdAt: { $gt: req.params.createdAtFrom} }
            if(req.params.mobile !== " " && req.params.createdAtTo !== " ")
                filter = { active:true, user: req.decodedData.user_employer, mobile: req.params.mobile, createdAt: { $lt: req.params.createdAtFrom} }

            if(req.params.createdAtFrom !== " " && req.params.createdAtTo !== " ")
                filter = { $and: [{active:true}, {user: req.decodedData.user_employer}, {createdAt: { $gt: req.params.createdAtFrom}}, {createdAt: { $lt: req.params.createdAtFrom}}] }

            if(req.params.mobile !== " " && req.params.createdAtFrom !== " " && req.params.createdAtTo !== " ")
                filter = { $and:[{active:true}, {user: req.decodedData.user_employer}, {mobile: req.params.mobile},{ createdAt: { $lt: req.params.createdAtFrom}}, {createdAt: { $lt: req.params.createdAtFrom}}] }

            let customers = await this.model.Customer.find(filter);

            let params = [];
            for (let index = 0; index < customers.length; index++) {
                let param = {
                    active: true,
                    family: customers[index].family,
                    mobile: customers[index].mobile,
                    birthday: customers[index].birthday,
                    createdAt: customers[index].createdAt,
                    lastBuy: '',
                    total: 0
                }     
                params.push(param)           
            }
            
            let orders = []
            for (let index = 0; index < customers.length; index++) {
                for (let j = 1; j < customers[index].order.length; j++) {
                    orders.push(customers[index].order[j])
                }
            }

            filter = { _id: { $in: orders } }
            orders = await this.model.Order.find(filter, { _id: 1, updatedAt: 1, products: 1 })

            orders = orders.map(order => {
                order.products = order.products.map(product => product.sellingPrice)
                return order
                })

            
            let orderInfo = [];
            for (let index = 0; index < customers.length; index++) {
                if(params[index].order)
                    orderInfo = orders.filter(order => customers[index].order.includes(order._id))
                if(orderInfo.length){
                    params[index].lastBuy = orderInfo[orderInfo.length-1].updatedAt
                    params[index].order = orderInfo.length;
                    let totalOrders = orderInfo.map(order => order.products.reduce((a, b) => parseInt(a) + parseInt(b), 0))
                    params[index].total = totalOrders.reduce((a, b) => parseInt(a) + parseInt(b), 0)
                }
            }
            //filtering family, totalFrom and totalTo
            if(req.params.family !== " ")
            params = params.filter(param => {
                    let re = new RegExp(req.params.family, "i");
                    let find = param.family.search(re);
                    return find !== -1;
                })

            if(req.params.totalFrom !== " ")
            params = params.filter(param => {
                if(param.total)
                    return param.total >= req.params.totalFrom
            })

            if(req.params.totalTo !== " ")
            params = params.filter(param => {
                if(param.total)
                    return param.total <= req.params.totalTo
            })

            //filtering lastBuy from, lastBuyTo, orderFrom, and orderTo
            if(req.params.lastBuyFrom !== " ")
                params = params.filter(param => {
                    if(param.total)
                        return param.lastBuy >= req.params.lastBuyFrom
                })
            if(req.params.lastBuyTo !== " ")
                params = params.filter(param => {
                    if(param.total)
                        return param.lastBuy <= req.params.lastBuyTo
                })
            if(req.params.orderFrom !== " ")
                params = params.filter(param => {
                    if(param.total)
                        return param.order >= req.params.orderFrom
                })
            if(req.params.orderTo !== " ")
                params = params.filter(param => {
                    if(param.total)
                        return param.order <= req.params.orderTo
                })

            res.json({ success : true, message : 'اطلاعات مشتریان با موفقیت ارسال شد', data: params})
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('getCustomers')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

}


