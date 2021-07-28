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
  seeder.clearModels(['AppInfo', 'Order', 'OrderStatusBar'], function() {
 
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
    },
    {
      'model': 'Order',
      'documents': [
        //active orders paid
        {
          'products': [
            {
              '_id': '610131e8f3f84b34e81a7354',
              'quantity': 1,
              'size': 'medium',
              'price': '25000'
            },
            {
              '_id': '610131e8f3f84b34e81a7355',
              'quantity': 1,
              'size': 'medium',
              'price': '75000'
            }
          ],
          'customer': '60fcfe176ea36757d055ffe7',
          'address': 'هاشمیه 21. پلاک 12',
          'GPS': {'type' : 'Point', 'coordinates' : [-122.5,37.7]},
          'status': '61013e73788fd41a201c5dd4',
          'paid': true,
          'deliveryCost': 5000
        },
        {
          'products': [
            {
              '_id': '610131e8f3f84b34e81a735a',
              'quantity': 1,
              'size': 'medium',
              'price': '25000'
            },
            {
              '_id': '610131e8f3f84b34e81a7355',
              'quantity': 2,
              'size': 'medium',
              'price': '75000'
            }
          ],
          'customer': '60fcfe176ea36757d055ffe7',
          'address': 'هاشمیه 21. پلاک 12',
          'GPS': {'type' : 'Point', 'coordinates' : [-122.5,37.7]},
          'status': '61013e73788fd41a201c5dd4',
          'paid': true,
          'deliveryCost': 5000
        },
        //ready orders
        {
          'products': [
            {
              '_id': '610131e8f3f84b34e81a7354',
              'quantity': 1,
              'size': 'medium',
              'price': '25000'
            },
            {
              '_id': '610131e8f3f84b34e81a7355',
              'quantity': 1,
              'size': 'medium',
              'price': '75000'
            }
          ],
          'customer': '60fcfe176ea36757d055ffe7',
          'address': 'هاشمیه 21. پلاک 12',
          'GPS': {'type' : 'Point', 'coordinates' : [-122.5,37.7]},
          'status': '610138e7084e5936e00f4b84',
          'paid': true,
          'deliveryCost': 5000
        },
        {
          'products': [
            {
              '_id': '610131e8f3f84b34e81a735a',
              'quantity': 1,
              'size': 'medium',
              'price': '25000'
            },
            {
              '_id': '610131e8f3f84b34e81a7355',
              'quantity': 2,
              'size': 'medium',
              'price': '75000'
            }
          ],
          'customer': '60fcfe176ea36757d055ffe7',
          'address': 'هاشمیه 21. پلاک 12',
          'GPS': {'type' : 'Point', 'coordinates' : [-122.5,37.7]},
          'status': '610138e7084e5936e00f4b84',
          'paid': true,
          'deliveryCost': 5000
        },
        //delivery accepted orders
        {
          'products': [
            {
              '_id': '610131e8f3f84b34e81a7354',
              'quantity': 1,
              'size': 'medium',
              'price': '25000'
            },
            {
              '_id': '610131e8f3f84b34e81a7355',
              'quantity': 1,
              'size': 'medium',
              'price': '75000'
            }
          ],
          'customer': '60fcfe176ea36757d055ffe7',
          'address': 'هاشمیه 21. پلاک 12',
          'GPS': {'type' : 'Point', 'coordinates' : [-122.5,37.7]},
          'status': '610138e7084e5936e00f4b86',
          'paid': true,
          'deliveryCost': 5000
        },
        {
          'products': [
            {
              '_id': '610131e8f3f84b34e81a735a',
              'quantity': 1,
              'size': 'medium',
              'price': '25000'
            },
            {
              '_id': '610131e8f3f84b34e81a7355',
              'quantity': 2,
              'size': 'medium',
              'price': '75000'
            }
          ],
          'customer': '60fcfe176ea36757d055ffe7',
          'address': 'هاشمیه 21. پلاک 12',
          'GPS': {'type' : 'Point', 'coordinates' : [-122.5,37.7]},
          'status': '610138e7084e5936e00f4b86',
          'paid': true,
          'deliveryCost': 5000
        },
      ]
    }
];
