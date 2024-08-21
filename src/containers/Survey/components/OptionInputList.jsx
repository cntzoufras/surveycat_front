import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const OptionContainer = styled.div`
  margin-bottom: 12px;
`;

const OptionInput = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  outline: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 6px rgba(0, 123, 255, 0.5);
  }
`;

const OptionInputList = ({ numOptions, optionInputs, handleOptionInputChange }) => { 
  const renderOptionInputs = () => {
    const inputs = [];
    for (let i = 0; i < numOptions; i += 1) {
      const value = optionInputs[i] || '';
      inputs.push(
        <OptionContainer key={i}>
          <OptionInput
            type="text"
            value={value}
            onChange={e => handleOptionInputChange(e, i)}
            placeholder={`Option ${i + 1}`}
          />
        </OptionContainer>,
      );
    }
    return inputs;
  };

  return (
    <div>
      <label htmlFor="option-input-0">Options:</label>
      {renderOptionInputs()}
    </div>
  );
};

OptionInputList.propTypes = {
  numOptions: PropTypes.number.isRequired,
  optionInputs: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleOptionInputChange: PropTypes.func.isRequired,
};

export default OptionInputList;
