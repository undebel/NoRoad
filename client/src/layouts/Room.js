import React from "react";

function Room(props) {
    return (
        <>
            <h3>{selectedUser.name}</h3>
            <hr />
            <Row>
                <Col xs={6}>
                <p>Recibido</p>
                </Col>
                <Col xs={6}>
                <p>Enviado</p>
                </Col>
            </Row>
            <hr />
            <Form>
                <Form.Group>
                    <Form.Control type="text" value={message} onChange={handleMessageChange} />
                    <Button onClick={handleMessageSubmit}>Enviar</Button>
                </Form.Group>
            </Form>
        </>
    );
}

export default Room;