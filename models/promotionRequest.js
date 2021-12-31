const mongoose = require('mongoose');

const promototionRequestSchema = new mongoose.Schema({
    created_by: {
        id: {
            type: String,
            required: true,
        },
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
            require: true,
        },
        college: {
            type: String,
            require: true,
        },
        section: {
            type: String,
            require: true,
        },
        administrativeRank: {
            type: Number,
            default: 0,
            require: true,
        },
    },
    user_files: {
        type: {},
        default: {}
    },
    administrative_files: {
        type: {},
        default: {}
    },
    start_date: {
        type: Date
    },
    end_date: {
        type: Date
    },
    rejectionReasons: {
        type: [],
        default: [],
    },
    promotion_request_status: {
        type: String,
    },
    promotion_type: {
        type: String,
        require: true,
    },
    current_phase_number: {
        type: Number,
        require: true,
    },
    process_level_number: {
        type: Number,
        require: true,
    },
    sent_to: {
        type: [],
        default: []
    },
    rejected: {
        type: Boolean,
        require: true,
    },
    created_at: {
        type: Date,
        require: true,
    },
    updated_at: {
        type: Date,
    }
});

const model = mongoose.model("Promotion Request", promototionRequestSchema);

module.exports = model;