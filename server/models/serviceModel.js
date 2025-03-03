const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema(
    {
        serviceProvider: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        assets: [String],
        status: {
            type: String,
            required: true,
            trim: true,
            enum: ['active', 'paused', 'pending', 'rejected', 'completed']
        }
    },
    { timestamps: true }
);

const Campaign = mongoose.model("campaign", campaignSchema);

module.exports = Campaign;
