const express = require("express");
const LoginController = require("../controllers/login");

const api = express.Router();

// Define API path to perform login operations.
api.post("/login", LoginController.login);

module.exports = api;