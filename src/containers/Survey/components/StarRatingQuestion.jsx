import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

const StarRatingQuestion = ({ handleQuestionInputChange, newQuestion }) => (
  <Form.Group controlId="formStarRating">
    <Form.Label>Star Rating</Form.Label>
    <Form.Control
      type="text"
      value={newQuestion}
      onChange={handleQuestionInputChange}
      placeholder="Enter a description for the rating"
    />
  </Form.Group>
  );

StarRatingQuestion.propTypes = {
  newQuestion: PropTypes.string.isRequired,
  handleQuestionInputChange: PropTypes.func.isRequired,
};

export default StarRatingQuestion;
