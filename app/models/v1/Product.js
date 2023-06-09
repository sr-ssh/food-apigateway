let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

let Product = new Schema({
    active: { type: Boolean, default: true },
    name: { type: String, required: true },
    type: { type: Schema.Types.ObjectId, ref: 'ProductTypes' },
    size: { type: Array, default: [{
        name: { type: String, required: true },
        price: { type: Number, required: true },
        discount: { type: Number, required: true, default: 0 },
    }] , required: true}, 
    img: { type: String, required: true },
    supply: { type: Number, default: 0 }, 
    cookTime: { type: Number, default: 0},
    cookTimeNeeded: { type: Boolean, default: false},
    description: { type: String, default: "" },
});

Product.plugin(timestamps);

module.exports = mongoose.model('Product', Product);