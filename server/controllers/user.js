const User = require("../models/user");
const rsa = require("../libraries/rsa");
const checker = require("../libraries/checker");

/**
 * Handle to create a new user request in MongoDB.
 * @param {Object} req 
 * @param {Object} res 
 * @returns Send response to the client.
 */
const createUser = async (req, res) => {
    const user = new User();
    const params = req.body;
    
    const r = checker.checkCreateUser(params);
    
    if (!r.result) {
        res.status(400).send({ msg: r.msg });
        return;
    }

    const { publicKey, privateKey } = rsa.generateRSAKeys();

    user.alias = params.alias;
    user.password = rsa.toSHA256(params.password);
    user.publicKey = publicKey;

    try {
        const userStore = await user.save();

        if (userStore) {
            res.status(200).send({
                id: userStore._id,
                privateKey: privateKey
            });
        }
        else {
            res.status(400).send({ msg: "User has not been created" });
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
}

/**
 * Handle to get all users request in MongoDB.
 * @param {Object} req 
 * @param {Object} res 
 * @returns Send response to the client.
 */
const getUsers = async (req, res) => {
    try {
        const users = await User.find();

        if (users) {
            res.status(200).send(users);
        }
        else {
            res.status(400).send({ msg: "Error obtaining users" });
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
}

/**
 * Handle to get a user request in MongoDB.
 * @param {Object} req 
 * @param {Object} res 
 * @returns Send response to the client.
 */
const getUser = async (req, res) => {
    const idUser = req.params.id;

    try {
        const user = await User.findById(idUser);

        if (user) {
            res.status(200).send({ alias: user.alias, publicKey: user.publicKey });
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
 * Handle to update a user request in MongoDB.
 * @param {Object} req 
 * @param {Object} res 
 * @returns Send response to the client.
 */
const updateUser = async (req, res) => {
    const idUser = req.params.id;
    const params = req.body;

    const r = checker.checkUpdateUser(params);

    if (!r.result) {
        res.status(400).send({ msg: "Have not specified any value to update" });
        return;
    }

    let newUser = {};

    if (r.alias) {
        newUser = { alias: r.alias };
    }
    if (r.password) {
        newUser = { ...newUser, password: r.password };
    }

    try {
        const user = await User.findByIdAndUpdate(idUser, newUser);

        if (user) {
            res.status(200).send({ msg: "User successfully updated" });
        }
        else {
            res.status(400).send({ msg: "The specified user could not be updated" });
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
}

/**
 * Handle to delete a user request in MongoDB.
 * @param {Object} req 
 * @param {Object} res 
 * @returns Send response to the client.
 */
const deleteUser = async (req, res) => {
    const idUser = req.params.id;

    try {
        const user = await User.findByIdAndDelete(idUser);

        if (user) {
            res.status(200).send({ msg: "User successfully deleted" });
        }
        else {
            res.status(400).send({ msg: "The specified user could not be deleted" });
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
}

module.exports = { createUser, getUsers, getUser, updateUser, deleteUser };