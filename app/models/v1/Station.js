let mongoose = require("mongoose");
let Schema = mongoose.Schema;
const timestamps = require("mongoose-timestamp");

let Station = new Schema({
  active: { type: Boolean, default: true },
  code: { type: Number },
  description: { type: String },
  latitude: { type: Number },
  longitudes: { type: Number },
  dimeter: { type: Number }
});

Station.plugin(timestamps);

module.exports = mongoose.model("Station", Station);
