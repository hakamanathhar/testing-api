const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const visitorSchema = new mongoose.Schema({
    customer_name: {
        type: String,
        required: true
    },
    pic: {
        type: String,
        required: true
    },
    region: {
        type: ObjectId,
        ref: 'countries',
        required: true
    },
    province: {
        type: ObjectId,
        ref: 'states',
        required: true
    },
    city: {
        type: ObjectId,
        ref: 'cities',
        required: true
    },
    remark: {
        type: String,
        required: true
    },
    address_primary: {
        type: String,
        required: true
    },
    address_secondary: {
        type: String
    },
    contact_no: {
        type: String,
        required: true
    },
    kuota: {
        type: Number,
        required: true
    },
},{ timestamps: true });

module.exports = mongoose.model('visitors', visitorSchema);