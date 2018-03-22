var mongoose = require('mongoose');
var stockSchema = mongoose.Schema({
    ticker: {
        type: String,
        required: true
    },
    priceHistory: {
        type: Object,
        required: true
    },
    createdDate: {
        type: Date,
        required: true
    },
    updatedDate: {
        type: Date
    }

});

// create the model for users and expose it to our app
module.exports = mongoose.model('Stock', stockSchema);