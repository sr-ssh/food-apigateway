var seeder = require('mongoose-seed');
 
// Connect to MongoDB via Mongoose
seeder.connect('mongodb://crm-x.ir:2714/food', function() {
 
  // Load Mongoose models
  seeder.loadModels([
    './../models/v1/ComplaintStatus.js'
  ]);
 
  // Clear specified collections
  seeder.clearModels(['ComplaintStatus'], function() {
 
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function() {
      seeder.disconnect();
    });
 
  });
});
 
// Data array containing seed data - documents organized by Model
var data = [
    {
        'model': 'ComplaintStatus',
        'documents': [
            { 
              name: "ایجاد شده",
              status: 0
            }
        ]
    }
];
