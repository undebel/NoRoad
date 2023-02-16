import React, { useContext, useEffect, useState } from "react";
import { Button, ListGroup } from 'react-bootstrap';
import CreateRoom from "./CreateRoom";
import { userContext } from "../contexts/UserContext";
import { fetchRooms } from "../services/Login";

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
        context.removeUser();
    };

    useEffect(() => {
        // Get the rooms every 10 seconds - Will be replaced by WebSockets
        const intervalId = setInterval(async () => {
            const rooms = await fetchRooms(context.user.id);
            context.assignUser({ ...context.user, rooms: rooms});
        }, 10000);
        return () => clearInterval(intervalId);
    }, []);

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