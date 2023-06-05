import React, { useState, createContext } from "react";
import { getMessage } from "../services/Message";
import { decryptMessage } from "../services/Message";

const userContext = createContext();

const UserContext = (props) => {
    const [user, setUser] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [style, setStyle] = useState({
        listVariant: "light",
        cardVariant: "light",
        textAreaBg: ""
    });

    const removeUser = () => {
        setUser(null);
        setRooms([]);
        setSelectedRoom(null);
    };

    const assignUser = (user) => {
        // Check if object contains the id, rooms and private key for prevent errors.
        if (user.id && user.rooms && user.privateKey) {
            setUser(user);
        }
        else {
            removeUser();
        }
    };

    const assignRooms = async (rooms, myId, privateKey) => {
        let updatedRooms = [];
        for (let room of Object.values(rooms)) {
            let allMessages = [];

            const processMessages = (msgs, isBackup) => {
                const relevantMessages = msgs
                    .filter(msg => msg.isBackup === isBackup)
                    .map(msg => ({
                        me: isBackup,
                        date: msg.date,
                        message: decryptMessage(privateKey, msg.message)
                    }));
                allMessages.push(...relevantMessages);
            };

            room.ownerMessages = await Promise.all(Object.values(room.ownerMessages).map(getMessage));
            room.guestMessages = await Promise.all(Object.values(room.guestMessages).map(getMessage));

            const isOwner = room.ownerId === myId;
            processMessages(room.ownerMessages, isOwner);
            processMessages(room.guestMessages, !isOwner);

            // Sort allMessages based on the date
            allMessages.sort((a, b) => new Date(a.date) - new Date(b.date));

            room.allMessages = allMessages;

            updatedRooms.push(room);
        }
        // Sort updatedRooms based on the date
        updatedRooms.sort((a, b) => new Date(b.date) - new Date(a.date));
        setRooms(updatedRooms);
    };

    const addRoom = (room) => {
        room.allMessages = [];
        setRooms([room, ...rooms]);
    };

    const addMessage = (roomId, message) => {
        if (selectedRoom) {
            setSelectedRoom(prevSelectedRoom => {
                if (roomId === prevSelectedRoom._id) {
                    return {
                        ...prevSelectedRoom,
                        allMessages: [...prevSelectedRoom.allMessages, message]
                    };
                }
                return prevSelectedRoom;
            });
        }

        setRooms(prevRooms => {
            return prevRooms.map(r => {
                if (r._id === roomId) {
                    return {
                        ...r,
                        allMessages: [...r.allMessages, message]
                    };
                }
                return r;
            });
        });
    };

    const changeStyleColor = () => {
        if (style.listVariant === "light") {
            setStyle({
                listVariant: "dark",
                cardVariant: "secondary",
                textAreaBg: "#D4D3D3"
            });
        }
        else {
            setStyle({
                listVariant: "light",
                cardVariant: "light",
                textAreaBg: ""
            });
        }
    };

    const removeRoom = (roomId) => {
        setRooms(prevRooms => prevRooms.filter(room => room._id !== roomId));
        if (selectedRoom?._id === roomId) {
            setSelectedRoom(null);
        }
    };

    const userData = { user, removeUser, assignUser, rooms, assignRooms, addRoom, removeRoom, selectedRoom, setSelectedRoom, addMessage, style, changeStyleColor };

    return (
        <userContext.Provider value={userData}>
            {props.children}
        </userContext.Provider>
    );
};

export default UserContext;

export { userContext };