import React, { useContext, useEffect, useState } from "react";
import { Button, ListGroup } from 'react-bootstrap';
import CreateRoom from "./CreateRoom";
import { userContext } from "../contexts/UserContext";
import { getUserInfo } from "../services/Login";
import axios from "axios";

function Aside(props) {
    const context = useContext(userContext);
    const [ showNewRoom, setShowNewRoom ] = useState(false);
    const [ rooms, setRooms ] = useState(context.user.rooms);

    const showCreateRoom = () => {
        setShowNewRoom(true);
    };

    const hideNewRoom = () => {
        setShowNewRoom(false);
    };

    const addRoom = (room) => {
        setRooms([ ...rooms, room ]);
    };

    const logout = () => {
        context.user.socket.disconnect();
        context.removeUser();
    };
    
    useEffect(() => {
        const handleRooms = async (id) => {
            let result = await axios.get(`/api/room/${id}`);
            const otherId = context.user.id === result.data.ownerId ? result.data.guestId : result.data.ownerId; // Check if the user is the owner of the room
            const userInfo = await getUserInfo(otherId);
            let room = { ...result.data, alias: userInfo.alias, publicKey: userInfo.publicKey };

            addRoom(room);
        };
        
        context.user.socket.on("getRoom", handleRooms);

        return () => {
            context.user.socket.off("getRoom", handleRooms);
        };
    }, []);

    return (
        <>
            {showNewRoom ? <CreateRoom hide={hideNewRoom} addRoom={addRoom}/> : null}
            <Button className="w-100 mt-2" onClick={showCreateRoom}>Create room</Button>
            <hr />
            <ListGroup style={{ minHeight: '65vh', maxHeight: '65vh', overflowY: 'scroll' }}>
                {rooms.map((room) => {
                    return (
                        <ListGroup.Item className="text-center" key={room._id}>
                            {room.alias}
                        </ListGroup.Item>
                    );
                })}
            </ListGroup>
            <hr />
            <Button className="w-100">Dark mode</Button>
            <Button className="w-100 mt-2">Options</Button>
            <Button className="w-100 mt-2" onClick={logout}>Log out</Button>
        </>
    );
}

export default Aside;