const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: Number
    },
    prompts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Prompt',
            default: []
        }
    ]
},{
    timestamps: true
});

mongoose.models = {};
export default mongoose.model('User', userSchema);