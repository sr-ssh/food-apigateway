let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

let Customer = new Schema({
    active: { type: Boolean, default: true },
    family: { type: String, required: true },
    username: { type: String, unique: true, sparse: true },
    mobile: { type: String, runique: true, sparse: true },
    birthday: { type: Date},
    order: [{ type: Schema.Types.ObjectId, ref: 'Order' }] ,
    locations: [{
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
    }]
});

Customer.pre('validate', function(next){
    this.username = this.get('mobile');
    next()
})

Customer.plugin(timestamps);

module.exports = mongoose.model('Customer', Customer);