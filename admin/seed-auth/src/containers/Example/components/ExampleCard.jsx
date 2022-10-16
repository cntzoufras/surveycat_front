import React from 'react';
import { Col } from 'react-bootstrap';
import {
  Card, CardBody, CardTitle, CardTitleWrap, CardSubhead,
} from '@/shared/components/Card';

const ExampleCard = () => (
  <Col md={12}>
    <Card>
      <CardBody>
        <CardTitleWrap>
          <CardTitle>Example title</CardTitle>
          <CardSubhead>Example subhead</CardSubhead>
        </CardTitleWrap>
        <p>Your content here</p>
      </CardBody>
    </Card>
  </Col>
);

export default ExampleCard;
