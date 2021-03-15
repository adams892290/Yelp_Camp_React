const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    token: String
});

module.exports = mongoose.model("User", userSchema);