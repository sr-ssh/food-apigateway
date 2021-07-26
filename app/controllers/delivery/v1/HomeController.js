
const Controller = require(`${config.path.controllers.user}/Controller`);
const TAG = 'v1_Home';
const jwt = require("jsonwebtoken");


module.exports = new class HomeController extends Controller {

    async index(req, res) {
        return res.json({ success: true, message: "Home v1" });

    }

    async register(req, res) {
        try {
            this.mainRegister(req, res)
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

    async verificationCode(req, res) {
        try {
            req.checkBody('mobile', 'please enter mobile').notEmpty();
            if (this.showValidationErrors(req, res)) return;

            // save in mongodb
            let filter = { mobile: req.body.mobile };

            //code generation
            let code;

            //check if the last code is steel valid
            let lastCode = await this.model.VerificationCode.find(filter).sort({createdAt:-1}).limit(1)
            lastCode = lastCode[0]
            if(lastCode){
                // timeDiff on verification code unit
                let timeDiff = this.getTimeDiff(lastCode.createdAt, new Date().toISOString(), config.verificationCodeUnit)
                // check verification code valid duration
                if(timeDiff < config.verificationCodeDuration){
                    code = lastCode.code
                    this.sendSms(req.body.mobile, config.verificationCodeText + code)
                    return res.json({ success: true, message: "کد تاییدیه به شماره موبایل داده شده ، با موفقیت فرستاده شد" });
                }

            }

            //generate new code

            //generate random number
            code = this.generateRandomNumber();
            this.sendSms(req.body.mobile, config.verificationCodeText + code)

            //save in mongo
            let params = {
                mobile: req.body.mobile,
                code: code
            }

            await this.model.VerificationCode.create(params);


            return res.json({ success: true, message: "کد تاییدیه به شماره موبایل داده شده ، با موفقیت فرستاده شد" });
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('verificationCode')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }


    async login(req, res) {
        try {
            req.checkBody('mobile', 'please enter mobile').notEmpty().isNumeric();
            req.checkBody('code', 'please enter code').notEmpty().isNumeric();
            if (this.showValidationErrors(req, res)) return;

            //verification code
            let filter = { code: req.body.code, mobile: req.body.mobile }

            let veriCode = await this.model.VerificationCode.find(filter).sort({createdAt:-1}).limit(1)
            veriCode = veriCode[0]
            if(!veriCode)
                return res.json({ success: false, message: "کد تایید صحیح نمی باشد", data: {} });
            // timeDiff on verification code unit
            let timeDiff = this.getTimeDiff(veriCode.createdAt.toISOString(), new Date().toISOString(), config.verificationCodeUnit)
            // check verification code valid duration
            if(timeDiff > config.verificationCodeDuration)
                return res.json({ success: false, message: "کد تایید منقضی شده است", data: {} });

            //remove the code
            // await this.model.VerificationCode.findOneAndRemove({_id:veriCode._id})

            // check user
            filter = { active: true, mobile: req.body.mobile }
            let user = await this.model.User.findOne(filter);
            if (!user){
                return res.json({ success: false, message: "کاربر در دسترس نمی باشد", data: {} });
            }

            let options = {
                expiresIn: config.idTokenExpire,
                algorithm: config.algorithm,
                issuer: config.issuer,
                audience: config.audience
            }
            let payload = {
                user_id: user._id,
                user_active: user.active,
                family: user.family
            }
            let idToken = jwt.sign(payload, config.secret, options )

            options = {
                expiresIn: config.accesssTokenExpire,
                algorithm: config.algorithm,
                issuer: config.issuer,
                audience: config.audience
            }

            payload = { scope : config.deliveryScope};

            let accessToken = jwt.sign(payload, config.secret, options)

            let data = { idToken, accessToken};

            return res.json({ success: true, message: "مشتری با موفقیت وارد شد", data: data });
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


    async appInfo(req, res) {
        try {
            req.checkBody('versionCode', 'please enter versionCode').notEmpty();
            req.checkBody('os', 'please enter os').notEmpty();

            if (this.showValidationErrors(req, res)) return;

            if(!req.decodedData.user_active)
                return res.json({ success: true, message: "کاربر بلاک می باشد", data: { isBlock: true }})

            // save in mongodb
            let filter = { active: true, name: config.deliveryApp, os: req.body.os, latestVersion: req.body.versionCode}
            let updateInfo = await this.model.AppInfo.findOne(filter).sort({createdAt:-1}).limit(1)
            if(!updateInfo)
                return res.json({ success: true, message: "اطلاعات نرم افزار فرستاده شد", data: {} });

            let data = { 
                status: true, 
                update: updateInfo.update, 
                isForce: updateInfo.isForce, 
                updateUrl: updateInfo.updateUrl,
                pushId: config.deliveryPushId,
                pushToken: config.deliveryPushToken,
                family: req.decodedData.family,
                sipNumber: 0,
                sipServer: 0,
                sipPassword: 0
            }
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

}


