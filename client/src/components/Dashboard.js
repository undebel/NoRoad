import React, { useContext } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { Navigate } from "react-router-dom";
import { userContext } from "../contexts/UserContext";
import Aside from "../layouts/Aside";
import Room from "../layouts/Room";
import EmptyRoom from "../layouts/EmptyRoom";

function Dashboard(props) {
    const context = useContext(userContext);

    // Check if the user is logged.
    if (!context.user) {
        return <Navigate to="/login"/>;
    }

    return (
        <Container fluid>
            <Row>
                <Col xs={12}>
                    <h1 className="text-center mt-2" style={{ backgroundColor: "white", borderRadius: "10px" }}>ENTER YOU AD HERE!! Contact us!</h1>
                </Col>
            </Row>
            <Row>
                <Col xs={3}>
                    <Aside/>
                </Col>
                <Col xs={9}>
                    {context.selectedRoom ? <Room/> : <EmptyRoom/>}
                </Col>
            </Row>
        </Container>
    );
}

export default Dashboard;