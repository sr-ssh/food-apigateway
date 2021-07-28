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
        order: { 
          cookTime: 8,
          confirmTime: 1
        }
      }
    ]
  }
];
