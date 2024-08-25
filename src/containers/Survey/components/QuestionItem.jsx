import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  IconButton,
  Radio,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const QuestionItem = ({
  question, index, onDelete, onOptionSelection,
}) => {
  const questionTitle = question.title || 'No question title provided';
  const questionType = question.question_type_id || 'unknown type';
  const questionPage = question.survey_page_id || 'No page info';

  return (
    <Box key={question.id} sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
      <Typography variant="h6">
        {`${index + 1}. ${questionTitle} (${questionType}) (${questionPage})`}
      </Typography>
      
      {['radio', 'checkbox'].includes(questionType) && question.options && (
        <List>
          {question.options.map((option, optIndex) => (
            <ListItem key={`${question.id}-${optIndex}`} disablePadding>
              <FormControlLabel
                control={questionType === 'radio' ? (
                  <Radio
                    checked={question.selectedOption === option}
                    onChange={() => onOptionSelection(question.id, option)}
                    name={`question-${index}`}
                    value={option}
                  />
                ) : (
                  <Checkbox
                    checked={question.selectedOption === option}
                    onChange={() => onOptionSelection(question.id, option)}
                    name={`question-${index}`}
                    value={option}
                  />
                )}
                label={option}
              />
            </ListItem>
          ))}
        </List>
      )}

      {onDelete && (
        <IconButton edge="end" aria-label="delete" onClick={() => onDelete(question.id)}>
          <DeleteIcon />
        </IconButton>
      )}
    </Box>
  );
};

QuestionItem.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    question_type_id: PropTypes.number,
    surveyPage: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
    selectedOption: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onDelete: PropTypes.func,
  onOptionSelection: PropTypes.func.isRequired,
};

QuestionItem.defaultProps = {
  onDelete: null,
};

export default QuestionItem;
