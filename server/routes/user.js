const express = require("express");
const UserController = require("../controllers/user");

const api = express.Router();

// Defines the different API paths to perform user-related operations.
api.post("/user", UserController.createUser);
api.get("/users", UserController.getUsers);
api.get("/user/:id", UserController.getUser);
api.put("/user/:id", UserController.updateUser);
api.delete("/user/:id", UserController.deleteUser);
api.post("/user/room/:id", UserController.removeRoom);

module.exports = api;