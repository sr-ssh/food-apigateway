let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

let ComplaintStatus = new Schema({
    active: { type: Boolean, default: true },
    name: { type: String, required: true},
    status: { type: Number },
    description: { type: String }
});


ComplaintStatus.plugin(timestamps);

module.exports = mongoose.model('ComplaintStatus', ComplaintStatus);