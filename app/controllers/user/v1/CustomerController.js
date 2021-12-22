
const Controller = require(`${config.path.controllers.user}/Controller`);
const TAG = 'v1_Customer';


module.exports = new class CustomerController extends Controller {

    async index(req, res) {
        return res.json({ success: true, message: "Customer v1" });
    }

    async getCustomers(req, res) {
        try {

            req.checkParams("family", "please enter family").notEmpty().isString();
            req.checkParams("mobile", "please enter mobile").notEmpty().isNumeric();
            req
              .checkParams("createdAtFrom", "please enter createdAtFrom")
              .notEmpty()
              .isISO8601();
            req
              .checkParams("createdAtTo", "please enter createdAtTo")
              .notEmpty()
              .isISO8601();
            req
              .checkParams("totalFrom", "please enter totalFrom")
              .notEmpty()
              .isFloat({ min: 0 });
            req
              .checkParams("totalTo", "please enter totalTo")
              .notEmpty()
              .isFloat({ min: 0 });
            req
              .checkParams("lastBuyFrom", "please enter lastBuyFrom")
              .notEmpty()
              .isISO8601();
            req
              .checkParams("lastBuyTo", "please enter lastBuyTo")
              .notEmpty()
              .isISO8601();
            req
              .checkParams("orderFrom", "please enter orderFrom")
              .notEmpty()
              .isInt({ min: 0 });
            req
              .checkParams("orderTo", "please enter orderTo")
              .notEmpty()
              .isInt({ min: 0 });
            if (this.showValidationErrors(req, res)) return;
      
            const TIME_FLAG = "1900-01-01T05:42:13.845Z";
            const STRING_FLAG = " ";
            const NUMBER_FLAG = "0";
      
            let filter = { active: true };
      
            if (req.params.createdAtTo !== TIME_FLAG) {
              let nextDay = new Date(req.params.createdAtTo).setDate(
                new Date(req.params.createdAtTo).getDate() + 1
              );
              req.params.createdAtTo = nextDay;
            }
            if (req.params.lastBuyTo !== TIME_FLAG) {
              let nextDay = new Date(req.params.lastBuyTo).setDate(
                new Date(req.params.lastBuyTo).getDate() + 1
              );
              req.params.lastBuyTo = new Date(nextDay);
            }
      
            //filtering mobile, creadtedAtTo, and creadtedAtFrom
            if (req.params.mobile !== NUMBER_FLAG)
              filter = {
                active: true,
                mobile: req.params.mobile,
              };
            if (req.params.createdAtFrom !== TIME_FLAG)
              filter = {
                active: true,
                createdAt: { $gt: req.params.createdAtFrom },
              };
            if (req.params.createdAtTo !== TIME_FLAG) {
              filter = {
                active: true,
                createdAt: { $lt: req.params.createdAtTo },
              };
            }
      
            if (
              req.params.mobile !== NUMBER_FLAG &&
              req.params.createdAtFrom !== TIME_FLAG
            )
              filter = {
                active: true,
                mobile: req.params.mobile,
                createdAt: { $gt: req.params.createdAtFrom },
              };
            if (
              req.params.mobile !== NUMBER_FLAG &&
              req.params.createdAtTo !== TIME_FLAG
            )
              filter = {
                active: true,
                mobile: req.params.mobile,
                createdAt: { $lt: req.params.createdAtTo },
              };
      
            if (
              req.params.createdAtFrom !== TIME_FLAG &&
              req.params.createdAtTo !== TIME_FLAG
            )
              filter = {
                $and: [
                  { active: true },
                  { createdAt: { $gt: req.params.createdAtFrom } },
                  { createdAt: { $lt: req.params.createdAtTo } },
                ],
              };
      
            if (
              req.params.mobile !== NUMBER_FLAG &&
              req.params.createdAtFrom !== TIME_FLAG &&
              req.params.createdAtTo !== TIME_FLAG
            )
              filter = {
                $and: [
                  { active: true },
                  { user: req.decodedData.user_employer },
                  { mobile: req.params.mobile },
                  { createdAt: { $gt: req.params.createdAtFrom } },
                  { createdAt: { $lt: req.params.createdAtTo } },
                ],
              };
      
            let customers = await this.model.Customer.find(filter).sort({
              createdAt: -1,
            });
      
            let params = [];
            for (let index = 0; index < customers.length; index++) {
              let param = {
                active: true,
                family: customers[index].family,
                mobile: customers[index].mobile || customers[index].phoneNumber,
                createdAt: customers[index].createdAt,
                failOrders: customers[index].failOrders,
                successfullOrders: customers[index].successfullOrders,
                lastBuy: "",
                total: 0,
              };
              params.push(param);
            }
      
            let orders = [];
            for (let index = 0; index < customers.length; index++) {
              for (let j = 1; j < customers[index].order.length; j++) {
                orders.push(customers[index].order[j]);
              }
            }
      
            filter = { _id: { $in: orders } };
            orders = await this.model.Order.find(filter, {
              _id: 1,
              updatedAt: 1,
              products: 1,
            });
      
            orders = orders.map((order) => {
              order.products = order.products.map(
                (product) => product.price * product.quantity
              );
              return order;
            });
      
            let orderInfo = [];
            for (let index = 0; index < customers.length; index++) {
              orderInfo = orders.filter((order) =>
                customers[index].order.includes(order._id)
              );
              if (orderInfo.length) {
                params[index].lastBuy = orderInfo[orderInfo.length - 1].updatedAt;
                params[index].order = orderInfo.length;
                let totalOrders = orderInfo.map((order) =>
                  order.products.reduce((a, b) => parseInt(a) + parseInt(b), 0)
                );
                params[index].total = totalOrders.reduce(
                  (a, b) => parseInt(a) + parseInt(b),
                  0
                );
              }
            }
            //filtering family, totalFrom and totalTo
            if (req.params.family !== STRING_FLAG)
              params = params.filter((param) => {
                let re = new RegExp(req.params.family, "i");
                let find = param.family.search(re);
                return find !== -1;
              });
      
            if (req.params.totalFrom !== NUMBER_FLAG)
              params = params.filter((param) => {
                if (param.total) return param.total >= req.params.totalFrom;
              });
      
            if (req.params.totalTo !== NUMBER_FLAG)
              params = params.filter((param) => {
                if (param.total) return param.total <= req.params.totalTo;
              });
      
            //filtering lastBuy from, lastBuyTo, orderFrom, and orderTo
            if (req.params.lastBuyFrom !== TIME_FLAG)
              params = params.filter((param) => {
                return param.lastBuy.toISOString() >= req.params.lastBuyFrom;
              });
            if (req.params.lastBuyTo !== TIME_FLAG)
              params = params.filter((param) => {
                return (
                  param.lastBuy.toISOString() <= req.params.lastBuyTo.toISOString()
                );
              });
            if (req.params.orderFrom !== NUMBER_FLAG)
              params = params.filter((param) => {
                return param.order >= req.params.orderFrom;
              });
            if (req.params.orderTo !== NUMBER_FLAG)
              params = params.filter((param) => {
                return param.order <= req.params.orderTo;
              });
      
            res.json({
              success: true,
              message: "اطلاعات مشتریان با موفقیت ارسال شد",
              data: params,
            });
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

    async getCustomer(req, res) {
        try {

            req.checkParams('mobile', 'please enter customer mobile').notEmpty().isNumeric();
            if (this.showValidationErrors(req, res)) return;

            let filter = { active: true, mobile: req.params.mobile};

            let customer = await this.model.Customer.findOne(filter, { family:1, mobile:1, birthday:1 });
                if(!customer)
                    return res.json({ success : false, message : 'مشتری موجود نیست', data: {}})

            return res.json({ success : true, message : 'اطلاعات مشتری با موفقیت ارسال شد', data: customer})
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


