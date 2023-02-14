const mongoose = require("mongoose");
const checker = require("../libraries/checker");
const Room = require("../models/room");

const createRoom = async (req, res) => {
    const room = new Room();
    const params = req.body;
    
    const r = checker.checkCreateRoom(params);
    
    if (!r.result) {
        res.status(400).send({ msg: r.msg });
        return;
    }

    room.ownerId = mongoose.Types.ObjectId(params.id);
    room.guestId = mongoose.Types.ObjectId(params.guestId);

    try {
        const roomStore = await room.save();

        if (roomStore) {
            res.status(200).send(roomStore);
        }
        else {
            res.status(400).send({ msg: "Room has not been created" });
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
}

const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find();

        if (rooms) {
            res.status(200).send(rooms);
        }
        else {
            res.status(400).send({ msg: "Error obtaining rooms" });
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
};

const getRoom = async (req, res) => {
    const idRoom = req.params.id;

    try {
        const room = await Room.findById(idRoom);

        if (room) {
            res.status(200).send(room);
        }
        else {
            res.status(400).send({ msg: "The specified room has not been found" });
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
}

const deleteRoom = async (req, res) => {
    const idRoom = req.params.id;

    try {
        const room = await User.findByIdAndDelete(idRoom);

        if (room) {
            res.status(200).send({ msg: "Room successfully deleted" });
        }
        else {
            res.status(400).send({ msg: "The specified room could not be deleted" });
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
}

module.exports = { createRoom, getRooms, getRoom, deleteRoom };