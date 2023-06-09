var seeder = require('mongoose-seed');
 
// Connect to MongoDB via Mongoose
seeder.connect('mongodb://crm-x.ir:2714/food', function() {
 
  // Load Mongoose models
  seeder.loadModels([
    './../models/v1/Order.js',
  ]);
 
  // Clear specified collections
  seeder.clearModels(['Order'], function() {
 
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function() {
      seeder.disconnect();
    });
 
  });
});
 
// Data array containing seed data - documents organized by Model
var data = [
    {
        'model': 'Order',
        'documents': [
            { 
                "products": [
                  {
                      "_id": "61091b0ca9335b389819e896",
                      "quantity": 1,
                      "price": "90000",
                      "size": "large"
                  }
              ],
              "customer": "6107bd65e5bdcc11fd46bff2",
              "address": "راهنمایی 24",
              "GPS": { type: "Point", coordinates: [33.297920, 59.605933]},
              "status": "610910cc5b637837dce1ea98",
              "supply": 100,
              "paid": true,
              "deliveryCost": 5000,
              "description": "ساعت 12 تحویل داده شود"
            },
            { 
              "products": [
                {
                    "_id": "61091b0ca9335b389819e898",
                    "quantity": 3,
                    "price": "60000",
                    "size": "medium"
                },
                {
                  "_id": "61091b0ca9335b389819e89b",
                  "quantity": 2,
                  "price": "5000",
                  "size": "medium"
              },
              {
                "_id": "61091b0ca9335b389819e897",
                "quantity": 2,
                "price": "5000",
                "size": "medium"
            }
              ],
              "customer": "6107bd65e5bdcc11fd46bff2",
              "address": "راهنمایی 24",
              "GPS": { type: "Point", coordinates: [33.297920, 59.605933]},
              "status": "610910cc5b637837dce1ea98",
              "supply": 100,
              "paid": true,
              "deliveryCost": 5000,
              "description": "ساعت 12 تحویل داده شود"
            },
            { 
              "products": [
                {
                    "_id": "61091b0ca9335b389819e896",
                    "quantity": 3,
                    "price": "60000",
                    "size": "medium"
                },
                {
                  "_id": "61091b0ca9335b389819e89b",
                  "quantity": 2,
                  "price": "5000",
                  "size": "medium"
              }
              ],
              "customer": "6107bd65e5bdcc11fd46bff2",
              "address": "راهنمایی 24",
              "GPS": { type: "Point", coordinates: [33.297920, 59.605933]},
              "status": "610910cc5b637837dce1ea98",
              "supply": 100,
              "paid": true,
              "deliveryCost": 5000,
              "description": "ساعت 12 تحویل داده شود"
            },
            { 
              "products": [
                {
                    "_id": "61091b0ca9335b389819e897",
                    "quantity": 1,
                    "price": "60000",
                    "size": "medium"
                },
                {
                  "_id": "61091b0ca9335b389819e89b",
                  "quantity": 3,
                  "price": "5000",
                  "size": "medium"
              }
              ],
              "customer": "6107bd65e5bdcc11fd46bff2",
              "address": "راهنمایی 24",
              "GPS": { type: "Point", coordinates: [33.297920, 59.605933]},
              "status": "610910cc5b637837dce1ea98",
              "supply": 100,
              "paid": true,
              "deliveryCost": 5000,
              "description": "ساعت 12 تحویل داده شود"
            },//accepted
            { 
              "products": [
                {
                  "_id": "61091b0ca9335b389819e897",
                  "quantity": 2,
                  "price": "5000",
                  "size": "medium"
              }
              ],
              "customer": "6107bd65e5bdcc11fd46bff2",
              "address": "راهنمایی 24",
              "GPS": { type: "Point", coordinates: [33.297920, 59.605933]},
              "status": "610910cc5b637837dce1ea98",
              "supply": 100,
              "paid": true,
              "deliveryCost": 5000,
              "description": "ساعت 12 تحویل داده شود"
            },//pending
            { 
              "products": [
                {
                    "_id": "61091b0ca9335b389819e894",
                    "quantity": 5,
                    "price": "60000",
                    "size": "medium"
                }
              ],
              "customer": "6107bd65e5bdcc11fd46bff2",
              "address": "راهنمایی 24",
              "GPS": { type: "Point", coordinates: [33.297920, 59.605933]},
              "status": "610910cc5b637837dce1ea98",
              "supply": 100,
              "paid": true,
              "deliveryCost": 5000,
              "description": "ساعت 12 تحویل داده شود"
          }
        ]
    }
];
