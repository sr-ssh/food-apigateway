var seeder = require('mongoose-seed');
 
// Connect to MongoDB via Mongoose
seeder.connect('mongodb://172.16.2.215/food', function() {
 
  // Load Mongoose models
  seeder.loadModels([
    './../models/v1/CustomerFinance.js'
  ]);
 
  // Clear specified collections
  seeder.clearModels(['CustomerFinance'], function() {
 
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function() {
      seeder.disconnect();
    });
 
  });
});
 
// Data array containing seed data - documents organized by Model
var data = [
    {
        'model': 'CustomerFinance',
        'documents': [
            { 
              'customerId': "61111c5266e24a58085cba17",
              'type': 'credit',
              'cost': 20000
            },
            {
              'customerId': "61111c5266e24a58085cba17",
              'type': 'debit',
              'cost': 20000
            },
            {
              'customerId': "61111c5266e24a58085cba17",
              'type': 'credit',
              'cost': 5000
            }
        ]
    }
];
