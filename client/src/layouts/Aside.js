import React, { useContext, useEffect, useState } from "react";
import { Button, ListGroup } from 'react-bootstrap';
import CreateRoom from "./CreateRoom";
import { userContext } from "../contexts/UserContext";
import { getUserInfo } from "../services/Login";
import axios from "axios";

function Aside(props) {
    const context = useContext(userContext);
    const [ showNewRoom, setShowNewRoom ] = useState(false);

    const showCreateRoom = () => {
        setShowNewRoom(true);
    };

    const hideNewRoom = () => {
        setShowNewRoom(false);
    };

    const logout = () => {
        context.user.socket.disconnect();
        context.removeUser();
    };
    
    useEffect(() => {
        context.user.socket.on("getRoom", async id => {
            let result = await axios.get(`/api/room/${id}`);
            const otherId = context.user.id === result.data.ownerId ? result.data.guestId : result.data.ownerId; // Check if the user is the owner of the room
            const userInfo = await getUserInfo(otherId);
            let room = { ...result.data, alias: userInfo.alias, publicKey: userInfo.publicKey };
            context.addRoom(room);
        });
    }, [context.user.id]);

    return (
        <>
            {showNewRoom ? <CreateRoom hide={hideNewRoom}/> : null}
            <Button className="w-100 mt-2" onClick={showCreateRoom}>Create room</Button>
            <hr />
            <ListGroup style={{ minHeight: '65vh', maxHeight: '65vh', overflowY: 'scroll' }}>
                {context.user.rooms.map((room) => {
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