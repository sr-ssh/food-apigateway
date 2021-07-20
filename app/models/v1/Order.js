let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

let Order = new Schema({
    active: { type: Boolean, default: true },
    products: { type: Array, default: [{ 
        _id: { type: Schema.Types.ObjectId, ref: 'Product', required: true }, 
        quantity: { type: Number, default: 1 },
        sellingPrice: { type: String , required: true }
    }]},
    customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
    address: { type: String },
    readyTime: { type: Date },
    status: { type: Number, default: 0 }, // 0 -> active, 1 -> ready, 2 -> canceled by delivery, 3 -> on the way, 4 -> finished
    paid: { type: Boolean, default: false },
    provider: { type: Schema.Types.ObjectId, ref: 'User' },//needed?
    employee: { type: Schema.Types.ObjectId, ref: 'User' },//needed? 
    description: { type: String }
});

Order.plugin(timestamps);

module.exports = mongoose.model('Order', Order);