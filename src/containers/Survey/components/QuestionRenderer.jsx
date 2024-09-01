import React from 'react';
import PropTypes from 'prop-types';
import {
  Radio, Checkbox, FormControlLabel, List, ListItem, 
} from '@mui/material';

const QuestionRenderer = ({ question, onAnswerChange }) => {
  if (!question) return null;

  const { 
    id, 
    question_type_id: questionTypeId, 
    survey_question_choices: surveyQuestionChoices, 
    selectedOption,
  } = question;

  const handleChange = (event) => {
    if (onAnswerChange) {
      onAnswerChange(id, event.target.value);
    }
  };

  return (
    <div>
      {/* Render Radio buttons for question type 1 (Multiple Choice) */}
      {questionTypeId === 1 && Array.isArray(surveyQuestionChoices) && (
        <List>
          {surveyQuestionChoices.map(choice => (
            <ListItem key={choice.id} disablePadding>
              <FormControlLabel
                control={(
                  <Radio
                    name={`question-${id}`}
                    value={choice.content}
                    onChange={handleChange}
                    checked={selectedOption === choice.content}
                  />
                )}
                label={choice.content}
              />
            </ListItem>
          ))}
        </List>
      )}

      {/* Render Checkboxes for question type 2 or 10 */}
      {(questionTypeId === 2 || questionTypeId === 10) && Array.isArray(surveyQuestionChoices) && (
        <List>
          {surveyQuestionChoices.map(choice => (
            <ListItem key={choice.id} disablePadding>
              <FormControlLabel
                control={(
                  <Checkbox
                    name={`question-${id}`}
                    value={choice.id}
                    onChange={handleChange} 
                    checked={selectedOption?.includes(choice.id) || false}
                  />
                )}
                label={choice.content}
              />
            </ListItem>
          ))}
        </List>
      )}
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
    selectedOption: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
  }).isRequired,
  onAnswerChange: PropTypes.func.isRequired,
};

export default QuestionRenderer;
