
const Controller = require(`${config.path.controllers.user}/Controller`);
const TAG = 'v1_Employee';


module.exports = new class EmployeeController extends Controller {

    async index(req, res) {
        return res.json({ success: true, message: "Employee v1" });

    }

    async addEmployee(req, res) {
        try {
            req.checkBody('usernameOrMobile', 'please enter username or mobile').notEmpty();
            if (this.showValidationErrors(req, res)) return;

            let filter = { $or: [{ username: req.body.usernameOrMobile }, { mobile: req.body.usernameOrMobile }]}
            let user = await this.model.User.findOne(filter)
            if(!user)
                return res.json({ success: false, message: 'کاربر موجود نمی باشد'})
            
            filter = {_id: user._id}
            let update = { employer: req.decodedData.user_id }
            await this.model.User.findOneAndUpdate(filter, update)
            update = { $addToSet: { employee: user._id}}
            await this.model.User.findByIdAndUpdate(req.decodedData.user_id, update)

            return res.json({ success: true, message: 'کاربر با موفقیت اضافه شد'})
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('addEmployee')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }


        async getEmployees(req, res) {
            try {

                let filter = { active: true, employer: req.decodedData.user_id }
                let employees = await this.model.User.find(filter, { family: 1, mobile: 1, permission: 1 })

                employees.map(emp => emp._id.toString() !== req.decodedData.user_id)

                return res.json({ success: true, message: "کارمندان با موفقیت فرستاده شدند", data: employees})
                
            }
            catch (err) {
                let handelError = new this.transforms.ErrorTransform(err)
                    .parent(this.controllerTag)
                    .class(TAG)
                    .method('getEmployees')
                    .inputParams(req.body)
                    .call();
    
                if (!res.headersSent) return res.status(500).json(handelError);
            }
        }

}


