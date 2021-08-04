let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

let CustomerFinance = new Schema({
    orderId: { type: Schema.Types.ObjectId, ref: 'Order' },
    customerId: { type: Schema.Types.ObjectId, ref: 'User' },
    type: { type: String, enum: ['credit', 'debit'] },
    cost: { type: Number }
});


CustomerFinance.plugin(timestamps);

module.exports = mongoose.model('CustomerFinance', CustomerFinance);