import React, { useState } from "react";
import { Form, FormControl, Button, Card, Alert } from "react-bootstrap";

function CreateRoom(props) {
    const [ alert, setAlert ] = useState(null);

    const showAlert = (a, seconds = 4) => {
        setAlert(a);
        setTimeout(() => {
            setAlert(null);
        }, seconds * 1000);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const id = e.target.id.value;

        if (id.trim() === "") {
            showAlert({ msg: "Please enter a valid user ID.", variant: "danger" });
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