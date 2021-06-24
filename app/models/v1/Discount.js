let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

let Discount = new Schema({
    active: { type: Boolean, default: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    percentage: { type: Number, required: true },
    sms: { type: Boolean, default: false },
    customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
    provider: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});


Discount.plugin(timestamps);

module.exports = mongoose.model('Discount', Discount);