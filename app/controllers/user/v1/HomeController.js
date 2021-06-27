
const Controller = require(`${config.path.controllers.user}/Controller`);
const TAG = 'v1_Home';
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");


module.exports = new class HomeController extends Controller {

    async index(req, res) {
        return res.json({ success: true, message: "Home v1" });

    }

    async register(req, res) {
        try {
            req.checkBody('password', 'please enter password').notEmpty();
            req.checkBody('family', 'please enter family').notEmpty().isString();
            req.checkBody('email', 'please enter email').notEmpty().isEmail();
            req.checkBody('mobile', 'please enter mobile').notEmpty().isNumeric();
            req.checkBody('company', 'please enter company name').notEmpty().isString();
            if (this.showValidationErrors(req, res)) return;

            const STRING_FLAG = " ";
            const EMAIL_FLAG = "a@a.com";

            // save in mongodb
            let params = {
                password: req.body.password,
                family: req.body.family,
                mobile: req.body.mobile
            }

            if(req.body.company !== STRING_FLAG)
                params.company = req.body.company
            if(req.body.email !== EMAIL_FLAG)
                params.email = req.body.email
            
            let filter = { mobile: params.mobile };
            let user = await this.model.User.findOne(filter);

            if (user)
                return res.json({ success: false, message: "شماره موبایل قبلا برای حساب دیگری استفاده شده است" });

            await this.model.User.create(params);

            return res.json({ success: true, message: "کاربر با موفقیت ثبت شد" });
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('register')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

    async getUser(req, res) {
        try {
            let user = await this.model.User.findById(req.decodedData.user_id)

            let params = {
                active: user.active,
                name: user.name,
                family: user.family,
                username: user.username,
                password: user.password,
                email: user.email,
                mobile: user.mobile,
                company: user.company
            }

            if(user._id.toString() != user.employer.toString())
                params.employer = await this.model.User.findById(user.employer, { name: 1, family: 1, username: 1 })
            else 
                params.employer = { name: user.name, family: user.family, username: user.username };

            user.employee.splice(0, 1)
            let filter = { _id: user.employee  }
            params.employee = await this.model.User.find(filter, { name: 1, family: 1, username: 1 })

            return res.json({ success : true, message : 'اطلاعات کاربر با موفقیت ارسال شد', data : params})
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('getUser')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

    async appInfo(req, res) {
        try {
            req.checkBody('versionCode', 'please enter versionCode').notEmpty();
            req.checkBody('os', 'please enter os').notEmpty();

            if (this.showValidationErrors(req, res)) return;

            if(!req.decodedData.user_active)
                return res.json({ success: false, message: "کاربر بلاک می باشد", data: {}})

            // save in mongodb
            let filter = { os: req.body.os, version: req.body.versionCode}
            let updateInfo = await this.model.AppInfo.find(filter).sort({createdAt:-1}).limit(1)
            updateInfo = updateInfo[0]
            if(!updateInfo)
                return res.json({ success: true, message: "اطلاعات نرم افزار فرستاده شد", data: {} });

            let data = { active: true, update: updateInfo.update, isForce: updateInfo.isForce, updateUrl: updateInfo.updateUrl }
            return res.json({ success: true, message: "اطلاعات نرم افزار فرستاده شد", data: data });
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('appInfo')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }


    async login(req, res) {
        try {
            req.checkBody('mobileOrEmail', 'please enter mobile or email').notEmpty();
            req.checkBody('password', 'please enter password').notEmpty();
            if (this.showValidationErrors(req, res)) return;

            // save in mongodb
            let filter = { $or: [{ mobile: req.body.mobileOrEmail }, { email: req.body.mobileOrEmail }]};
            let user = await this.model.User.findOne(filter);

            if (!(user && user.active))
                return res.json({ success: false, message: "کاربر در دسترس نمی باشد", data: {} });


            let status = await bcrypt.compare(req.body.password, user.password)
            if (!status)
                return res.json({ success: false, message: "رمزعبور صحیح نمی باشد", data: {} });

            let options = {
                expiresIn: config.idTokenExpire,
                algorithm: config.algorithm,
                issuer: config.issuer,
                audience: config.audience
            }
            let payload = {
                user_id: user._id,
                user_active: user.active,
                user_employer: user.employer
            }
            let idToken = jwt.sign(payload, config.secret, options )
            console.log("test")
            options = {
                expiresIn: config.accesssTokenExpire,
                algorithm: config.algorithm,
                issuer: config.issuer,
                audience: config.audience
            }

            payload = { scope : config.userScope};

            let accessToken = jwt.sign(payload, config.secret, options)

            let data = { idToken, accessToken};

            return res.json({ success: true, message: "کاربر با موفقیت وارد شد", data: data });
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('login')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

}


