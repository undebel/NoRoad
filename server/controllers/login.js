const User = require("../models/user");
const checker = require("../libraries/checker");

const login = async (req, res) => {
    const { id, password } = req.body;

    const r = checker.checkLogin(id, password);

    if (!r.result) {
        res.status(400).send({ msg: r.msg });
        return;
    }

    try {
        const user = await User.findById(id);

        if (user && user.password === password) {
            res.status(200).send({ msg: "You are successfully logged in", alias: user.alias, rooms: user.rooms });
        }
        else {
            res.status(400).send({ msg: "Invalid ID or password" });
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
};

module.exports = { login };