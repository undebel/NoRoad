import React from "react";
import { Row, Col, Form, Button, Container, ListGroup, Card } from "react-bootstrap";

function Room(props) {
    /* NOT IMPLEMENTED YED */
    const messages = [
        {
            from: "user",
            text: "Not"
        },
        {
            from: "guest",
            text: "Implemented"
        },
        {
            from: "user",
            text: "Yet"
        }
    ];
    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={12}>
                <h3 className="text-center mt-1 text-white">User</h3>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col xs={12}>
                    <Card style={{ minHeight: '65vh', maxHeight: '65vh', overflowY: 'scroll' }}>
                        <ListGroup variant="flush">
                            {messages.map((message, index) => (
                                <ListGroup.Item key={index}>
                                    <Row>
                                        {message.from === "user" ? (
                                        <Col xs={6}>
                                            <strong>User:</strong> {message.text}
                                        </Col>
                                        ) : (
                                        <Col xs={6} className="text-right">
                                            <strong>Me:</strong> Implemented
                                        </Col>
                                        )}
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            <hr />
            <Row className="justify-content-center mt-3">
                <Form className="mt-3">
                    <Form.Group className="d-flex">
                        <Form.Control as="textarea" style={{ minHeight: "10vh", height: "auto", maxHeight: "15vh", marginRight: "10px" }}/>
                        <Button>Send</Button>
                    </Form.Group>
                </Form>
            </Row>
        </Container>
    );
}

export default Room;