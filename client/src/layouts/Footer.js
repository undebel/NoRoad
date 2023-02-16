import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <Container fluid className="bg-dark text-light py-1 rounded mt-5">
      <Row>
        <Col sm={12} md={6}>
          <p style={{ fontSize: '16px' }}><strong>Contact us</strong></p>
          <p style={{ fontSize: '14px' }}><b>Email:</b> davidvillaplana.alu@iespacomolla.es</p>
          <p style={{ fontSize: '14px' }}><b>Email:</b> alejandrocorcino.alu@iespacomolla.es</p>
        </Col>
        <Col sm={12} md={6}>
          <p style={{ fontSize: '16px' }}><strong>Follow us</strong></p>
          <p style={{ fontSize: '14px' }}>Facebook</p>
          <p style={{ fontSize: '14px' }}>Twitter</p>
        </Col>
      </Row>
      <Row>
        <Col className="text-center mt-1">
          <p style={{ fontSize: '14px' }}>NoRoad © 2023</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;