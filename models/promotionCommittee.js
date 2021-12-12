const mongoose = require('mongoose');

const promototionCommitteeSchema = new mongoose.Schema({
    members: {
        type: []
    },
    promotion_request_id: {
        type: String,
        required: true
    },
    promotion_request: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Promotion Request",
    }
});

const model = mongoose.model("Promotion Committee", promototionCommitteeSchema);

module.exports = model;