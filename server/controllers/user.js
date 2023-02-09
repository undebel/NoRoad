const User = require("../models/user");
const rsa = require("../libraries/rsa");
const checker = require("../libraries/checker");

const createUser = async (req, res) => {
    const { publicKey, privateKey } = rsa.generateRSAKeys();

    const user = new User();
    const params = req.body;

    const r = checker.checkCreateUser(params);

    if (!r.result) {
        res.status(400).send({ msg: r.msg });
        return;
    }

    user.alias = params.alias;
    user.password = params.password;
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

const getUser = async (req, res) => {
    const idUser = req.params.id;

    try {
        const user = await User.findById(idUser);

        if (user) {
            res.status(200).send(user);
        }
        else {
            res.status(400).send({ msg: "The specified user has not been found" });
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
}

const updateUser = async (req, res) => {
    const idUser = req.params.id;
    const params = req.body;

    // TODO: Check data before update
    try {
        const user = await User.findByIdAndUpdate(idUser, params);

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