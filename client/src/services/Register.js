import axios from "axios";
import sha256 from "crypto-js/sha256";

const checkUser = (alias, password) => {
    if (alias.trim() === "") {
        return { result: false, msg: "Enter an alias." };
    }
    else if (alias.trim().length < 3) {
        return { result: false, msg: "Enter an alias of at least 3 characters." };
    }
    else if (password.trim() === "") {
        return { result: false, msg: "Enter a password." };
    }
    else if (password.trim().length < 6) {
        return { result: false, msg: "Enter a password of at least 6 characters." };
    }
    return { result: true, msg: "Account created succesfully." };
};

const registerUser = async (alias, password) => {
    const check = checkUser(alias, password);

    if (check.result) {
        const response = await axios.post("/api/user", {
            alias: alias,
            password: sha256(password).toString()
        });
        return await response.data;
    }
    else {
        return { msg: check.msg };
    }
};

export { registerUser };