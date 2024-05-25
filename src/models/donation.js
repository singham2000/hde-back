const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    pinCode: {
        type: Number,
        maxLength: 6,
        required: true
    },
    state: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('donation', donationSchema);