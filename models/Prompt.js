const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    creater: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

mongoose.models = {};
export default mongoose.Model('Prompt', promptSchema);