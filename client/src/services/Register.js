import axios from "axios";

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
    return { result: true };
};

const registerUser = async (alias, password) => {
    const check = checkUser(alias, password);

    if (check.result) {
        const response = await axios.post("/api/user", {
            alias,
            password
        });
        return await response.data;
    }
    else {
        return { msg: check.msg };
    }
};

export { registerUser };