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
        required: true
    },
    password: {
        type: String,
        required: true
    },
    college: {
        type: String,
        require: true,
    },
    section: {
        type: String,
        require: true,
    },
    year: {
        type: Date,
        required: true
    },
    promotion_points: {
        type: Number,
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