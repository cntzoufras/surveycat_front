import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import Calendar from '@/shared/components/Calendar';
import {
  Card, CardBody,
} from '@/shared/components/Card';
import events from './events';

const BigCalendar = ({ dir }) => (
  <Col md={12} lg={12} xl={9}>
    <Card>
      <CardBody>
        <Calendar events={events} />
      </CardBody>
    </Card>
  </Col>
);

BigCalendar.propTypes = {
  dir: PropTypes.string.isRequired,
};

export default BigCalendar;
