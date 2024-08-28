import React from 'react';
import PropTypes from 'prop-types';
import { Radio, Checkbox, FormControlLabel, List, ListItem } from '@mui/material';

const QuestionRenderer = ({ question }) => {
  if (!question) return null;
  
  console.log(`QuestionRenderer > question: `,question);
  const { title, question_type_id, options } = question;

  return (
    <div>
      <h4>{title}</h4>

      {/* Render Radio buttons for question type 1 (Multiple Choice) */}
      {question_type_id === 1 && options && (
        <List>
          {options.map((option, index) => (
            <ListItem key={`${question.id}-${index}`} disablePadding>
              <FormControlLabel
                control={<Radio name={`question-${index}`} value={option} />}
                label={option}
              />
            </ListItem>
          ))}
        </List>
      )}

      {/* Render Checkboxes for question type 2 or 10 */}
      {(question_type_id === 2 || question_type_id === 10) && options && (
        <List>
          {options.map((option, index) => (
            <ListItem key={`${question.id}-${index}`} disablePadding>
              <FormControlLabel
                control={<Checkbox name={`question-${index}`} value={option} />}
                label={option}
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
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default QuestionRenderer;
