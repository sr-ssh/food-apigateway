const Controller = require(`${config.path.controllers.user}/Controller`);
const TAG = 'v1_Finance';


module.exports = new class UserController extends Controller {

    async index(req, res) {
        return res.json({ success: true, message: "User v1" });

    }

    async getFinanceSummary(req, res) {
        try {
            let filter = { active: true, provider: req.decodedData.user_employer }
            let orders = await this.model.Order.find(filter)

            let products = orders.map(order => order.products);
            let income = products.map(products => products.map(product => product.sellingPrice));
            income = income.map(products => products.reduce((a, b) => parseInt(a) + parseInt(b), 0));

            let incomeSum = income.reduce((a, b) => parseInt(a) + parseInt(b), 0)

            filter = { active : true, user : req.decodedData.user_employer }
            let costs = await this.model.Bill.find(filter, { cost : 1 })
            costs = costs.map(cost => cost.cost);

            let costSum = costs.reduce((a, b) => parseInt(a) + parseInt(b), 0)

            let data = { income: incomeSum, bills: costSum }

            return res.json({ success : true, message : "مجموع درامد ها و مخارج با موفقیت ارسال شد", data : data })
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('getFinanceSummary')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

    async getBills(req, res) {
        try {
            let filter = { active : true, user : req.decodedData.user_employer }
            let costs = await this.model.Bill.find(filter, { user : 0 })
        
            return res.json({ success : true, message : "هزینه های جاری با موفقیت ارسال شد", data : costs })
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('getBills')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

    async addBill(req, res) {
        try {
            req.checkBody('name', 'please enter name').notEmpty();
            req.checkBody('cost', 'please enter cost').notEmpty();
            if (this.showValidationErrors(req, res)) return;

            let params = {
                name: req.body.name,
                cost: req.body.cost,
                user: req.decodedData.user_employer
            }
            await this.model.Bill.create(params)
        
            return res.json({ success : true, message : "هزینه جاری با موفقیت اضافه شد" })
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('addBill')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

}


