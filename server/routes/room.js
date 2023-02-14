const express = require("express");
const RoomController = require("../controllers/room");

const api = express.Router();

api.post("/room", RoomController.createRoom);
api.get("/rooms", RoomController.getRooms);
api.get("/room/:id", RoomController.getRoom);
api.delete("/room/:id", RoomController.deleteRoom);

module.exports = api;