let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

let ProductTypes = new Schema({
    active: { type: Boolean, default: true },
    name: { type: String, required: true},
    description: { type: String }
});


ProductTypes.plugin(timestamps);

module.exports = mongoose.model('ProductTypes', ProductTypes);