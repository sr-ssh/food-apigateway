let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

let Settings = new Schema({
    active: { type: Boolean, default: true },
    delivery: { type: Object, default: {
      acceptCount: { type: Number },
      deliveryCost: { type: Number }
    }},
    order: { type: Object, default: {
      cookTime: { type: Number },
      confirmTime: { type: Number }
    }}
});

Settings.plugin(timestamps);

module.exports = mongoose.model('Settings', Settings);