let appConfig = require('config');
const ErrorTransform = require(`${config.path.transforms}/error/Transform`);
const Order = require(`${config.path.models.root}/v1/Order`);
const Product = require(`${config.path.models.root}/v1/Product`);
const Customer = require(`${config.path.models.root}/v1/Customer`);
const AppInfo = require(`${config.path.models.root}/v1/AppInfo`);
const User = require(`${config.path.models.root}/v1/User`);
const Bill = require(`${config.path.models.root}/v1/Bill`);
const Reminder = require(`${config.path.models.root}/v1/Reminder`);
const Discount = require(`${config.path.models.root}/v1/Discount`);
const VerificationCode = require(`${config.path.models.root}/v1/VerificationCode`);
const Application = require(`${config.path.models.root}/v1/Application`);
const ProductTypes = require(`${config.path.models.root}/v1/ProductTypes`);
const UserTypes = require(`${config.path.models.root}/v1/UserTypes`);
const OrderStatusBar = require(`${config.path.models.root}/v1/OrderStatusBar`);
const Kitchen = require(`${config.path.models.root}/v1/Kitchen`);
const Settings = require(`${config.path.models.root}/v1/Settings`);
const Kavenegar = require('kavenegar');
const jwt = require("jsonwebtoken");



module.exports = class MainController {

    constructor() {
        this.model = { User, Order, Product, Customer, AppInfo, Bill , Reminder , Discount, VerificationCode , Application, ProductTypes, UserTypes, OrderStatusBar, Kitchen, Settings }
        this.transforms = { ErrorTransform };
    }

    showValidationErrors(req, res) {
        let errors = req.validationErrors();
        if (errors) {
            res.status(422).json({
                message: 'Unprocessable Entity',
                data: errors.map(error => {
                    return {
                        'field': error.param,
                        'message': error.msg
                    }
                }),
                success: false
            });
            return true;
        } else {
            return false;
        }
    }

    sendSms(phoneNumber, message) {
        var api = Kavenegar.KavenegarApi({
            apikey: appConfig.sms.KavenegarApi.apikey
        });

        api.Send({
            message: message,
            sender: appConfig.sms.KavenegarApi.sender,
            receptor: phoneNumber
        }, (response, status) => {
            console.log('send Sms ' + status+" message:"+message+" phonenumber:"+phoneNumber)
        });
    }


    sendSmsNegin(phone, message) {
        var param = {
            username: appConfig.sms.negin.user,
            password: appConfig.sms.negin.password,
            mobile: phone,
            message: message,
            type: "2"
        };

        axios.post(appConfig.sms.negin.password.host, param)
            .then(function (response) {
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    generateRandomNumber(min = 1000, max = 9999) {
        let i = (Math.random() * 32768) >>> 0;
        return (i % (min - max)) + min;
    }


    getTimeDiff(olderDate, newerDate, unit = 's') {

        // use a constant date (e.g. 2000-01-01) and the desired time to initialize two dates
        let date = new Date('2019-12-18T23:59:00.798Z');
        let exitDate = new Date('2019-12-18T00:01:00.798Z');


        // the following is to handle cases where the times are on the opposite side of
        // midnight e.g. when you want to get the difference between 9:00 PM and 5:00 AM
        if (newerDate < olderDate) {
            newerDate.setDate(newerDate.getDate() + 1);
        }

        let diff = Date.parse(newerDate) - Date.parse(olderDate); //return milliseconds

        switch (unit) {
            case 'h':
                return Math.floor(diff / 1000 / 60 / 60);
            case 'm':
                return Math.floor(diff / 1000 / 60);
            case 's':
                return Math.floor(diff / 1000);
            case 'ms':
                return diff;
        }
    }

    async mainRegister(req, res) {

            req.checkBody('password', 'please enter password').notEmpty().isString();
            req.checkBody('family', 'please enter family').notEmpty().isString();
            req.checkBody('mobile', 'please enter mobile').notEmpty().isNumeric();
            req.checkBody('code', 'please enter code').notEmpty().isNumeric();
            req.checkBody('scope', 'please enter user scope').notEmpty().isString();
            if (this.showValidationErrors(req, res)) return;

            //check scope
            let filter = { active: true, name: req.body.scope }
            let type = await this.model.UserTypes.findOne(filter, 'id')

            if(!type)
                return res.json({ success: true, message: "اسکوپ وارد شده موجود نیست", data: { status: false }  });


            //check verification code
            filter = { code: req.body.code, mobile: req.body.mobile }

            let veriCode = await this.model.VerificationCode.find(filter).sort({createdAt:-1}).limit(1)
            veriCode = veriCode[0]
            if(!veriCode)
                return res.json({ success: false, message: "کد تایید صحیح نمی باشد", data: { status: false } });
            // timeDiff on verification code unit
            let timeDiff = this.getTimeDiff(veriCode.createdAt.toISOString(), new Date().toISOString(), config.verificationCodeUnit)
            // check verification code valid duration
            if(timeDiff > config.verificationCodeDuration)
                return res.json({ success: false, message: "کد تایید منقضی شده است", data: { status: false } });

            //remove the code
            // await this.model.VerificationCode.findOneAndRemove({_id:veriCode._id})


            // save user in mongodb
            let params = {
                type: type._id,
                password: req.body.password,
                family: req.body.family,
                mobile: req.body.mobile
            }

            filter = { mobile: params.mobile };
            let user = await this.model.User.findOne(filter);

            if (user)
                return res.json({ success: true, message: "شماره موبایل قبلا برای حساب دیگری استفاده شده است", data: { status: false } });
            
            user = await this.model.User.create(params);

            //make a job application for employer
            params = {
                employee: user._id
            }
            await this.model.Application.create(params)

            //token
            let options = {
                expiresIn: config.idTokenExpire,
                algorithm: config.algorithm,
                issuer: config.issuer,
                audience: config.audience
            }
            let payload = {
                user_id: user._id,
                user_active: user.active,
            }
            let idToken = jwt.sign(payload, config.secret, options )

            options = {
                expiresIn: config.accesssTokenExpire,
                algorithm: config.algorithm,
                issuer: config.issuer,
                audience: config.audience
            }

            payload = { scope : req.body.scope};

            let accessToken = jwt.sign(payload, config.secret, options)

            let data = { status: true, idToken, accessToken};
            
            return res.json({ success: true, message: "کاربر با موفقیت ثبت شد", data: data  });
       
    }

    async mainVerificationCode(req, res) {

            req.checkBody('mobile', 'please enter mobile').notEmpty().isNumeric();
            req.checkBody('scope', 'please enter user scope').notEmpty().isString();
            if (this.showValidationErrors(req, res)) return;

            //check scope
            let filter = { active: true, name: req.body.scope }
            let type = await this.model.UserTypes.findOne(filter, 'id')

            if(!type)
                return res.json({ success: true, message: "اسکوپ وارد شده موجود نیست", data: { status: false }  });

            filter = { active: true, type: type._id, mobile: req.body.mobile }
            let user = await this.model.User.findOne(filter)

            if(!user)
                return res.json({ success: true, message: "کاربری با این دسترسی موجود نیست", data: { status: false }  });

            // save in mongodb
            filter = { mobile: req.body.mobile };

            //code generation
            let code;

            //check if the last code is still valid
            let lastCode = await this.model.VerificationCode.find(filter).sort({createdAt:-1}).limit(1)
            lastCode = lastCode[0]
            if(lastCode){
                // timeDiff on verification code unit
                let timeDiff = this.getTimeDiff(lastCode.createdAt, new Date().toISOString(), config.verificationCodeUnit)
                // check verification code valid duration
                if(timeDiff < config.verificationCodeDuration){
                    code = lastCode.code
                    this.sendSms(req.body.mobile, config.verificationCodeText + code)
                    return res.json({ success: true, message: "کد تاییدیه به شماره موبایل داده شده ، با موفقیت فرستاده شد", data: { status: true }});
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


            return res.json({ success: true, message: "کد تاییدیه به شماره موبایل داده شده ، با موفقیت فرستاده شد", data: { status: true } });
    }

    async sendVerificationCode(req, res) {

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

    async mainLogin(req, res) {

        req.checkBody('mobile', 'please enter mobile').notEmpty().isNumeric();
        req.checkBody('code', 'please enter code').notEmpty().isNumeric();
        req.checkBody('scope', 'please enter user scope').notEmpty().isString();
        if (this.showValidationErrors(req, res)) return;

        //verification code
        let filter = { code: req.body.code, mobile: req.body.mobile }

        let veriCode = await this.model.VerificationCode.find(filter).sort({createdAt:-1}).limit(1)
        veriCode = veriCode[0]
        if(!veriCode)
            return res.json({ success: false, message: "کد تایید صحیح نمی باشد", data: { status: false } });
        // timeDiff on verification code unit
        let timeDiff = this.getTimeDiff(veriCode.createdAt.toISOString(), new Date().toISOString(), config.verificationCodeUnit)
        // check verification code valid duration
        if(timeDiff > config.verificationCodeDuration)
            return res.json({ success: false, message: "کد تایید منقضی شده است", data: { status: false } });

        //remove the code
        // await this.model.VerificationCode.findOneAndRemove({_id:veriCode._id})

        // check user
        filter = { active: true, mobile: req.body.mobile }
        let user = await this.model.User.findOne(filter).populate('type');
        if (!user){
            return res.json({ success: false, message: "کاربر در دسترس نمی باشد", data: { status: false } });
        }
        if (user.type.name !== req.body.scope){
            return res.json({ success: false, message: "کاربری با این دسترسی موجود نیست", data: { status: false } });
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

        payload = { scope : req.body.scope};

        let accessToken = jwt.sign(payload, config.secret, options)

        let data = { idToken, accessToken, status: true};

        return res.json({ success: true, message: "کاربر با موفقیت وارد شد", data: data });
    
    }

}