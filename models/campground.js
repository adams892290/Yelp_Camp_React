const mongoose = require("mongoose");

const campgroundSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: [{
        type: String,
    }],
    public_id: [{
        type: String,
    }],
    review: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model("Campground", campgroundSchema);