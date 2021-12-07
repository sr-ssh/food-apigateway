let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

let Settings = new Schema({
  active: { type: Boolean, default: true },
  delivery: {
    type: Object, default: {
      acceptCount: { type: Number },
      deliveryCost: { type: Number }
    }
  },
  order: {
    type: Object, default: {
      cookTime: { type: Number },
      confirmTime: { type: Number },
      isPayNecessary: { type: Boolean, default: true },
      addOrderSms: { text: { type: String }, status: { type: Boolean } },
      successfullPaymentSms: { text: { type: String }, status: { type: Boolean } },
      inProcessOrderSms: { text: { type: String }, status: { type: Boolean } },
      inCookingOrderSms: { text: { type: String }, status: { type: Boolean } },
      inServiceOrderSms: { text: { type: String }, status: { type: Boolean } },
      finishedOrderSms: { text: { type: String }, status: { type: Boolean } },
      surveySms: { text: { type: String }, status: { type: Boolean } }

    }
  },
  companyName: { type: String },
  pricing: {
    type: Object, default: {

      enter: { type: String },
      distance: { type: Number },
      duration: { type: Number },
      lowest: { type: String }

    }
  }
});

Settings.plugin(timestamps);

module.exports = mongoose.model('Settings', Settings);