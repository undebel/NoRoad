import React from "react";
import { Form, FormControl, Button, Card } from "react-bootstrap";

function CreateRoom(props) {
    return (
        <Card style={{ zIndex: 1, position: "absolute", top: "25%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <Card.Body>
                <h3 className="text-center">Create a new room with a user</h3>
                <Form className="mt-4">
                    <FormControl type="text" name="id" placeholder="Enter the user ID" />
                    <div className="d-grid gap-2">
                        <Button className="mt-3">Create room</Button>
                        <Button variant="danger" onClick={props.hide}>Close</Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default CreateRoom;