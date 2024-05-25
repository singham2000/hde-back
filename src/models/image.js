const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    imageData: {
        type: String,
        required: true
    },
    location: {
        type: String
    }
});

module.exports = mongoose.model('image', imageSchema);