const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Defines room schema in the database.
const RoomSchema = new Schema({
    date: {
        type: Date,
        require: true,
        default: Date.now
    },
    ownerId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        require: true
    },
    guestId : {
        type: mongoose.Types.ObjectId,
        ref: "User",
        require: true
    },
    ownerMessages: [{
        type: mongoose.Types.ObjectId,
        ref: "Message",
        require: true,
        default: []
    }],
    guestMessages: [{
        type: mongoose.Types.ObjectId,
        ref: "Message",
        require: true,
        default: []
    }]
});

module.exports = mongoose.model("Room", RoomSchema);