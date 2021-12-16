let mongoose = require("mongoose");
let Schema = mongoose.Schema;
const timestamps = require("mongoose-timestamp");

let Station = new Schema({
  active: { type: Boolean, default: true },
  description: { type: String },
  code: { type: Number, index: true },
  location: {
    type: [Number],
    index: '2d'
  },
  dimeter: { type: Number }
});

Station.plugin(timestamps);

module.exports = mongoose.model("Station", Station);
