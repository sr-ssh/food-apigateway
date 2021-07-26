// var seeder = require('mongoose-seed');
 
// // Connect to MongoDB via Mongoose
// seeder.connect('mongodb://172.16.2.215/food', function() {
 
//   // Load Mongoose models
//   seeder.loadModels([
//     './../models/v1/ProductTypes.js'
//   ]);
 
//   // Clear specified collections
//   seeder.clearModels(['ProductTypes'], function() {
 
//     // Callback to populate DB once collections have been cleared
//     seeder.populateModels(data, function() {
//       seeder.disconnect();
//     });
 
//   });
// });
 
// // Data array containing seed data - documents organized by Model
// var data = [
//     {
//         'model': 'ProductTypes',
//         'documents': [
//             {
//                 'name': 'appetizer'
//             },
//             {
//                 'name': 'pizza'
//             },
//             {
//                 'name': 'drinks'
//             },
//             {
//                 'name': 'salad'
//             },
//             {
//                 'name': 'sauce'
//             }
//         ]
//     }
// ];

var seeder = require('mongoose-seed');
 
// Connect to MongoDB via Mongoose
seeder.connect('mongodb://172.16.2.215/food', function() {
 
  // Load Mongoose models
  seeder.loadModels([
    './../models/v1/Product.js'
  ]);
 
  // Clear specified collections
  seeder.clearModels(['Product'], function() {
 
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function() {
      seeder.disconnect();
    });
 
  });
});
 
// Data array containing seed data - documents organized by Model
var data = [
    {
        'model': 'Product',
        'documents': [
            {
              'name': "نان سیر",
              'sellingPrice': "25000",
              'description': "سیر . خمیر تازه . اویشن",
              'type': '60fbdf84755eac0b744f1dab'
            },
            {
              'name': "رست بیف",
              'sellingPrice': "75000",
              'description': "گوشت گوساله . پنیر . قارچ . فلفل دلمه ای . پیازجه",
              'type': '60fbdf84755eac0b744f1dac'
            },
            {
              'name': "پپرونی",
              'sellingPrice': "60000",
              'description': "کالباس پپرونی . پنیر . قارچ . فلفل دلمه ای",
              'type': '60fbdf84755eac0b744f1dac'
            },
            {
              'name': "مرغ و قارچ",
              'sellingPrice': "70000",
              'description': "مرغ . پنیر . قارچ . فلفل دلمه ای . پیازجه",
              'type': '60fbdf84755eac0b744f1dac'
            },
            {
              'name': "مخصوص",
              'sellingPrice': "70000",
              'description': "گوشت گوساله . ژامبون . پنیر . قارچ . فلفل دلمه ای . پیازجه",
              'type': '60fbdf84755eac0b744f1dac'
            },
            {
              'name': "مارگاریتا",
              'sellingPrice': "45000",
              'description': "پنیر . قارچ . فلفل دلمه ای . پیازجه",
              'type': '60fbdf84755eac0b744f1dac'
            },
            {
              'name': "کوکا",
              'sellingPrice': "5000",
              'description': "",
              'type': '60fbdf84755eac0b744f1dad'
            },
            {
              'name': "سالاد فصل",
              'sellingPrice': "3000",
              'description': "",
              'type': '60fbdf84755eac0b744f1dae'
            },
            {
              'name': "سس کچاپ",
              'sellingPrice': "1000",
              'description': "",
              'type': '60fbdf84755eac0b744f1daf'
            }
        ]
    }
];