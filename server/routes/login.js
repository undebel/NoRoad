const express = require("express");
const LoginController = require("../controllers/login");

const api = express.Router();

api.post("/login", LoginController.login);

module.exports = api;