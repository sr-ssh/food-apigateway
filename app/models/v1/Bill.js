let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

let Bill = new Schema({
    active: { type: Boolean, default: true },
    name: { type: String, required: true },
    cost: { type: String , required: true},
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

Bill.plugin(timestamps);

module.exports = mongoose.model('Bill', Bill);