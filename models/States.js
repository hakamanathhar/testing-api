const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const statesSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    },
    state_code: {
        type: String
    },
    country_id: {
        type: Number
    }
});

module.exports = mongoose.model('states', statesSchema);