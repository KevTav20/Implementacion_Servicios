const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    brandName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Brand', brandSchema);

