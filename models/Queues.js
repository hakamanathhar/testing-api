const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const queueSchema = new mongoose.Schema({
    queue: {
        type: String,
        required: true
    },
    customer_name: {
        type: String,
        required: true
    },
    id_barcode: {
        type: String,
        required: true
    },
    visitor: {
        type: ObjectId,
        ref: 'visitors',
        required: true
    },
    medical_record: {
        type: String,
        required: true
    },
},{ timestamps: true });

module.exports = mongoose.model('queues', queueSchema);