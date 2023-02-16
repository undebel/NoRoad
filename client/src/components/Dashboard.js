import React, { useContext } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { Navigate } from "react-router-dom";
import { userContext } from "../contexts/UserContext";
import Aside from "../layouts/Aside";
import Room from "../layouts/Room";

function Dashboard(props) {
    const context = useContext(userContext);

    // Check if the user is logged.
    if (!context.user) {
        return <Navigate to="/login"/>;
    }

    return (
        <Container fluid>
            <Row>
                <Col xs={3}>
                    <Aside/>
                </Col>
                <Col xs={9}>
                    <Room/>
                </Col>
            </Row>
        </Container>
    );
}

export default Dashboard;