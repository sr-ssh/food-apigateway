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
    permissionCount: "8",
    addOrderSms: "سفارش شما با موفقیت ثبت شد. از اینکه مارا انتخاب کرده اید متشکریم",
    deliveryAcknowledgeSms: "سفارش شما به راننده تحویل داده شد",
    verificationCodeDuration: 30,
    verificationCodeUnit: "m",
    verificationCodeText: "کد فعال سازی شما : ",
    employee: 2,
    employer: 1,
    operatorApp: "operatorApp",
    customerApp: "customerApp",
    cookApp: "cookApp",
    deliveryApp: "deliveryApp",
    publicRoute: [
        '/api/user/v1/login', 
        '/api/user/v1/', 
        '/api/user/v1/verificationcode',
        '/api/customer/v1/login', 
        '/api/customer/v1/verificationcode'
        ],
    path: {
        controllers: {
            root: path.resolve('./app/controllers'),
            user: path.resolve('./app/controllers/user'),
            customer: path.resolve('./app/controllers/customer'),
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