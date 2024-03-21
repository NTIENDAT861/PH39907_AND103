const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    ProductID: { type: Number, required: true },
    ProductName: { type: String, required: true },
    Description: { type: String },
    Price: { type: Number },
   Quantity: {
    type: Number
   }
});


const ProductModel = mongoose.model('product', ProductSchema);

module.exports = ProductModel;