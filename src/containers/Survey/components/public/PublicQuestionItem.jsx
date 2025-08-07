import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { useSurveyTheme } from '../../../../contexts/SurveyThemeContext';
import PublicQuestionRenderer from './PublicQuestionRenderer'; // Import the new renderer

const PublicQuestionItem = ({ question, index, onResponseChange }) => {
  const themeStyles = useSurveyTheme();
  return (
    <Box sx={{
 mb: 2, p: 2, border: '1px solid #ccc', borderRadius: '8px', 
}}
    >
      <Typography 
        color={themeStyles?.colors?.question || '#252525'} 
        variant="h6"
        sx={{
          fontFamily: themeStyles?.typography?.fontFamily || 'Arial, sans-serif',
          fontSize: themeStyles?.typography?.headingStyle?.H1 || '24px',
          fontWeight: 'bold',
        }}
      >
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
