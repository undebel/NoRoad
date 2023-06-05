import axios from "axios";

// The function that creates a new room
const createRoom = async (id, guestId) => {
    const result = await axios.post("/api/room", {
        id,
        guestId
    });
    return result.data;
};

const getRoom = async (id) => {
    const result = await axios.get(`/api/room/${id}`);
    return result.data;
};

const removeRoom = async (roomId, userId, otherId) => {
    const result = await axios.post(`/api/user/room/${roomId}`, {
        userId,
        otherId
    });
    return result.data;
}

export { createRoom, getRoom, removeRoom };