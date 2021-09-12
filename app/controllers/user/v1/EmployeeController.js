
const Controller = require(`${config.path.controllers.user}/Controller`);
const TAG = 'v1_Employee';


module.exports = new class EmployeeController extends Controller {

    async index(req, res) {
        return res.json({ success: true, message: "Employee v1" });

    }

    
    async changeEmployeePermission(req, res) {
        try {

            req.checkBody('_id', 'please enter employee id').notEmpty().isString();
            req.checkBody('permissions', 'please enter employee permissions').notEmpty();
            req.checkBody('permissions.addOrder', 'please enter addOrder status').notEmpty().isBoolean();
            req.checkBody('permissions.getOrders', 'please enter getOrders status').notEmpty().isBoolean();
            req.checkBody('permissions.reminder', 'please enter reminder status').notEmpty().isBoolean();
            req.checkBody('permissions.getProducts', 'please enter getProducts status').notEmpty().isBoolean();
            req.checkBody('permissions.finance', 'please enter finance status').notEmpty().isBoolean();
            req.checkBody('permissions.getCustomers', 'please enter getCustomers status').notEmpty().isBoolean();
            req.checkBody('permissions.getEmployees', 'please enter getEmployees status').notEmpty().isBoolean();
            req.checkBody('permissions.getDiscounts', 'please enter getDiscounts status').notEmpty().isBoolean();
            if (this.showValidationErrors(req, res)) return;

            let filter = { _id: req.body._id }
            let employee = await this.model.User.findOne(filter)

            if(!employee)
                return res.json({ success: false, message: "کاربر وارد شده موجود نمی باشد" })

            employee.permission = req.body.permissions
            await employee.save()  

            return res.json({ success: true, message: "دسترسی های کارمند خواسته شده با موفقیت تغییر پیدا کرد" })
            
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('changeEmployeePermission')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }


    async getEmployees(req, res) {
        try {


            let filter = { active: true , _id: { $ne: req.decodedData.user_id }, hired: true}
            let employees = await this.model.User.find(filter, { family: 1, mobile: 1, permission: 1 })
            
            return res.json({ success: true, message: "کارمندان با موفقیت فرستاده شدند", data: employees})
            
        }catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('getEmployees')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
        
    }

    async getPermission(req, res) {
        try {

            let filter = { _id: req.decodedData.user_id }
            let permission = await this.model.User.findOne(filter, { permission: 1, type: 1 })

            let data;
            //if the user is employee send the application status of it
            let application = [];
            if(req.decodedData.user_type == config.employee){
                filter = { active: true, employee: req.decodedData.user_id }
                application = await this.model.Application.find(filter, 'status employer').sort({createdAt:-1}).limit(1)
                let employer = await this.model.User.findOne({active: true, _id: application[0].employer}, { family: 1, mobile: 1})
                if(!employer)
                    return res.json({ success: false, message: "کارفرما موجود نیست", data: {}})

                data = {
                    permission: permission.permission, 
                    type: permission.type, 
                    application: application[0].status,
                    applicationId: application[0]._id
                }
                if(application[0].status !== 3){
                    data.employer = {
                        family: employer.family,
                        mobile: employer.mobile
                    }
                }


            }else {
                data = {
                    permission: permission.permission, 
                    type: permission.type, 
                }
            }

            return res.json({ success: true, message: "با موفقیت انجام شد", data: data})
            
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('getPermission')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

    async removeEmployee(req, res) {
        try {
            req.checkBody('_id', 'please enter employee id').notEmpty().isString();
            if (this.showValidationErrors(req, res)) return;

            let filter = { _id: req.body._id }
            let employee = await this.model.User.findOne(filter)

            if(!employee)
                return res.json({ success: false, message: "کاربر وارد شده موجود نمی باشد" })

            employee.hired = false
            employee.permission = [];
            for(let i = 0; i< config.permissionCount; i++) {
                employee.permission.push({ no: i + 1, status: true })
            }
            await employee.save()  

            return res.json({ success: true, message: "کارمند مدنظر با موفقیت حذف شد" })
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


    async getApplications(req, res) {
        try {

            let filter = { active: true, status: 1 }
            let applications = await this.model.Application.find(filter, {__v: 0}).populate('employee', {family: 1, _id: 1, mobile: 1}).lean()

            return res.json({ success: true, message: "ارسال درخواست ها با موفقیت انجام شد", data: applications})
            
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('getApplications')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }


    async getApplication(req, res) {
        try {

            let filter = { active: true, employee: req.decodedData.user_employer, status: 1 }
            let applications = await this.model.Application.find(filter)

            let params = [];
            for (let index = 0; index < applications.length; index++) {
                let param = {
                    id: applications[index]._id,
                    active: applications[index].active,
                    status: applications[index].status,
                    createdAt: applications[index].createdAt,
                    updatedAt: applications[index].updatedAt,
                    employee: applications[index].employee,
                    employer: applications[index].employer
                }     
                params.push(param)           
            }

            let employees = []
            for (let index = 0; index < applications.length; index++) {
                employees.push(applications[index].employee)
            }

            filter = { _id: { $in: employees } }
            employees = await this.model.User.find(filter, { _id: 1, family: 1, mobile: 1 })

            let employeeInfo;
            for (let index = 0; index < applications.length; index++) {
                employeeInfo = employees.find(user => user._id.toString() == applications[index].employee)
                params[index].employee = employeeInfo;
            }


            return res.json({ success: true, message: "ارسال درخواست ها با موفقیت انجام شد", data: params})
            
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('getApplications')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

    async addApplication(req, res) {
        try {

            req.checkBody('mobile', 'please set employer mobile').notEmpty();
            if (this.showValidationErrors(req, res)) return;

            let filter = { active : true, mobile: req.body.mobile, type: 1}
            let employer = await this.model.User.findOne(filter, { id: 1 })
            if(!employer)
                return res.json({ success: false, message: " کارفرمایی با این شماره یافت نشد" });

            let params = {
                employer: employer._id,
                employee: req.decodedData.user_id
            }
            await this.model.Application.create(params)


            res.json({ success : true, message : 'درخواست با موفقیت اضافه شد'})
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('addApplication')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }
     
    async editApplication(req, res) {
        try {
            console.log(req.body)
            req.checkBody('applicationId', 'please set application id').notEmpty();
            req.checkBody('status', 'please set application status').notEmpty().isInt({min: 2, max: 3});
            if (this.showValidationErrors(req, res)) return;

            let filter;
                filter = { active : true, _id: req.body.applicationId }
            let application = await this.model.Application.findOne(filter)

            if(!application)
                return res.json({ success : false, message : 'درخواستی موجود نیست'})

            application.status = req.body.status
            await application.save()

            //if the employer calles this api and hires the emplyee
            if(req.body.status === 2){
                filter = { active: true, _id: application.employee }
                let user = await this.model.User.findOne(filter)
                if(!user)
                    return res.json({ success: false, message: 'کاربر موجود نمی باشد'})
                
                user.hired = true
                await user.save()
                
            }
            
            res.json({ success : true, message : 'درخواست با موفقیت ویرایش شد'})
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('editApplication')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

}


