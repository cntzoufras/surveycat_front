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
      <h4>{question.title}</h4>

      {/* Render Radio buttons for question type 1 (Multiple Choice) */}
      {question.question_type_id === 1 && Array.isArray(question.survey_question_choices) && (
        <List>
          {question.survey_question_choices.map((survey_question_choice, index) => (
            <ListItem key={`${question.id}-${index}`} disablePadding>
              <FormControlLabel
                control={(
                  <Radio
                    name={`question-${question.id}`}
                    value={survey_question_choice.id}
                    checked={selectedValues.includes(survey_question_choice.id)}
                    onChange={handleRadioChange}
                  />
                )}
                label={survey_question_choice.content}
              />
            </ListItem>
          ))}
        </List>
      )}

      {/* Render Checkboxes for question type 2 or 10 */}
      {(question.question_type_id === 2 || question.question_type_id === 10) && Array.isArray(question.survey_question_choices) && (
        <List>
          {question.survey_question_choices.map((survey_question_choice, index) => (
            <ListItem key={`${question.id}-${index}`} disablePadding>
              <FormControlLabel
                control={(
                  <Checkbox
                    name={`question-${question.id}`}
                    value={survey_question_choice.id}
                    checked={selectedValues.includes(survey_question_choice.id)}
                    onChange={handleCheckboxChange}
                  />
                )}
                label={survey_question_choice.content}
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
