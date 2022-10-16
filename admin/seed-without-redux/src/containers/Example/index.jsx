import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ExampleCard from './components/ExampleCard';

const ExamplePage = () => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">Example Page One</h3>
      </Col>
    </Row>
    <Row>
      <ExampleCard />
    </Row>
  </Container>
);

export default ExamplePage;
