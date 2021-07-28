var seeder = require('mongoose-seed');
 
// Connect to MongoDB via Mongoose
seeder.connect('mongodb://172.16.2.215/food', function() {
 
  // Load Mongoose models
  seeder.loadModels([
    './../models/v1/AppInfo.js',
    './../models/v1/Order.js',
    './../models/v1/OrderStatusBar.js'
  ]);
 
  // Clear specified collections
  seeder.clearModels(['AppInfo'], function() {
 
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function() {
      seeder.disconnect();
    });
 
  });
});
 
// Data array containing seed data - documents organized by Model
var data = [
    {
        'model': 'AppInfo',
        'documents': [
            { 
                name: 'delivery',
                os: 'Android',
                latestVersion: '1',
                update: false,
                isForce: false,
                updateUrl: ''
            },
            {
                name: 'kitchen',
                os: 'Android',
                latestVersion: '1',
                update: false,
                isForce: false,
                updateUrl: ''
            }
        ]
    },
    {
      'model': 'OrderStatusBar',
      'documents': [
        {
          'name': 'active',
          'description': 'orders ordered by customer'
        },
        {
          'name': 'customerCanceled',
          'description': 'orders caceled by customer'
        },
        {
          'name': 'ready',
          'description': 'cooked orders'
        },
        {
          'name': 'pending',
          'description': 'ready orders waiting to deliver'
        },
        {
          'name': 'deliveryAccepted',
          'description': 'orders that have been accepted by delivary man'
        },
        {
          'name': 'deliveryCanceled',
          'description': 'orders canceled by delivery'
        },
        {
          'name': 'finished',
          'description': 'orders that have delivered to customer'
        }
      ]
    }
];
