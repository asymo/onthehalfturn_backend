const mongoose = require('mongoose');

const slideSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, default: '' },
    imagePath: { type: String, required: true }
});

module.exports = mongoose.model('Slide', slideSchema);