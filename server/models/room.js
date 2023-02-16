const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Defines room schema in the database.
const RoomSchema = new Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    guestId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    ownerMessages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        require: true,
        default: []
    }],
    guestMessages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        require: true,
        default: []
    }]
});

module.exports = mongoose.model("Room", RoomSchema);