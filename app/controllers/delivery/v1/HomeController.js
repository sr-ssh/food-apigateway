
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
            this.sendVerificationCode(req, res)
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


    async loginVerificationCode(req, res) {
        try {
            this.mainVerificationCode(req, res)
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('loginVerificationCode')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

    async login(req, res) {
        try {
            this.mainLogin(req, res)
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

            if (!req.decodedData.user_active)
                return res.json({ success: true, message: "کاربر بلاک می باشد", data: { isBlock: true } })

            // save in mongodb
            let filter = { active: true, name: config.deliveryApp, os: req.body.os, latestVersion: req.body.versionCode }
            let updateInfo = await this.model.AppInfo.findOne(filter).sort({ createdAt: -1 }).limit(1)
            if (!updateInfo)
                return res.json({ success: true, message: "اطلاعات نرم افزار فرستاده شد", data: {} });

            filter = { active: true, _id: req.decodedData.user_id }
            let user = await this.model.User.findOne(filter)

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
                sipPassword: 0,
                neshanAPIKey: config.deliveryNeshanAPIKey,
                userCode: req.decodedData.user_id,
                hired: user.hired,
                bankInfo: user.account.accountNumber && user.account.accountNumber !== "" ? true : false
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


