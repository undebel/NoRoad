const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
    alias: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    publicKey: {
        type: String,
        require: true
    },
    rooms: {
        type: Array,
        require: true,
        default: []
    }
});

module.exports = mongoose.model("User", UserSchema);