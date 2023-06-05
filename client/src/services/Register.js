import axios from "axios";

// The function that check a new user.
const checkUser = (alias, password, confirmPassword) => {
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
    else if (password !== confirmPassword) {
        return { result: false, msg: "Passwords do not match." };
    }
    return { result: true };
};

// The function that sends a http request to create a new user.
const registerUser = async (alias, password, confirmPassword) => {
    const check = checkUser(alias, password, confirmPassword);

    if (check.result) {
        const response = await axios.post("/api/user", {
            alias,
            password
        });
        return response.data;
    }
    else {
        return { msg: check.msg };
    }
};

const updateUserAlias = async (id, alias) => {
    const response = await axios.put(`/api/user/${id}`, {
        alias
    });
    return response.data;
};

const updateUserPassword = async (id, password) => {
    const response = await axios.put(`/api/user/${id}`, {
        password
    });
    return response.data;
};

export { registerUser, updateUserAlias, updateUserPassword };