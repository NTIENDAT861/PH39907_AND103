const mongoose = require('mongoose');

const SanphamSchema = mongoose.Schema({

  name: {
        type: String,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    status: {
        type: Number
    },
    image: {
      type: Array
  },
  discriptions: {
    type: String
},
id_distributors: {
  type: mongoose.Schema.Types.ObjectId,
   ref: "distributor"
},
});

const SanphamModel = mongoose.model('fruit', SanphamSchema);

module.exports = SanphamModel;