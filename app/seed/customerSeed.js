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
              'description': "سیر . خمیر تازه . اویشن",
              'type': '60fbdf84755eac0b744f1dab',
              'img': 'https://www.dropbox.com/s/cd9h8ooxo75w5ie/picc-pizza.png?dl=0',
              'size': [{'name': 'medium', 'price': '25000'}]
            },
            {
              'name': "رست بیف",
              'description': "گوشت گوساله . پنیر . قارچ . فلفل دلمه ای . پیازجه",
              'type': '60fbdf84755eac0b744f1dac',
              'img': 'https://www.dropbox.com/s/cd9h8ooxo75w5ie/picc-pizza.png?dl=0',
              'size': [{'name': 'medium', 'price': '75000'}, {'name': 'large', 'price': '100000'}]
            },
            {
              'name': "پپرونی",
              'description': "کالباس پپرونی . پنیر . قارچ . فلفل دلمه ای",
              'type': '60fbdf84755eac0b744f1dac',
              'img': 'https://www.dropbox.com/s/cd9h8ooxo75w5ie/picc-pizza.png?dl=0',
              'size': [{'name': 'medium', 'price': '60'}, {'name': 'large', 'price': '80000'}]
            },
            {
              'name': "مرغ و قارچ",
              'description': "مرغ . پنیر . قارچ . فلفل دلمه ای . پیازجه",
              'type': '60fbdf84755eac0b744f1dac',
              'img': 'https://www.dropbox.com/s/cd9h8ooxo75w5ie/picc-pizza.png?dl=0',
              'size': [{'name': 'medium', 'price': '70000'}, {'name': 'large', 'price': '90000'}]
            },
            {
              'name': "مخصوص",
              'description': "گوشت گوساله . ژامبون . پنیر . قارچ . فلفل دلمه ای . پیازجه",
              'type': '60fbdf84755eac0b744f1dac',
              'img': 'https://www.dropbox.com/s/cd9h8ooxo75w5ie/picc-pizza.png?dl=0',
              'size': [{'name': 'medium', 'price': '70000'}, {'name': 'large', 'price': '90000'}]
            },
            {
              'name': "مارگاریتا",
              'description': "پنیر . قارچ . فلفل دلمه ای . پیازجه",
              'type': '60fbdf84755eac0b744f1dac',
              'img': 'https://www.dropbox.com/s/cd9h8ooxo75w5ie/picc-pizza.png?dl=0',
              'size': [{'name': 'medium', 'price': '45000'}]
            },
            {
              'name': "کوکا",
              'description': "",
              'type': '60fbdf84755eac0b744f1dad',
              'img': 'https://www.dropbox.com/s/cd9h8ooxo75w5ie/picc-pizza.png?dl=0',
              'size': [{'name': 'medium', 'price': '9000'}]
            },
            {
              'name': "سالاد فصل",
              'description': "",
              'type': '60fbdf84755eac0b744f1dae',
              'img': 'https://www.dropbox.com/s/cd9h8ooxo75w5ie/picc-pizza.png?dl=0',
              'size': [{'name': 'medium', 'price': '5000'}]
            },
            {
              'name': "سس کچاپ",
              'description': "",
              'type': '60fbdf84755eac0b744f1daf',
              'img': 'https://www.dropbox.com/s/cd9h8ooxo75w5ie/picc-pizza.png?dl=0',
              'size': [{'name': 'medium', 'price': '1000'}]
            }
        ]
    }
];