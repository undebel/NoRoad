const socketIo = require("socket.io");

class SocketManager {
    constructor(server) {
        this.server = server;
        this.io = null;
    }

    initialize(onlineUsers) {
        this.io = socketIo(this.server, {
            cors: { origin: "*" },
            pingTimeout: 10000,
            pingInterval: 5000
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

            socket.on("addMessage", (data) => {
                const sendUserSocket = onlineUsers.get(data.to);
                if (sendUserSocket) {
                    socket.to(sendUserSocket).emit("getMessage", { roomId: data.roomId, date: data.date, message: data.message });
                }
            });

            socket.on("removeRoom", (data) => {
                const sendUserSocket = onlineUsers.get(data.to);
                if (sendUserSocket) {
                    socket.to(sendUserSocket).emit("getRemoveRoom", data.roomId);
                }
            })

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