import React from 'react';
import PropTypes from 'prop-types';
import {
  Radio, Checkbox, FormControlLabel, List, ListItem, 
} from '@mui/material';

const QuestionRenderer = ({ question, onAnswerChange }) => {
  if (!question) return null;

  // Destructure and convert snake_case to camelCase
  const { title, question_type_id: questionTypeId, survey_question_choices: surveyQuestionChoices } = question;

  const handleChange = (event) => {
    onAnswerChange(event.target.value);
  };

  return (
    <div>
      <h4>{title}</h4>

      {/* Render Radio buttons for question type 1 (Multiple Choice) */}
      {questionTypeId === 1 && Array.isArray(surveyQuestionChoices) && (
        <List>
          {surveyQuestionChoices.map(surveyQuestionChoice => (
            <ListItem key={surveyQuestionChoice.id} disablePadding>
              <FormControlLabel
                control={(
                  <Radio
                    name={`question-${question.id}`}
                    value={surveyQuestionChoice.content}
                    onChange={handleChange} // Trigger change when user selects an option
                  />
                )}
                label={surveyQuestionChoice.content}
              />
            </ListItem>
          ))}
        </List>
      )}

      {/* Render Checkboxes for question type 2 or 10 */}
      {(questionTypeId === 2 || questionTypeId === 10) && Array.isArray(surveyQuestionChoices) && (
        <List>
          {surveyQuestionChoices.map(surveyQuestionChoice => (
            <ListItem key={surveyQuestionChoice.id} disablePadding>
              <FormControlLabel
                control={(
                  <Checkbox
                    name={`question-${question.id}`}
                    value={surveyQuestionChoice.content}
                    onChange={handleChange} // Trigger change when user checks/unchecks an option
                  />
                )}
                label={surveyQuestionChoice.content}
              />
            </ListItem>
          ))}
        </List>
      )}

      {/* Add other question types here if needed */}
    </div>
  );
};

QuestionRenderer.propTypes = {
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

export default QuestionRenderer;
