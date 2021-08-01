const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let DeliveryLocation = new Schema({
    city: { type: String, default: 'Mashhad'},
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    geo: {
        type: [Number],
        index: '2d'
    },
    speed: Number,
    bearing: Number,
    saveDate: Date
});


DeliveryLocation.index({ saveDate: -1 });
DeliveryLocation.index({ userId: 1, city: -1, saveDate: -1 });


module.exports = mongoose.model('DeliveryLocation', DeliveryLocation);