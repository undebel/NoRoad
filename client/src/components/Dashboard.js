import React, { useContext, useState } from "react";
import { Button, ListGroup, Container, Row, Col, Form } from 'react-bootstrap';
import { Navigate } from "react-router-dom";
import { userContext } from "../contexts/UserContext";
import Aside from "../layouts/Aside";

function Dashboard(props) {
    const context = useContext(userContext);

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
                    
                </Col>
            </Row>
        </Container>
    );
}

export default Dashboard;