
const Controller = require(`${config.path.controllers.user}/Controller`);
const TAG = 'v1_Reminder';


module.exports = new class ReminderController extends Controller {

    async index(req, res) {
        return res.json({ success: true, message: "Reminder v1" });

    }

    async getReminders(req, res) {
        try {
            
            let filter = { active: true, user: req.decodedData.user_employer }
            let reminders = await this.model.Reminder.find(filter)

            let params = [];
            for (let index = 0; index < reminders.length; index++) {
                let param = {
                    date: reminders[index].date,
                    customer: reminders[index].customer,
                    order: reminders[index].order
                }     
                params.push(param)           
            }

            let customers = [];
            let orders = [];
            for (let index = 0; index < reminders.length; index++) {
                customers.push(reminders[index].customer);
                orders.push(reminders[index].order)
            }

            filter = { _id: { $in: customers } }
            customers = await this.model.Customer.find(filter, { _id: 1, family: 1, mobile: 1 })

            filter = { _id: { $in: orders } }
            orders = await this.model.Order.find(filter)

            let customerInfo;
            let orderInfo;
            for (let index = 0; index < reminders.length; index++) {
                customerInfo = customers.find(user => user._id.toString() == reminders[index].customer)
                params[index].customer = customerInfo;
                orderInfo = orders.find(order => order._id.toString() == reminders[index].order)
                params[index].order = orderInfo;
            }

            return res.json({ success: true, message: 'لیست یادآوری با موفقیت ارسال شد', data: params })
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('getReminders')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

}


