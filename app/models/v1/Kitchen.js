let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

let Kitchen = new Schema({
    active: { type: Boolean, default: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    GPS: { type: Object, required: true,default: {
        type: {
          type: String, 
          enum: ['Point'],
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      }
    },
    area: { type: String, required: true },
    distance: { type: Number }
});


Kitchen.plugin(timestamps);

module.exports = mongoose.model('Kitchen', Kitchen);