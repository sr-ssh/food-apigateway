var seeder = require('mongoose-seed');
 
// Connect to MongoDB via Mongoose
seeder.connect('mongodb://172.16.2.215/food', function() {
 
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
        name: 'manager'
      },
      { 
        name: 'operator'
      },
      { 
        name: 'cook'
      },
      { 
        name: 'deliveryMan'
      }
    ]
    }
];
