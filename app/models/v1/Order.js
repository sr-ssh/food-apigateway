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
    provider: { type: Schema.Types.ObjectId, ref: 'User' },
    employee: { type: Schema.Types.ObjectId, ref: 'User' },
    description: { type: String }
});

Order.plugin(timestamps);

module.exports = mongoose.model('Order', Order);