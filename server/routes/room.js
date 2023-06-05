const express = require("express");
const RoomController = require("../controllers/room");

const api = express.Router();

// Defines the different API paths to perform room-related operations.
api.post("/room", RoomController.createRoom);
api.get("/rooms", RoomController.getRooms);
api.get("/room/:id", RoomController.getRoom);
api.delete("/room/:id", RoomController.deleteRoom);
api.get("/rooms/user/:id", RoomController.getUserRooms);
api.post("/room/message/:id", RoomController.addMessage);

module.exports = api;