import React from 'react';
import PropTypes from 'prop-types';
import { Radio, Checkbox, FormControlLabel, List, ListItem } from '@mui/material';

const QuestionRenderer = ({ question }) => {
  if (!question) return null;
  
  const { title, question_type_id, survey_question_choices } = question;
  console.log(`QuestionRenderer > question: `,question);

  return (
    <div>
      <h4>{title}, {survey_question_choices}</h4>

      {/* Render Radio buttons for question type 1 (Multiple Choice) */}
      {question_type_id === 1 && survey_question_choices && (
        <List>
          {survey_question_choices.map((survey_question_choice, index) => (
            <ListItem key={`${question.id}-${index}`} disablePadding>
              <FormControlLabel
                control={<Radio name={`question-${index}`} value={survey_question_choice.content} />}
                label={survey_question_choice.content}
              />
            </ListItem>
          ))}
        </List>
      )}

      {/* Render Checkboxes for question type 2 or 10 */}
      {(question_type_id === 2 || question_type_id === 10) && survey_question_choices && (
        <List>
          {survey_question_choices.map((survey_question_choice, index) => (
            <ListItem key={`${question.id}-${index}`} disablePadding>
              <FormControlLabel
                control={<Checkbox name={`question-${index}`} value={survey_question_choice.content} />}
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
};

export default QuestionRenderer;
