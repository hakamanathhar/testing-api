const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const citiesSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    },
    state_id: {
        type: Number
    },
    country_id: {
        type: Number
    }
});

module.exports = mongoose.model('cities', citiesSchema);