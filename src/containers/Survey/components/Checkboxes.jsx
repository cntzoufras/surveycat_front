import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import OptionInputList from './OptionInputList';

const CheckboxesQuestion = ({
 numOptions, optionInputs, handleOptionInputChange, handleNumOptionsChange, 
}) => (
  <>
    <Form.Group controlId="formNumOptions">
      <Form.Label>Number of Options</Form.Label>
      <Form.Control
        type="number"
        value={numOptions}
        onChange={handleNumOptionsChange}
      />
    </Form.Group>
    <OptionInputList
      questionType="checkbox"
      numOptions={numOptions}
      optionInputs={optionInputs}
      handleOptionInputChange={handleOptionInputChange}
    />
  </>
  );

CheckboxesQuestion.propTypes = {
  numOptions: PropTypes.number.isRequired,
  optionInputs: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleOptionInputChange: PropTypes.func.isRequired,
  handleNumOptionsChange: PropTypes.func.isRequired,
};

export default CheckboxesQuestion;
