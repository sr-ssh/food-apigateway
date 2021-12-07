let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const bcrypt = require("bcrypt")

let User = new Schema({
    active: { type: Boolean, default: true },
    status: { type: Boolean, default: 0 },
    type: { type: Schema.Types.ObjectId, ref: 'UserTypes' },
    hired: { type: Boolean, default: false },
    name: { type: String },
    family: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    mobile: { type: String, required: true, unique: true },
    company: String,
    address: String,
    permission: {
        type: Object, default: {
            getSalesReport: false,
            getProducts: false,
            getCustomers: false,
            getEmployees: false,
            getDeliveryCharges: false,
            getPricing: false,
            getStations: false
        }
    },

    account: { 
        type: Object, default:{
            sheba: "",
            accountNumber: "",
            cardNumber: ""
        }
    },
    setting: { type: Object, default:{
        order: {
            preSms: { text: config.addOrderSms, status: false },
            postDeliverySms: { text: "" , status: false },
            postCustomerSms: { text: config.deliveryAcknowledgeSms , status: false }
        }
    },

    financialAccount: {},
    sipNumber: { type: Number, unique: true, sparse: true},
    sipPass: String
}
    
});

User.pre('validate', function (next) {
    this.username = this.get('mobile');
    next();
})

User.pre('save', function (next) {

    if (!this.isModified('password')) return next();

    bcrypt.hash(this.password, config.salt, (err, hash) => {
        this.password = hash;
        next();
    })


})

User.plugin(timestamps);

module.exports = mongoose.model('User', User);