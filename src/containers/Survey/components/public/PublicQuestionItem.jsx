import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import PublicQuestionRenderer from './PublicQuestionRenderer'; // Import the new renderer

const PublicQuestionItem = ({ question, index, onResponseChange }) => {
  console.log('public question einai: ', question);
  return (
    <Box sx={{
 mb: 2, p: 2, border: '1px solid #ccc', borderRadius: '8px', 
}}
    >
      <Typography color="#252525" variant="h6">
        {`${index + 1}. ${question.title}`}
      </Typography>
      <PublicQuestionRenderer question={question} onAnswerChange={onResponseChange} />
    </Box>
  );
};

PublicQuestionItem.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    question_type_id: PropTypes.number.isRequired,
    survey_question_choices: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onResponseChange: PropTypes.func.isRequired,
};

export default PublicQuestionItem;
