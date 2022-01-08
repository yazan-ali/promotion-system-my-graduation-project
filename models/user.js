const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    teacher_id: {
        type: String,
        required: true
    },
    rank: {
        type: String,
    },
    password: {
        type: String,
    },
    college: {
        type: String,
    },
    section: {
        type: String,
    },
    year: {
        type: Date,
    },
    administrativeRank: {
        type: Number,
        default: null,
        require: true,
    },
    promotionRequest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Promotion Request"
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    }
});


const model = mongoose.model("User", userSchema);

module.exports = model;