import React from "react";
import { Row, Col, Form, Button, Container, ListGroup, Card } from "react-bootstrap";

function Room(props) {
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
                <h3 className="text-center mt-1">User</h3>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col xs={12}>
                    <Card style={{ minHeight: '60vh', maxHeight: '60vh', overflowY: 'scroll' }}>
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
                <Col xs={12}>
                    <Form>
                        <Form.Group className="d-flex">
                            <Form.Control type="text"/>
                            <Button>Enviar</Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            </Container>
    );
}

export default Room;