import axios from "axios";

// The function that checks if file contains id and the password.
const checkUser = (file, password) => {
    if (file.id?.trim() === "" || file.privateKey?.trim() === "") {
        return { result: false, msg: "The file you have selected is corrupted." };
    }
    else if (password.trim() === "") {
        return { result: false, msg: "Enter a password." };
    }
    return { result: true };
};

// The function that send http request to the login api.
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

// The function that get alias and public key of a user.
const getUserInfo = async (id) => {
    let result = await axios.get(`/api/user/${id}`);
    return { alias: result.data.alias, publicKey: result.data.publicKey };
}

// The function that get rooms of a user.
const fetchRooms = async (id) => {
    const response = await axios.get(`/api/rooms/user/${id}`);
    return await getRooms(response.data.rooms, id);
};

// The function that get room of an id array.
const getRooms = async (allId, myId) => {
    if (allId && allId.length === 0) {
        return [];
    }
    const rooms = await Promise.all(allId.map(async id => {
        let result = await axios.get(`/api/room/${id}`);
        const otherId = myId === result.data.ownerId ? result.data.guestId : result.data.ownerId; // Check if the user is the owner of the room
        const userInfo = await getUserInfo(otherId);
        result.data = { ...result.data, alias: userInfo.alias, publicKey: userInfo.publicKey };
        return result.data;
    }));
    
    return rooms;
};

export { loginUser, getRooms, fetchRooms, getUserInfo };