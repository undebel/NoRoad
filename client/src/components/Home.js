import React from "react";
import Footer from "../layouts/Footer";
import NavBar from "../layouts/NavBar";
import { Container, Row, Col, Image } from "react-bootstrap";
import image from "../images/home.jpg";

function Home(props) {
    return (
        <>
            <NavBar/>
            <Container className="text-center my-5 text-white">
                <h1 className="display-4">NoRoad</h1>
                <p className="lead">Your secure and anonymous instant messaging platform.</p>
                <Row className="justify-content-center my-5">
                    <Col xs="auto">
                        <Image src={image} roundedCircle style={{ maxWidth: "50%", width: "100%" }}/>
                    </Col>
                </Row>
                <p className="lead bg-dark rounded p-1">
                Discover how to communicate anonymously and completely securely with other people 
                without worrying about strangers looking at you.
                </p>
            </Container>
            <Footer/>
        </>
    );
}

export default Home;