var seeder = require('mongoose-seed');
 
// Connect to MongoDB via Mongoose
seeder.connect('mongodb://172.16.2.215/food', function() {
 
  // Load Mongoose models
  seeder.loadModels([
    './../models/v1/Settings.js'
  ]);
 
  // Clear specified collections
  seeder.clearModels(['Settings'], function() {
 
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function() {
      seeder.disconnect();
    });
 
  });
});
 
// Data array containing seed data - documents organized by Model
var data = [
  {
    'model': 'Settings',
    'documents': [
      { 
        'delivery': {
          'acceptCount': 1,
          'deliveryCost': 5000
        },
        'order': { 
          'cookTime': 8,
          'confirmTime': 1,
          'isPayNecessary': false,
          'addOrderSms': { 'text': 'سفارش شما با موفقیت ثبت شد.', 'status': true },
          'successfullPaymentSms': { 'text': 'سفارش شما با موفقیت پرداخت شد.', 'status': true },
          'inProcessOrderSms': { 'text': 'سفارش شما در حال آماده سازی است.', 'status': true },
          'inCookingOrderSms': { 'text': 'سفارش شما در حال پخت می باشد.', 'status': true },
          'inServiceOrderSms': { 'text': 'سفارش شما در حال ارسال است.', 'status': true },
          'finishedOrderSms': { 'text': 'سفارش شما به مقصد رسید. از اعتماد شما به هپی پیتزا ممنونیم. منتظر سفارش های بعدی شما هستیم.', 'status': true }
        },
        'companyName': 'هپی پیتزا'
      }
    ]
  }
];
