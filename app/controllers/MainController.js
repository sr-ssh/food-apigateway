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



module.exports = class MainController {

    constructor() {
        this.model = { User, Order, Product, Customer, AppInfo, Bill , Reminder , Discount }
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

}