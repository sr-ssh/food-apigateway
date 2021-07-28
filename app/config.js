const path = require('path')

module.exports = {
    secret: 'kfnkmFVTGKJd345mohsenp69^&$#$%ijdfm(*&reihaneh^%$#dfvawdqacfdCVBNM<POIUY',
    salt: 10,
    audience: "audience",
    algorithm: "HS256",
    issuer: "issuer",
    accesssTokenExpire: "300 days" ,
    idTokenExpire: "250 days",
    userScope: "user",
    customerScope: "customer",
    kitchenScope: "kitchen",
    deliveryScope: "delivery",
    operatorScope: "operator",
    permissionCount: "8",
    deliveryPushId: 0,
    deliveryPushToken: 0,
    kitchenPushId: 0,
    kitchenPushToken: 0,
    addOrderSms: "سفارش شما با موفقیت ثبت شد. از اینکه مارا انتخاب کرده اید متشکریم",
    deliveryAcknowledgeSms: "سفارش شما به راننده تحویل داده شد",
    verificationCodeDuration: 30,
    verificationCodeUnit: "m",
    verificationCodeText: "کد فعال سازی شما : ",
    employee: 2,
    employer: 1,
    operatorApp: "operatorApp",
    customerApp: "customerApp",
    kitchenApp: "kitchenApp",
    deliveryApp: "deliveryApp",
    publicRoute: [
        '/api/user/v1/login', 
        '/api/user/v1/', 
        '/api/user/v1/verificationcode',
        '/api/customer/v1/login', 
        '/api/customer/v1/verificationcode',
        '/api/kitchen/v1/register', 
        '/api/kitchen/v1/login', 
        '/api/kitchen/v1/verificationcode',
        '/api/kitchen/v1/login/verificationcode',
        '/api/delivery/v1/register', 
        '/api/delivery/v1/login', 
        '/api/delivery/v1/verificationcode',
        '/api/operator/v1/login/verificationcode',
        '/api/operator/v1/register',
        '/api/operator/v1/verificationcode',
        '/api/operator/v1/login'
    ],
    path: {
        controllers: {
            root: path.resolve('./app/controllers'),
            user: path.resolve('./app/controllers/user'),
            customer: path.resolve('./app/controllers/customer'),
            kitchen: path.resolve('./app/controllers/kitchen'),
            delivery: path.resolve('./app/controllers/delivery'),
            operator: path.resolve('./app/controllers/operator')
        },
        models: {
            root: path.resolve('./app/models/'),
            error: path.resolve('./app/models/error')
        },
        transforms: path.resolve('./app/transforms'),
        mainController: path.resolve('./app/controllers/MainController'),
        instance: path.resolve('./app/instance')
    }
} 