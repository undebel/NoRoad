import React, { useState, useEffect, useContext } from "react";
import { Card, Button, ListGroup, Row, Col } from "react-bootstrap";
import { userContext } from "../contexts/UserContext";
import { getAllUsers, getAllRooms, getAllMessages, makeAdmin, deleteUser, deleteMessage, deleteRoom } from "../services/Admin";
import { removeRoom } from "../services/Room";
import moment from "moment";

function AdminPanel(props) {
    const context = useContext(userContext);
    const [stats, setStats] = useState({});
    const [lastStats, setLastStats] = useState({});
    const [users, setUsers] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [messages, setMessages] = useState([]);
    // Selected items
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [selectedMessage, setSelectedMessage] = useState(null);

    const setAllStats = (allUsers, allRooms, allMessages) => {
        setSelectedUser(null);
        setSelectedRoom(null);
        setSelectedMessage(null);

        const totalStats = {
            users: allUsers.length,
            rooms: allRooms.length,
            messages: allMessages.length / 2
        };
        setStats(totalStats);

        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

        const recentUsers = allUsers.filter(user => {
            const userCreationDate = new Date(user.date);
            return userCreationDate >= oneDayAgo;
        });

        const recentRooms = allRooms.filter(room => {
            const roomCreationDate = new Date(room.date);
            return roomCreationDate >= oneDayAgo;
        });

        const recentMessages = allMessages.filter(message => {
            const messageCreationDate = new Date(message.date);
            return messageCreationDate >= oneDayAgo;
        });

        const recentStats = {
            users: recentUsers.length,
            rooms: recentRooms.length,
            messages: recentMessages.length / 2
        };
        setLastStats(recentStats);

        setUsers(allUsers);
        setRooms(allRooms);
        setMessages(allMessages);
    };

    const handleInformation = async () => {
        const allUsers = await getAllUsers();
        const allRooms = await getAllRooms();
        const allMessages = await getAllMessages();

        setAllStats(allUsers, allRooms, allMessages);
    };

    useEffect(() => {
        handleInformation();
    }, []);

    const deleteSelectedUser = async () => {
        if (selectedUser) {
            await deleteUser(selectedUser._id);
        }
    };

    const deleteSelectedRoom = async () => {
        if (selectedRoom) {
            await removeRoom(selectedRoom._id, context.selectedRoom.ownerId, context.selectedRoom.guestId);
            await deleteRoom(selectedRoom._id);

            context.user.socket.emit("removeRoom", { to: context.selectedRoom.ownerId, roomId: selectedRoom._id });
            context.user.socket.emit("removeRoom", { to: context.selectedRoom.guestId, roomId: selectedRoom._id });
        }
    };

    const deleteSelectedMessage = async () => {
        if (selectedMessage) {
            await deleteMessage(selectedMessage._id);
        }
    };

    const makeAdminUser = async () => {
        if (selectedUser) {
            await makeAdmin(selectedUser._id);
        }
    };

    return (
        <Card bg={context.style.cardVariant} style={{ zIndex: 1, position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <Card.Body>
                <h3 className="text-center"><strong>Admin Panel</strong></h3>
                <hr />
                <Row>
                    {/* Users Column */}
                    <Col>
                        <h5 className="text-center"><strong>Total users:</strong> {stats.users}</h5>
                        <h5 className="text-center"><strong>New users last 24h:</strong> {lastStats.users}</h5>
                        <hr />
                        <h4 className="text-center">Users</h4>
                        <ListGroup style={{ minHeight: '50vh', maxHeight: '50vh', overflowY: 'scroll' }}>
                            {users.map(user => (
                                <ListGroup.Item action variant={context.style.listVariant} key={user._id} onClick={() => setSelectedUser(user)}>
                                    {selectedUser?._id === user._id ?
                                        <strong>{user._id} - {user.alias}{user.admin ? " - Administrator" : ""}</strong>
                                        : `${user._id} - ${user.alias}${user.admin ? " - Administrator" : ""}`}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                        <Button className="w-100 mt-1" onClick={makeAdminUser}>Make admin</Button>
                        <Button className="w-100 mt-1" variant="danger" onClick={deleteSelectedUser}>Delete user</Button>
                    </Col>

                    {/* Rooms Column */}
                    <Col>
                        <h5 className="text-center"><strong>Total rooms:</strong> {stats.rooms}</h5>
                        <h5 className="text-center"><strong>New rooms last 24h:</strong> {lastStats.rooms}</h5>
                        <hr />
                        <h4 className="text-center">Rooms</h4>
                        <ListGroup style={{ minHeight: '50vh', maxHeight: '50vh', overflowY: 'scroll' }}>
                            {rooms.map(room => (
                                <ListGroup.Item action variant={context.style.listVariant} key={room._id} onClick={() => setSelectedRoom(room)}>
                                    {selectedRoom?._id === room._id ?
                                        <strong>{room._id} - {room.ownerId} & {room.guestId}</strong>
                                        : `${room._id} - ${room.ownerId} & ${room.guestId}`}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                        <Button className="w-100 mt-1" variant="danger" onClick={deleteSelectedRoom}>Delete room</Button>
                    </Col>

                    {/* Messages Column */}
                    <Col>
                        <h5 className="text-center"><strong>Total messages:</strong> {stats.messages}</h5>
                        <h5 className="text-center"><strong>New messages last 24h:</strong> {lastStats.messages}</h5>
                        <hr />
                        <h4 className="text-center">Messages</h4>
                        <ListGroup style={{ minHeight: '50vh', maxHeight: '50vh', overflowY: 'scroll' }}>
                            {messages.map(message => (
                                <ListGroup.Item action variant={context.style.listVariant} key={message._id} onClick={() => setSelectedMessage(message)}>
                                    {selectedMessage?._id === message._id ?
                                        <strong>{message._id} - {moment(message.date).format("HH:mm DD/MM/YY")}</strong>
                                        : `${message._id} - ${moment(message.date).format("HH:mm DD/MM/YY")}`}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                        <Button className="w-100 mt-1" variant="danger" onClick={deleteSelectedMessage}>Delete message</Button>
                    </Col>
                </Row>
                <hr />
                <Button className="w-100" variant="primary" onClick={handleInformation}>Update information</Button>
                <Button className="w-100 mt-1" variant="danger" onClick={props.hide}>Close</Button>
            </Card.Body>
        </Card>
    );
}

export default AdminPanel;