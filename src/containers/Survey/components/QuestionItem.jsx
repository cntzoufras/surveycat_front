import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import questionTypeNames from '../../../utils/api/questionTypes';
import QuestionRenderer from './QuestionRenderer'; // Import the QuestionRenderer

const QuestionItem = ({
  question, index, onDelete, onOptionSelection,
}) => {
  const questionTypeName = questionTypeNames[question.question_type_id] || 'Unknown Type';

  return (
    <Box key={question.id} sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
      <Typography variant="h6">
        {`${index + 1}. ${question.title} (${questionTypeName})`}
      </Typography>
      
      <QuestionRenderer question={question} />

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
    title: PropTypes.string.isRequired,
    question_type_id: PropTypes.number.isRequired,
    options: PropTypes.arrayOf(PropTypes.string),
    selectedOptions: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  index: PropTypes.number.isRequired,
  onDelete: PropTypes.func,
  onOptionSelection: PropTypes.func.isRequired,
};

QuestionItem.defaultProps = {
  onDelete: null,
};

export default QuestionItem;
