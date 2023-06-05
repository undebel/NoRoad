import React, { useContext } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { userContext } from "../contexts/UserContext";

function EmptyRoom(props) {
    const context = useContext(userContext);
    return (
        <Container fluid className="d-flex align-items-center justify-content-center h-75">
            <Row>
                <Col className="text-center">
                    <Card border="primary" bg={context.style.cardVariant} style={{ borderWidth: "5px" }}>
                        <Card.Body style={{ color: "black", padding: "30px" }}>
                            <h2 style={{ fontFamily: "Arial, sans-serif", fontSize: "48px", fontWeight: "bold" }}>NoRoad - Dashboard</h2>
                            <h3 style={{ fontFamily: "Arial, sans-serif", fontSize: "36px", fontWeight: "bold" }}>Select or create a new room</h3>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default EmptyRoom;