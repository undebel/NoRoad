const User = require("../models/user");
const checker = require("../libraries/checker");
const rsa = require("../libraries/rsa");

/**
 * Handle the login request in MongoDB.
 * @param {Object} req 
 * @param {Object} res 
 * @returns Send response to the client.
 */
const login = async (req, res) => {
    const { id, password, privateKeyHash } = req.body;

    const r = checker.checkLogin(id, password);

    if (!r.result) {
        res.status(200).send({ msg: r.msg });
        return;
    }

    try {
        const user = await User.findById(id);

        if (user && user.password === rsa.toSHA256(password)) {
            if (user.privateKeyHash === privateKeyHash) {
                res.status(200).send({ alias: user.alias, admin: user.admin, rooms: user.rooms, publicKey: user.publicKey });
            }
            else {
                res.status(200).send({ msg: "The private key has been altered! You must recover it to read your messages again." });
            }
        }
        else {
            res.status(200).send({ msg: "Invalid ID or password." });
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
};

module.exports = { login };