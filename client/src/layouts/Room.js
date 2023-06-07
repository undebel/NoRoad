import React, { useContext, useEffect, useRef, useState } from "react";
import { Row, Col, Form, Button, Container, ListGroup, Card } from "react-bootstrap";
import { userContext } from "../contexts/UserContext";
import { createMessage, addMessageToRoom, encryptMessage } from "../services/Message";
import moment from "moment";

function Room(props) {
    const context = useContext(userContext);
    const [messageText, setMessageText] = useState("");
    const endOfMessageRef = useRef(null);
    const maxCharsAllowed = 15000;

    const assignMessages = (message) => {
        context.addMessage(context.selectedRoom._id, message);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (messageText.trim() === "" || messageText.length > maxCharsAllowed) {
            return;
        }

        const encryptedMyMessage = encryptMessage(context.user.publicKey, messageText);
        const encryptedOtherMessage = encryptMessage(context.selectedRoom.publicKey, messageText);
        try {
            const myBackup = await createMessage(true, encryptedMyMessage);
            const noBackup = await createMessage(false, encryptedOtherMessage);

            await Promise.all([
                addMessageToRoom(context.selectedRoom._id, myBackup._id, context.selectedRoom.ownerId === context.user.id),
                addMessageToRoom(context.selectedRoom._id, noBackup._id, context.selectedRoom.ownerId === context.user.id)
            ]);

            const newMessage = { me: true, date: myBackup.date, message: messageText };

            context.user.socket.emit("addMessage", { to: context.selectedRoom.userId, roomId: context.selectedRoom._id, date: noBackup.date, message: encryptedOtherMessage });

            assignMessages(newMessage);
        }
        catch (error) {
            
        }

        setMessageText("");
    };

    const handleTextareaChange = (e) => {
        let msg = e.target.value;
        if (msg.length > maxCharsAllowed) {
            msg = msg.slice(0, maxCharsAllowed);
        }
        setMessageText(msg);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(e);
        }
    };

    useEffect(() => {
        endOfMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [context.selectedRoom.allMessages]);

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={12}>
                    <h3 className="text-center text-white">{context.selectedRoom.alias}</h3>
                    <h6 className="text-center mt-1 text-white">User ID: {context.selectedRoom.userId} | Room ID: {context.selectedRoom._id}</h6>
                </Col>
            </Row>
            <hr style={{ marginTop: "-4px" }} />
            <Row>
                <Col xs={12}>
                    <Card bg={context.style.cardVariant} style={{ minHeight: '65vh', maxHeight: '65vh', overflowY: 'scroll' }}>
                        <ListGroup variant="flush">
                            {context.selectedRoom.allMessages.map((message, index) => (
                                <ListGroup.Item variant={context.style.listVariant} key={index} style={{ whiteSpace: "pre-wrap" }}>
                                    <Row>
                                        {message.me ? (
                                            <Col xs={10}>
                                                <strong>Me:</strong> {message.message}
                                            </Col>
                                        ) : (
                                            <Col xs={10}>
                                                <strong>{context.selectedRoom.alias}:</strong> {message.message}
                                            </Col>
                                        )}
                                        <Col xs={2}>
                                            <strong>{moment(message.date).format("HH:mm - DD/MM")}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                            <div ref={endOfMessageRef} />
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            <hr />
            <Row className="justify-content-center mt-3">
                <Form className="mt-3">
                    <Form.Group className="d-flex">
                        <Form.Control
                            as="textarea"
                            value={messageText}
                            onChange={handleTextareaChange}
                            onKeyDown={handleKeyDown}
                            style={{ minHeight: "10vh", height: "auto", maxHeight: "15vh", marginRight: "10px", backgroundColor: context.style.textAreaBg }}
                            placeholder="Send a message."
                        />
                        <Button onClick={handleSendMessage}>Send</Button>
                    </Form.Group>
                    <Form.Text>
                        <strong style={{ color: "white", fontSize: "15px" }}>Maximum {messageText.length}/{maxCharsAllowed} characters allowed.</strong>
                    </Form.Text>
                </Form>
            </Row>
        </Container>
    );
}

export default Room;