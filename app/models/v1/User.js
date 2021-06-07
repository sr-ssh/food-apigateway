let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const bcrypt = require("bcrypt")

let User = new Schema({
    active:{ type: Boolean, default: true },
    name: { type: String, required: true },
    family: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    company: String,
    employer: { type: Schema.Types.ObjectId, ref: 'User'},
    employee: { type: Array, default: [{ type: Schema.Types.ObjectId, ref: 'User' }] },
});

User.pre('validate', function(next){

    this.employer = this.get('_id');
    this.username = this.get('email');
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