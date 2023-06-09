const path = require('path')

module.exports = {
    secret: 'kfnkmFVTGKJd345mohsenp69^&$#$%ijdfm(*&reihaneh^%$#dfvawdqacfdCVBNM<POIUY',
    salt: 10,
    audience: "audience",
    algorithm: "HS256",
    issuer: "issuer",
    accessTokenExpire: "300 days" ,
    idTokenExpire: "250 days",
    userScope: "manager",
    customerScope: "customer",
    kitchenScope: "cook",
    deliveryScope: "deliveryMan",
    operatorScope: "operator",
    permissionCount: "8",
    deliveryPushId: 13,
    deliveryPushToken: "pizzaDeliveryAABMohsenX",
    kitchenPushId: 14,
    kitchenPushToken: "pizzaChefAABMohsenX",
    operatorPushId: 12,
    operatorPushToken: "pizzaOperatorAABMohsenX",
    operatorSipNumber: 423,
    operatorSipServer: "sbc.turbotaxi.ir:4060",
    operatorSipPassword: 423,
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
    activeOrders: "در صف انتظار",
    activeOrdersStatus: 0,
    readyOrders: "در حال پخت",
    canceledOrder: 1,
    acceptDeliveryOrder: 3,
    finishedOrder: 4,
    inCookingOrder: 2,
    beforeCookOrder: 5,
    inPayOrdersStatus: 6,
    cookTimeUnit: "m",
    confirmTimeUnit: "m",
    tax: 0.09,
    debit: "debit",
    credit: "credit",
    complaintCreated: 0,
    customerOrderIntervalUnit: "m",
    customerMaxOrderInterval: 40,
    deliveryNeshanAPIKey: "service.5Unf1AsEuC9O4ftR0gLvFXZ5nDgUSg5sUghEd9Xu",
    payCallBackUrl: "http://www.happypizza.ir:3010/api/customer/v1/pay",
    payRedirectSuccess: "http://www.happypizza.ir/pay/success",
    payRedirectFail: "http://www.happypizza.ir/pay/fail",
    menuLink: "http://happypizza.ir/menu.html",
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
        '/api/delivery/v1/login/verificationcode',
        '/api/operator/v1/login/verificationcode',
        '/api/operator/v1/register',
        '/api/operator/v1/verificationcode',
        '/api/operator/v1/login',
        '/api/customer/v1/pay',
        '/api/customer/v1/order/product',
        '/api/customer/v1/order/product/type',
        '/api/customer/v1/order/factor'
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