const express = require("express");
const RoomController = require("../controllers/room");

const api = express.Router();

api.post("/room", RoomController.createRoom);

module.exports = api;