let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

let Complaint = new Schema({
  
  order: { type: Schema.Types.ObjectId, ref: 'Order' },
  status: { type: Schema.Types.ObjectId, ref: 'ComplaintStatus' },
  description: { type: String },
  customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
  registerUser: { type: Schema.Types.ObjectId, ref: 'User' },
  result: { type: String }
});

Complaint.plugin(timestamps);

module.exports = mongoose.model('Complaint', Complaint);