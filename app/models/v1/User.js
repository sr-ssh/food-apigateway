let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const bcrypt = require("bcrypt")

let User = new Schema({
    active:{ type: Boolean, default: true },
    name: { type: String },
    family: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, unique: true },
    mobile: { type: String, required: true, unique: true },
    company: String,
    employer: { type: Schema.Types.ObjectId, ref: 'User'},
    employee: { type: Array, default: [{ type: Schema.Types.ObjectId, ref: 'User' }] },
    permission:{ type: Array, default: [] },//{no: 12, status: true},
    setting: { type: Array, default: [{ order: [{sms: false}] }]}
});

User.pre('validate', function(next){
    this.username = this.get('mobile');
    next();
})

User.pre('save', function(next){

    if (!this.isModified('password')) return next();

    bcrypt.hash(this.password, config.salt, (err, hash) => {
        this.password = hash;
        next();
    })
})

User.plugin(timestamps);

module.exports = mongoose.model('User', User);