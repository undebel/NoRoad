import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <Container fluid className="bg-dark text-light py-3 rounded mt-5">
      <Row>
        <Col sm={12} md={6}>
          <p style={{ fontSize: '20px' }}><strong>Contact us</strong></p>
          <p><b>Email:</b> davidvillaplana.alu@iespacomolla.es</p>
          <p><b>Email:</b> alejandrocorcino.alu@iespacomolla.es</p>
        </Col>
        <Col sm={12} md={6}>
          <p style={{ fontSize: '20px' }}><strong>Follow us</strong></p>
          <p>Facebook</p>
          <p>Twitter</p>
          <p>Instagram</p>
        </Col>
      </Row>
      <Row>
        <Col className="text-center mt-2">
          <p>NoRoad © 2023</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;