import React from 'react';
import { Card, CardBody, Col } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DailyRespondentsChart = ({ data: activeUsers }) => (
  <Col md={12}>
    <Card>
      <CardBody>
        <h5 className="card__title">Daily Unique Respondents (Last 30 Days)</h5>
        <ResponsiveContainer height={300}>
          <LineChart data={activeUsers}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  </Col>
);

export default DailyRespondentsChart;
