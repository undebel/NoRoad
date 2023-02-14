const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    date: {
        type: Date,
        require: true,
        default: Date.now
    },
    message: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model("Message", MessageSchema);