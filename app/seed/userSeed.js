var seeder = require('mongoose-seed');
 
// Connect to MongoDB via Mongoose
seeder.connect('mongodb://crm-x.ir:2714/food', function() {
 
  // Load Mongoose models
  seeder.loadModels([
    './../models/v1/UserTypes.js'
  ]);
 
  // Clear specified collections
  seeder.clearModels(['UserTypes'], function() {
 
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function() {
      seeder.disconnect();
    });
 
  });
});
 
// Data array containing seed data - documents organized by Model
var data = [
  {
    'model': 'UserTypes',
    'documents': [
      { 
        name: 'manager',
        persianName: 'مدیر',
        status: 1
      },
      { 
        name: 'operator',
        persianName: 'اپراتور',
        status: 2
      },
      { 
        name: 'cook',
        persianName: 'آشپز',
        status: 3
      },
      { 
        name: 'deliveryMan',
        persianName: 'پیک',
        status: 4
      }
    ]
    }
];
