let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

let Order = new Schema({
  active: { type: Boolean, default: true },
  products: {
    type: Array, default: [{
      _id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, default: 1 },
      size: { type: String, required: true, default: 'medium' },
      price: { type: Number, required: true },
      discount: { type: Number, required: true, default: 0 },
      status: { type: Schema.Types.ObjectId, ref: 'OrderStatusBar' }
    }]
  },
  customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
  address: { type: String },
  station: { type: Schema.Types.ObjectId, ref: 'Station' },
  GPS: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
    }
  },
  status: { type: Schema.Types.ObjectId, ref: 'OrderStatusBar' },
  paid: { type: Boolean, default: false },
  payType: { type: Number, default: 0 }, // 0 -> pose, 1 -> online
  payAuthority: { type: String, unique: true, sparse: true },
  payAmount: { type: Number },
  deliveryCost: { type: Number },
  deliveryId: { type: Schema.Types.ObjectId, ref: 'User' },
  cookId: { type: Schema.Types.ObjectId, ref: 'User' },
  description: { type: String },
  finishDate: { type: Date },
  orderType: { type: Number } // 0 -> phone, 1 -> online
});

Order.plugin(timestamps);

module.exports = mongoose.model('Order', Order);