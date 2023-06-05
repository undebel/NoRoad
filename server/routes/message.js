const express = require("express");
const MessageController = require("../controllers/message");

const api = express.Router();

// Defines the different API paths to perform message-related operations.
api.post("/message", MessageController.createMessage);
api.get("/messages", MessageController.getMessages);
api.get("/message/:id", MessageController.getMessage);
api.delete("/message/:id", MessageController.deleteMessage);

module.exports = api;