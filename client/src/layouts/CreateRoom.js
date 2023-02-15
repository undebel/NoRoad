import React, { useContext, useState } from "react";
import { Form, FormControl, Button, Card, Alert } from "react-bootstrap";
import { userContext } from "../contexts/UserContext";
import { createRoom } from "../services/Room";

function CreateRoom(props) {
    const context = useContext(userContext);
    const [ alert, setAlert ] = useState(null);

    const showAlert = (a, seconds = 4) => {
        setAlert(a);
        setTimeout(() => {
            setAlert(null);
        }, seconds * 1000);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const { user } = context;
        const guestId = e.target.id.value.trim();
      
        if (!guestId || user.id === guestId) {
            return showAlert({ msg: "Please enter a valid user ID.", variant: "danger" });
        }
      
        try {
            const { msg, ...data } = await createRoom(user.id, guestId);
        
            if (msg) {
                return showAlert({ msg, variant: "danger" });
            }
        
            context.assignUser({ ...user, rooms: [...user.rooms, data] });
            props.hide();
        } catch (error) {
            showAlert({ msg: "Error creating room, please check the user ID.", variant: "danger" });
        }
    };

    return (
        <Card style={{ zIndex: 1, position: "absolute", top: "25%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <Card.Body>
                <h3 className="text-center">Create a new room with a user</h3>
                {alert && <Alert className="text-center" key={alert.variant} variant={alert.variant}>{alert.msg}</Alert>}
                <Form className="mt-4" onSubmit={handleFormSubmit}>
                    <FormControl type="text" name="id" placeholder="Enter the user ID" />
                    <div className="d-grid gap-2">
                        <Button type="submit" className="mt-3">Create room</Button>
                        <Button variant="danger" onClick={props.hide}>Close</Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default CreateRoom;