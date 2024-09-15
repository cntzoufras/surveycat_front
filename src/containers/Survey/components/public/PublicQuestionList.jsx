import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import PublicQuestionItem from './PublicQuestionItem';

const PublicQuestionList = ({ questions, onResponseChange }) => {
  if (!questions || questions.length === 0) {
    return <Typography>No questions available.</Typography>;
  }

  return (
    <Box>
      {questions.map((question, index) => (
        <Box key={question.id} sx={{ mb: 2 }}>
          <PublicQuestionItem
            question={question}
            index={index}
            onResponseChange={onResponseChange}
          />
        </Box>
      ))}
    </Box>
  );
};

PublicQuestionList.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    question_type_id: PropTypes.number.isRequired,
    survey_question_choices: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      sort_index: PropTypes.number.isRequired,
    })),
  })).isRequired,
  onResponseChange: PropTypes.func.isRequired,
};

export default PublicQuestionList;
