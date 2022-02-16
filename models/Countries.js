const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const countriesSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    },
    capital: {
        type: String
    },
});

module.exports = mongoose.model('countries', countriesSchema);