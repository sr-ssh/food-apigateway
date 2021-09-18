let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

let UserTypes = new Schema({
    active: { type: Boolean, default: true },
    name: { type: String, required: true},
    persianName: { type: String, required: true },
    status: { type: Number, required: true, unique: true },
    description: { type: String }
})


UserTypes.plugin(timestamps);

module.exports = mongoose.model('UserTypes', UserTypes);