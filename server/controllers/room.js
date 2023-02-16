const mongoose = require("mongoose");
const checker = require("../libraries/checker");
const Room = require("../models/room");
const User = require("../models/user");

/**
 * Handle to create a new room request in MongoDB.
 * @param {Object} req 
 * @param {Object} res 
 * @returns Send response to the client.
 */
const createRoom = async (req, res) => {
    const room = new Room();
    const params = req.body;
    
    const r = checker.checkCreateRoom(params);
    
    if (!r.result) {
        res.status(400).send({ msg: r.msg });
        return;
    }

    try {
        room.ownerId = mongoose.Types.ObjectId(params.id);
        room.guestId = mongoose.Types.ObjectId(params.guestId);
    }
    catch (error) {
        res.status(400).send("Guest ID does not exist");
        return;
    }

    try {
        const roomStore = await room.save();

        if (roomStore) {
            const users = [
                { _id: params.id },
                { _id: params.guestId },
            ];
            const updateResult = await User.updateMany(
                { $or: users.map((u) => ({ _id: u._id })) },
                { $push: { rooms: roomStore._id } }
            );

            if (updateResult.modifiedCount === users.length) {
                res.status(200).send(roomStore);
            } else {
                res.status(400).send({ msg: "User rooms have not been updated" });
            }
        }
        else {
            res.status(400).send({ msg: "Room has not been created" });
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
}

/**
 * Handle to get all rooms request in MongoDB.
 * @param {Object} req 
 * @param {Object} res 
 * @returns Send response to the client.
 */
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

/**
 * Handle to get a room request in MongoDB.
 * @param {Object} req 
 * @param {Object} res 
 * @returns Send response to the client.
 */
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
/**
 * Handle to delete room request in MongoDB.
 * @param {Object} req 
 * @param {Object} res 
 * @returns Send response to the client.
 */
const deleteRoom = async (req, res) => {
    const idRoom = req.params.id;

    try {
        const room = await Room.findByIdAndDelete(idRoom);

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

/**
 * Handle to get all rooms of a user request in MongoDB.
 * @param {Object} req 
 * @param {Object} res 
 * @returns Send response to the client.
 */
const getUserRooms = async (req, res) => {
    const idUser = req.params.id;
    try {
        const user = await User.findById(idUser);

        if (user) {
            res.status(200).send({ rooms: user.rooms });
        }
        else {
            res.status(400).send({ msg: "The specified user has not been found" });
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
}

module.exports = { createRoom, getRooms, getRoom, deleteRoom, getUserRooms };