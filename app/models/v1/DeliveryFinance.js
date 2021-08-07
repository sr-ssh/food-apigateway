let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

let DeliveryFinance = new Schema({
    orderId: { type: Schema.Types.ObjectId, ref: 'Order' },
    deliveryId: { type: Schema.Types.ObjectId, ref: 'User' },
    type: { type: String, enum: ['credit', 'debit'] },
    cost: { type: Number }
});


DeliveryFinance.plugin(timestamps);

module.exports = mongoose.model('DeliveryFinance', DeliveryFinance);