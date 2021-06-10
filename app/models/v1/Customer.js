let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

let Customer = new Schema({
    active: { type: Boolean, default: true },
    name: { type: String, required: true },
    family: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    birthday: { type: Date , required: true},
    address: { type: String, required: true },
    order: { type: Array, default: [{ type: Schema.Types.ObjectId, ref: 'Order' }] },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

Customer.pre('validate', function(next){
    this.username = this.get('mobile');
    next()
})

Customer.plugin(timestamps);

module.exports = mongoose.model('Customer', Customer);