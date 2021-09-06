var seeder = require('mongoose-seed');
 
// Connect to MongoDB via Mongoose
seeder.connect('mongodb://crm-x.ir:2714/food', function() {
 
  // Load Mongoose models
  seeder.loadModels([
    './../models/v1/OrderStatusBar.js',
  ]);
 
  // Clear specified collections
  seeder.clearModels(['OrderStatusBar'], function() {
 
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function() {
      seeder.disconnect();
    });
 
  });
});
 
// Data array containing seed data - documents organized by Model
var data = [
    {
      'model': 'OrderStatusBar',
      'documents': [
        {
          'name': 'در صف انتظار',
          'status': 0,
          'description': 'سفارش های که منتظر قبول اشپز هستند'
        },
        {
            'name': 'در حال اماده سازی',
            'status': 5,
            'description': 'سفارش هایی که دارند اماده می شوند و هنوز پخته نشده اند'
        },
        {
          'name': 'در حال پخت',
          'status': 2,
          'description': 'cooked orders'
        },
        {
          'name': 'در حال ارسال',
          'status': 3,
          'description': 'orders that have been accepted by delivary man'
        },
        {
          'name': 'لغو شده',
          'status': 1,
          'description': 'orders canceled'
        },
        {
          'name': 'تمام شده',
          'status': 4,
          'description': 'orders that have delivered to customer'
        },
        {
          'name': 'در انتظار پرداخت',
          'status': 6,
          'description': 'سفارشاتی که منتظر پرداختند تا به مرحله بعد برسند'
        }
      ]
    }
];
