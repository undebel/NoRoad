const mongoose = require("mongoose");
const Room = require("../models/room");

const createRoom = async (req, res) => {
    const room = new Room();
    const params = req.body;
    
    const r = checker.checkCreateUser(params); // Implement
    
    if (!r.result) {
        res.status(400).send({ msg: r.msg });
        return;
    }

    room.ownerId = mongoose.Types.ObjectId(params.id);
    room.guestId = mongoose.Types.ObjectId(params.guestId); // Contiue here

    try {
        const roomStore = await room.save();

        if (roomStore) {
            res.status(200).send({
                id: roomStore._id
            });
        }
        else {
            res.status(400).send({ msg: "Room has not been created" });
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
}

module.exports = { createRoom };