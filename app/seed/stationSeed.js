var seeder = require("mongoose-seed");

// Connect to MongoDB via Mongoose
seeder.connect("mongodb://172.16.2.215/food", function () {
  // Load Mongoose models
  seeder.loadModels(["./../models/v1/Station.js"]);

  // Clear specified collections
  seeder.clearModels(["Station"], function () {
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function () {
      seeder.disconnect();
    });
  });
});

// Data array containing seed data - documents organized by Model
var data = [
  {
    model: "Station",
    documents: [
      {
        code: 31,
        description: "کلاهدوز - ملاصدرا- راهنمایی",
        location: [59.605933, 36.29792],
        dimeter: 1700,
      },
      {
        code: 32,
        description: "امامت - معلم - استقلال",
        location: [59.544461, 36.334363],
        dimeter: 2000,
      },
      {
        code: 33,
        description: "دانشجو - هفت تیر",
        location: [59.623933, 36.297292],
        dimeter: 1700,
      },
      {
        code: 34,
        description: "میدان شهدا - طبرسی",
        location: [59.6524933, 36.291312],
        dimeter: 1700,
      },
    ],
  },
];
