let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

let Order = new Schema({
    active: { type: Boolean, default: true },
    products: { type: Array, default: [{ 
        _id: { type: Schema.Types.ObjectId, ref: 'Product', required: true }, 
        quantity: { type: Number, default: 1 },
        size: { type: String , required: true, default: 'meduim' },
        price: { type: Number , required: true },
    }]},
    customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
    address: { type: String },
    GPS: {
        type: {
          type: String, 
          enum: ['Point'],
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
    },
    status: { type: Schema.Types.ObjectId, ref: 'OrderStatusBar' },
    paid: { type: Boolean, default: false },
    deliveryCost: { type: Number },
    deliveryId: { type: Schema.Types.ObjectId, ref: 'User' },
    cookId: { type: Schema.Types.ObjectId, ref: 'User' },
    description: { type: String },
    finishDate: { type: Date }
});

Order.plugin(timestamps);

module.exports = mongoose.model('Order', Order);