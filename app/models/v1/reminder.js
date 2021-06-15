let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

let Reminder = new Schema({
    active:{ type: Boolean, default: true },
    date: { type: Date, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
    order: { type: Schema.Types.ObjectId, ref: 'Order' }
});


Reminder.plugin(timestamps);

module.exports = mongoose.model('Reminder', Reminder);