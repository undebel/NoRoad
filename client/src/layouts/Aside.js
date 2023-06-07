import React, { useContext, useEffect, useState } from "react";
import { Button, ListGroup } from 'react-bootstrap';
import CreateRoom from "./CreateRoom";
import { userContext } from "../contexts/UserContext";
import { getUserInfo } from "../services/Login";
import { getRoom } from "../services/Room";
import { decryptMessage } from "../services/Message";
import Options from "./Options";
import moment from "moment";
import AdminPanel from "./AdminPanel";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faCircle } from '@fortawesome/free-solid-svg-icons';
import RemoveRoom from "./RemoveRoom";

function Aside(props) {
    const context = useContext(userContext);
    const [showNewRoom, setShowNewRoom] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [showAdminPanel, setShowAdminPanel] = useState(false);
    const [showRemoveRoom, setShowRemoveRoom] = useState(false);
    const [textMode, setTextMode] = useState("Gray mode");

    const showCreateRoom = () => {
        setShowOptions(false);
        setShowAdminPanel(false);
        setShowRemoveRoom(false);
        setShowNewRoom(true);
    };

    const hideNewRoom = () => {
        setShowNewRoom(false);
    };

    const showOptionsPanel = () => {
        setShowNewRoom(false);
        setShowAdminPanel(false);
        setShowRemoveRoom(false);
        setShowOptions(true);
    };

    const hideOptionsPanel = () => {
        setShowOptions(false);
    };

    const showAdminPanelControl = () => {
        setShowNewRoom(false);
        setShowOptions(false);
        setShowRemoveRoom(false);
        setShowAdminPanel(true);
    };

    const hideAdminPanelControl = () => {
        setShowAdminPanel(false);
    };

    const showRemoveRoomPanel = () => {
        setShowNewRoom(false);
        setShowOptions(false);
        setShowAdminPanel(false);
        setShowRemoveRoom(true);
    };

    const hideRemoveRoomPanel = () => {
        setShowRemoveRoom(false);
    };

    const logout = () => {
        context.user.socket.disconnect();
        context.removeUser();
    };

    const assignRoom = (e) => {
        const id = e.target.id;
        const selectedRoom = context.rooms.find(r => r._id === id);
        if (selectedRoom && context.selectedRoom?._id !== id) {
            const oldRooms = context.rooms.map((r) => {
                if (r._id === id && r.unread) {
                    r.unread = false;
                }
                return r;
            });
            context.setRooms(oldRooms);
            context.setSelectedRoom(selectedRoom);
            setShowRemoveRoom(false);
        }
    };

    const changeStyleColor = () => {
        context.changeStyleColor();
        if (textMode === "Gray mode") {
            setTextMode("Light mode");
        }
        else {
            setTextMode("Gray mode");
        }
    };

    useEffect(() => {
        const handleRooms = async (id) => {
            const room = await getRoom(id);
            const otherId = context.user.id === room.ownerId ? room.guestId : room.ownerId; // Check if the user is the owner of the room
            const userInfo = await getUserInfo(otherId);
            const newRoom = { ...room, userId: userInfo.userId, alias: userInfo.alias, publicKey: userInfo.publicKey };

            context.addRoom(newRoom);
        };

        const handleMessages = async (data) => {
            const newMessage = { me: false, date: data.date, message: decryptMessage(context.user.privateKey, data.message) };
            context.addMessage(data.roomId, newMessage);
        };

        const handleRemoveRoom = async (roomId) => {
            context.removeRoom(roomId);
        };

        context.user.socket.on("getRoom", handleRooms);
        context.user.socket.on("getMessage", handleMessages);
        context.user.socket.on("getRemoveRoom", handleRemoveRoom);

        return () => {
            context.user.socket.off("getRoom", handleRooms);
            context.user.socket.off("getMessage", handleMessages);
            context.user.socket.off("getRemoveRoom", handleRemoveRoom);
        };
    });

    return (
        <>
            {showNewRoom ? <CreateRoom hide={hideNewRoom} /> : null}
            {showOptions ? <Options hide={hideOptionsPanel} /> : null}
            {showAdminPanel ? <AdminPanel hide={hideAdminPanelControl} /> : null}
            {showRemoveRoom ? <RemoveRoom hide={hideRemoveRoomPanel} /> : null}
            <Button className="w-100 mt-2" onClick={showCreateRoom}>Create room</Button>
            <hr />
            <ListGroup style={{ minHeight: '65vh', maxHeight: '65vh', overflowY: 'scroll' }}>
                {context.rooms.map((room) => {
                    return (
                        <ListGroup.Item action variant={context.style.listVariant} className="d-flex align-items-center justify-content-between" key={room._id} id={room._id} onClick={assignRoom}>
                            {context.selectedRoom?._id === room._id ?
                                (<>
                                    <strong>{room.alias} - {moment(room.date).format("HH:mm DD/MM/YY")}</strong>
                                    <FontAwesomeIcon icon={faTrashAlt} style={{ color: 'red' }} onClick={showRemoveRoomPanel} />
                                </>)
                                : (<>
                                    {room.unread ? <FontAwesomeIcon icon={faCircle} style={{ color: 'green' }} /> : null}
                                    {' '}
                                    {`${room.alias} - ${moment(room.date).format("HH:mm DD/MM/YY")}`}
                                </>)}
                        </ListGroup.Item>

                    );
                })}
            </ListGroup>
            <hr />
            <Button className="w-100" onClick={changeStyleColor}>{textMode}</Button>
            {context.user.admin ? <Button className="w-100 mt-2" onClick={showAdminPanelControl}>Admin panel</Button> : null}
            <Button className="w-100 mt-2" onClick={showOptionsPanel}>My account</Button>
            <Button className="w-100 mt-2" onClick={logout}>Log out</Button>
        </>
    );
}

export default Aside;