var seeder = require('mongoose-seed');
 
// Connect to MongoDB via Mongoose
seeder.connect('mongodb://crm-x.ir:2714/food', function() {
 
  // Load Mongoose models
  seeder.loadModels([
    './../models/v1/AppInfo.js'
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
    }
];
