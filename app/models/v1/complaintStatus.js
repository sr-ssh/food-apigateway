let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

let complaintStatus = new Schema({
    active: { type: Boolean, default: true },
    name: { type: String, required: true},
    status: { type: Number },
    description: { type: String }
});


complaintStatus.plugin(timestamps);

module.exports = mongoose.model('complaintStatus', complaintStatus);