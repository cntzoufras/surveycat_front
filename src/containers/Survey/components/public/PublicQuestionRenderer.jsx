import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
 Radio, FormControlLabel, Checkbox, List, ListItem, 
} from '@mui/material';

const PublicQuestionRenderer = ({ question, onAnswerChange }) => {
  const [selectedValues, setSelectedValues] = useState([]);

  const handleRadioChange = (event) => {
    const { value } = event.target;
    setSelectedValues([value]);
    onAnswerChange(question.id, value); // Pass the question ID and selected value
  };

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    const updatedValues = event.target.checked 
      ? [...selectedValues, value] 
      : selectedValues.filter(v => v !== value);

    setSelectedValues(updatedValues);
    onAnswerChange(question.id, updatedValues); // Pass the question ID and selected values
  };

  return (
    <div>

      {/* Render Radio buttons for question type 1 (Multiple Choice) */}
      {question.question_type_id === 1 && Array.isArray(question.survey_question_choices) && (
        <List>
          {question.survey_question_choices.map(surveyQuestionChoice => (
            <ListItem key={`${question.id}-${surveyQuestionChoice.id}`} disablePadding>
              <FormControlLabel
                control={(
                  <Radio
                    name={`question-${question.id}`}
                    value={surveyQuestionChoice.id}
                    checked={selectedValues.includes(surveyQuestionChoice.id)}
                    onChange={handleRadioChange}
                  />
                )}
                label={surveyQuestionChoice.content}
                sx={{ color: '#252525' }} // Set text color to black
              />
            </ListItem>
          ))}
        </List>
      )}

      {/* Render Checkboxes for question type 2 or 10 */}
      {(question.question_type_id === 2 || question.question_type_id === 10) 
        && Array.isArray(question.survey_question_choices) && (
        <List>
          {question.survey_question_choices.map(surveyQuestionChoice => (
            <ListItem key={`${question.id}-${surveyQuestionChoice.id}`} disablePadding>
              <FormControlLabel
                control={(
                  <Checkbox
                    name={`question-${question.id}`}
                    value={surveyQuestionChoice.id}
                    checked={selectedValues.includes(surveyQuestionChoice.id)}
                    onChange={handleCheckboxChange}
                  />
                )}
                label={surveyQuestionChoice.content}
              />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

PublicQuestionRenderer.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    question_type_id: PropTypes.number.isRequired,
    survey_question_choices: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      sort_index: PropTypes.number.isRequired,
    })),
  }).isRequired,
  onAnswerChange: PropTypes.func.isRequired,
};

export default PublicQuestionRenderer;
