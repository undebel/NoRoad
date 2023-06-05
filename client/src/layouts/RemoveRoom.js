import React, { useContext } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { userContext } from "../contexts/UserContext";
import { removeRoom } from "../services/Room";

function RemoveRoom(props) {
    const context = useContext(userContext);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const roomId = context.selectedRoom._id;
        const userId = context.selectedRoom.ownerId;
        const otherId = context.selectedRoom.guestId;

        await removeRoom(roomId, userId, otherId);

        const otherUser = context.user.id === userId ? otherId : userId;
        context.user.socket.emit("removeRoom", { to: otherUser, roomId });

        context.removeRoom(roomId);

        props.hide();
    };

    return (
        <Card bg={context.style.cardVariant} style={{ zIndex: 1, position: "absolute", top: "25%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <Card.Body>
                <h3 className="text-center">Are you sure you want to delete the room?</h3>
                <h5 className="text-center mt-4"><strong>Room ID:</strong> {context.selectedRoom._id}</h5>
                <Form className="mt-2" onSubmit={handleFormSubmit}>
                    <div className="d-grid gap-2">
                        <Button type="submit" className="mt-3">Delete room</Button>
                        <Button variant="danger" onClick={props.hide}>Cancel</Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default RemoveRoom;