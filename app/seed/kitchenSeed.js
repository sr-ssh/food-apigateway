var seeder = require('mongoose-seed');
 
// Connect to MongoDB via Mongoose
seeder.connect('mongodb://crm-x.ir:2714/food', function() {
 
  // Load Mongoose models
  seeder.loadModels([
    './../models/v1/Kitchen.js'
  ]);
 
  // Clear specified collections
  seeder.clearModels(['Kitchen'], function() {
 
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function() {
      seeder.disconnect();
    });
 
  });
});
 
// Data array containing seed data - documents organized by Model
var data = [
  {
    'model': 'Kitchen',
    'documents': [
      { 
        'name': 'پیتزاپزی هنرستان',
        'address': 'خیابان هنرستان . بین صارمی 29 و 31',
        'GPS': {'type' : 'Point', 'coordinates' : [-122.5,37.7]},
        'area': 'هنرستان',
        'distance': 3
      }
    ]
  }
];
