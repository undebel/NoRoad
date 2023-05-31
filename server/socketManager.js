const socketIo = require("socket.io");

class SocketManager {
    constructor(server) {
        this.server = server;
        this.io = null;
    }

    initialize(onlineUsers) {
        this.io = socketIo(this.server, {
            cors: { origin: "*" }
        });

        this.io.on("connection", (socket) => {
            socket.on("addUser", (userId) => {
                onlineUsers.set(userId, socket.id);
            });

            socket.on("addRoom", (data) => {
                const sendUserSocket = onlineUsers.get(data.to);
                if (sendUserSocket) {
                    socket.to(sendUserSocket).emit("getRoom", data.id);
                }
            });

            socket.on("disconnect", () => {
                for (const [userId, socketId] of onlineUsers) {
                    if (socketId === socket.id) {
                        onlineUsers.delete(userId);
                        break;
                    }
                }
            });
        });
    }
}

module.exports = SocketManager;