let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

let Customer = new Schema({
    active: { type: Boolean, default: true },
    family: { type: String, required: true },
    username: { type: String, required: true, sparse: true  },
    mobile: { type: String, required: true, sparse: true  },
    birthday: { type: Date},
    order: { type: Array, default: [{ type: Schema.Types.ObjectId, ref: 'Order' }] },
    locations: { type: Array, default: [{
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
        }
    }]}
});

Customer.pre('validate', function(next){
    this.username = this.get('mobile');
    next()
})

Customer.plugin(timestamps);

module.exports = mongoose.model('Customer', Customer);