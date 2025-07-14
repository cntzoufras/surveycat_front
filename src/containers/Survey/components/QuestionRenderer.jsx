import React from 'react';
import PropTypes from 'prop-types';
import {
  Radio, Checkbox, FormControlLabel, List, ListItem, 
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const QuestionRenderer = ({ question, onAnswerChange, isPublished }) => {
  const theme = useTheme();
  const textColor = theme.palette.mode === 'dark' ? '#efefef' : '#252525'; // Set text color based on theme

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
      {(questionTypeId === 1 || questionTypeId === 7) && Array.isArray(surveyQuestionChoices) && (
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
                    disabled={isPublished} 
                  />
                )}  
                label={<span style={{ color: textColor }}>{choice.content}</span>} // Apply text color
              />
            </ListItem>
          ))}
        </List>
      )}

      {/* Render Checkboxes for question type 2 or 10 */}
      {(questionTypeId === 2) && Array.isArray(surveyQuestionChoices) && (
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
                    disabled={isPublished}
                  />
                )}
                label={<span style={{ color: textColor }}>{choice.content}</span>} // Apply text color
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
  isPublished: PropTypes.bool,
};

QuestionRenderer.defaultProps = {
  isPublished: false, // Set default value
};

export default QuestionRenderer;
