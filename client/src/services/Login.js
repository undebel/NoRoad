import axios from "axios";

const checkUser = (file, password) => {
    if (file.id?.trim() === "" || file.privateKey?.trim() === "") {
        return { result: false, msg: "The file you have selected is corrupted." };
    }
    else if (password.trim() === "") {
        return { result: false, msg: "Enter a password." };
    }
    return { result: true };
};

const loginUser = async (file, password) => {
    const check = checkUser(file, password);

    if (check.result) {
        const response = await axios.post("/api/login", {
            id: file.id,
            password
        });
        let data = await response.data;
        data = { ...data, id: file.id, privateKey: file.privateKey };
        return data;
    }
    else {
        return { msg: check.msg };
    }
};

export { loginUser };