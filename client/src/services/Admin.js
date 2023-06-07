import axios from "axios";

const getAllUsers = async () => {
    const result = await axios.get("/api/users");
    return result.data;
};

const getAllRooms = async () => {
    const result = await axios.get("/api/rooms");
    return result.data;
};

const getAllMessages = async () => {
    const result = await axios.get("/api/messages");
    return result.data;
};

const makeAdmin = async (id) => {
    const result = await axios.put(`/api/user/${id}`, {
        admin: true
    });
    return result.data;
};

const deleteUser = async (id) => {
    const result = await axios.delete(`/api/user/${id}`);
    return result.data;
};

const deleteRoom = async (id) => {
    const result = await axios.delete(`/api/room/${id}`);
    return result.data;
};

const deleteMessage = async (id) => {
    const result = await axios.delete(`/api/message/${id}`);
    return result.data;
};

export { getAllUsers, getAllRooms, getAllMessages, makeAdmin, deleteUser, deleteRoom, deleteMessage };