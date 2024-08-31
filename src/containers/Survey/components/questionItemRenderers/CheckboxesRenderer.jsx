// src/components/CheckboxesRenderer.jsx

import React from 'react';
import PropTypes from 'prop-types';
import {
 List, ListItem, FormControlLabel, Checkbox, 
} from '@mui/material';

const CheckboxesRenderer = ({ question, onOptionSelection }) => {
  if (!question || !question.options) return null;

  const handleCheckboxChange = (option) => {
    const newSelectedOptions = question.selectedOptions.includes(option)
      ? question.selectedOptions.filter(opt => opt !== option)
      : [...question.selectedOptions, option];

    onOptionSelection(question.id, newSelectedOptions);
  };

  return (
    <List>
      {question.options.map(option => (
        <ListItem key={`${question.id}-${option}`} disablePadding>
          <FormControlLabel
            control={(
              <Checkbox
                checked={question.selectedOptions.includes(option)}
                onChange={() => handleCheckboxChange(option)}
                name={`question-${option}`}
                value={option}
              />
            )}
            label={option}
          />
        </ListItem>
      ))}
    </List>
  );
};

CheckboxesRenderer.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedOptions: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onOptionSelection: PropTypes.func.isRequired,
};

export default CheckboxesRenderer;
