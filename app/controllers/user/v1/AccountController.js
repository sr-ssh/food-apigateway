
const Controller = require(`${config.path.controllers.user}/Controller`);
const TAG = 'v1_account';
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");


module.exports = new class AccountController extends Controller {

    async index(req, res) {
        return res.json({ success: true, message: "Account v1" });

    }
    
    async getUserAccount(req, res) {
        try {
            let user = await this.model.User.findById(req.decodedData.user_id)

            let params = {
                active: user.active,
                id: user._id,
                family: user.family,
                password: user.password,
                email: user.email,
                mobile: user.mobile,
                address: user.address,
                type: user.type
            }

            if(user.type == config.employer)
                params.company = user.company

            if(user._id.toString() != user.employer.toString())
                params.employer = await this.model.User.findById(user.employer, { family: 1, company: 1 })
            

            return res.json({ success : true, message : 'اطلاعات کاربر با موفقیت ارسال شد', data : params})
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('getUserAccount')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

    async editUserAccount(req, res) {
        try {
            if(req.body.family)
                req.checkBody('family', 'please enter product id').notEmpty();
            else if(req.body.company)
                req.checkBody('company', 'please enter product id').notEmpty();
            else if(req.body.address)
                req.checkBody('address', 'please enter product id').notEmpty();
            else
                return res.json({ success : false, message : 'اطلاعات وارد شده صحیح نمی باشد' })

            if (this.showValidationErrors(req, res)) return;

            let user = await this.model.User.findById(req.decodedData.user_id)

            if(req.body.family)
                user.family = req.body.family
            else if(req.body.address)
                user.address = req.body.address
            else if(user.type == config.employer && req.body.company)
                user.company = req.body.company

            await user.save()

            return res.json({ success : true, message : 'اطلاعات کاربر با موفقیت ویرایش شد'})
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('editUserAccount')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

}


