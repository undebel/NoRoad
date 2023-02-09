const express = require("express");
const UserController = require("../controllers/user");

const api = express.Router();

api.post("/user", UserController.createUser);
api.get("/users", UserController.getUsers);
api.get("/user/:id", UserController.getUser);
api.put("/user/:id", UserController.updateUser);
api.delete("/user/:id", UserController.deleteUser);

module.exports = api;