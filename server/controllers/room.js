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
};

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

/**
 * Handle to add an existing message to a room in MongoDB.
 * @param {Object} req 
 * @param {Object} res 
 * @returns Send response to the client.
 */
const addMessage = async (req, res) => {
    const roomId = req.params.id;
    const { messageId, isOwner } = req.body;

    if (!roomId || !messageId) {
        return res.status(200).send({ msg: "roomId and messageId are required." });
    }

    try {
        const convertedMessageId = mongoose.Types.ObjectId(messageId);

        // Add message to room
        let update;
        if (isOwner) {
            update = { $push: { ownerMessages: convertedMessageId } };
        } else {
            update = { $push: { guestMessages: convertedMessageId } };
        }

        const updatedRoom = await Room.findByIdAndUpdate(roomId, update, { new: true });

        if (!updatedRoom) {
            res.status(400).send({ msg: "Room not found." });
        } else {
            res.status(200).send(updatedRoom);
        }
    } catch (error) {
        res.status(500).send({ msg: "Error adding message to room.", error: error.message });
    }
}

module.exports = { createRoom, getRooms, getRoom, deleteRoom, getUserRooms, addMessage };