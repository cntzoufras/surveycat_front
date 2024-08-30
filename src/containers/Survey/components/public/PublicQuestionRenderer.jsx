import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Radio, FormControlLabel, Checkbox, List, ListItem } from '@mui/material';

const PublicQuestionRenderer = ({ question, onAnswerChange }) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    onAnswerChange(event.target.value);
  };

  return (
    <div>
      <h4>{question.title}</h4>

      {question.question_type_id === 1 && Array.isArray(question.survey_question_choices) && (
        <List>
          {question.survey_question_choices.map((survey_question_choice, index) => (
            <ListItem key={`${question.id}-${index}`} disablePadding>
              <FormControlLabel
                control={
                  <Radio
                    name={`question-${question.id}`}
                    value={survey_question_choice.id}
                    checked={selectedValue === survey_question_choice.id}  // Set the checked state
                    onChange={handleChange}
                  />
                }
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
                control={
                  <Checkbox
                    name={`question-${question.id}`}
                    value={survey_question_choice.id}  // Use the choice ID as the value
                    onChange={handleChange}  // Trigger change when user checks/unchecks an option
                  />
                }
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
