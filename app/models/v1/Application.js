let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

let Application = new Schema({
    active: { type: Boolean, default: true },
    status: { type: Number, default: 1 }, // 1 -> in progress, 2 -> hired, 3 -> closed
    employee: { type: Schema.Types.ObjectId, ref: 'User' },
    employer: { type: Schema.Types.ObjectId, ref: 'User' }
});

Application.plugin(timestamps);

module.exports = mongoose.model('Application', Application);