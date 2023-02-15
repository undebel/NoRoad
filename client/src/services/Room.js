import axios from "axios";

const createRoom = async (id, guestId) => {
    const result = await axios.post("/api/room", {
        id,
        guestId
    });
    return result.data;
};

export { createRoom };