import React from 'react';
import PropTypes from 'prop-types';
import { Radio, Checkbox, FormControlLabel, List, ListItem } from '@mui/material';

const PublicQuestionRenderer = ({ question, onAnswerChange }) => {
  if (!question) return null;

  const { title, question_type_id, survey_question_choices } = question;
  console.log('question_type_id apo public_question_renderer: ', question);

  const handleChange = (event) => {
    onAnswerChange(event.target.value);
  };

  return (
    <div>
      <h4>{title}</h4>

      {/* Render Radio buttons for question type 1 (Multiple Choice) */}
      {question_type_id === 1 && Array.isArray(survey_question_choices) && (
        <List>
          {survey_question_choices.map((survey_question_choice, index) => (
            <ListItem key={`${question.id}-${index}`} disablePadding>
              <FormControlLabel
                control={
                  <Radio
                    name={`question-${question.id}`}
                    value={survey_question_choice.id}  // Use the choice ID as the value
                    onChange={handleChange}  // Trigger change when user selects an option
                  />
                }
                label={survey_question_choice.content}
              />
            </ListItem>
          ))}
        </List>
      )}

      {/* Render Checkboxes for question type 2 or 10 */}
      {(question_type_id === 2 || question_type_id === 10) && Array.isArray(survey_question_choices) && (
        <List>
          {survey_question_choices.map((survey_question_choice, index) => (
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

      {/* Add other question types here if needed */}
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
  onAnswerChange: PropTypes.func.isRequired, // Added prop type for the onAnswerChange callback
};

export default PublicQuestionRenderer;
