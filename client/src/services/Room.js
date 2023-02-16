import axios from "axios";

// The function that creates a new room
const createRoom = async (id, guestId) => {
    const result = await axios.post("/api/room", {
        id,
        guestId
    });
    return result.data;
};

export { createRoom };