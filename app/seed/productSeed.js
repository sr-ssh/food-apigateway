var seeder = require('mongoose-seed');
 
// Connect to MongoDB via Mongoose
seeder.connect('mongodb://crm-x.ir:2714/food', function() {
 
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
              'type': '610916826f9446153c5e268d',
              'img': 'https://www.dropbox.com/s/cd9h8ooxo75w5ie/picc-pizza.png?dl=0',
              'size': [{'name': 'medium', 'price': '25000'}]
            },
            {
              'name': "رست بیف",
              'description': "گوشت گوساله . پنیر . قارچ . فلفل دلمه ای . پیازجه",
              'type': '610916826f9446153c5e268e',
              'img': 'https://www.dropbox.com/s/cd9h8ooxo75w5ie/picc-pizza.png?dl=0',
              'size': [{'name': 'medium', 'price': '75000'}, {'name': 'large', 'price': '100000'}]
            },
            {
              'name': "پپرونی",
              'description': "کالباس پپرونی . پنیر . قارچ . فلفل دلمه ای",
              'type': '610916826f9446153c5e268e',
              'img': 'https://www.dropbox.com/s/cd9h8ooxo75w5ie/picc-pizza.png?dl=0',
              'size': [{'name': 'medium', 'price': '60'}, {'name': 'large', 'price': '80000'}]
            },
            {
              'name': "مرغ و قارچ",
              'description': "مرغ . پنیر . قارچ . فلفل دلمه ای . پیازجه",
              'type': '610916826f9446153c5e268e',
              'img': 'https://www.dropbox.com/s/cd9h8ooxo75w5ie/picc-pizza.png?dl=0',
              'size': [{'name': 'medium', 'price': '70000'}, {'name': 'large', 'price': '90000'}]
            },
            {
              'name': "مخصوص",
              'description': "گوشت گوساله . ژامبون . پنیر . قارچ . فلفل دلمه ای . پیازجه",
              'type': '610916826f9446153c5e268e',
              'img': 'https://www.dropbox.com/s/cd9h8ooxo75w5ie/picc-pizza.png?dl=0',
              'size': [{'name': 'medium', 'price': '70000'}, {'name': 'large', 'price': '90000'}]
            },
            {
              'name': "مارگاریتا",
              'description': "پنیر . قارچ . فلفل دلمه ای . پیازجه",
              'type': '610916826f9446153c5e268e',
              'img': 'https://www.dropbox.com/s/cd9h8ooxo75w5ie/picc-pizza.png?dl=0',
              'size': [{'name': 'medium', 'price': '45000'}]
            },
            {
              'name': "کوکا",
              'description': "",
              'type': '610916826f9446153c5e268f',
              'img': 'https://www.dropbox.com/s/cd9h8ooxo75w5ie/picc-pizza.png?dl=0',
              'size': [{'name': 'medium', 'price': '9000'}]
            },
            {
              'name': "سالاد فصل",
              'description': "",
              'type': '610916826f9446153c5e2690',
              'img': 'https://www.dropbox.com/s/cd9h8ooxo75w5ie/picc-pizza.png?dl=0',
              'size': [{'name': 'medium', 'price': '5000'}]
            },
            {
              'name': "سس کچاپ",
              'description': "",
              'type': '610916826f9446153c5e2691',
              'img': 'https://www.dropbox.com/s/cd9h8ooxo75w5ie/picc-pizza.png?dl=0',
              'size': [{'name': 'medium', 'price': '1000'}]
            }
        ]
    }
];