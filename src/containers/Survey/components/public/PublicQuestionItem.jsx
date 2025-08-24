import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import tinycolor from 'tinycolor2';
import { useSurveyTheme } from '../../../../contexts/SurveyThemeContext';
import PublicQuestionRenderer from './PublicQuestionRenderer'; // Import the new renderer

const PublicQuestionItem = ({ question, index, onResponseChange }) => {
  const themeStyles = useSurveyTheme();

  // Build the question box background with alpha just like ThemePreview
  const bgAlpha = (themeStyles?.layout?.backgroundAlpha ?? 100) / 100;
  const questionBoxBg = tinycolor(themeStyles?.colors?.background || 'transparent')
    .setAlpha(bgAlpha)
    .toRgbString();

  return (
    <Box
      sx={{
        mb: 2,
        p: 2,
        border: '1px solid #e0e0e0',
        borderRadius: `${themeStyles?.layout?.borderRadius ?? 8}px`,
        backgroundColor: questionBoxBg,
      }}
    >
      <Typography
        color={themeStyles?.colors?.question || '#252525'}
        sx={{
          fontFamily: themeStyles?.typography?.fontFamily || 'Arial, sans-serif',
          fontSize: (() => {
            const px = themeStyles?.typography?.fontSizePx;
            if (Number.isFinite(px)) return `${px}px`;
            const raw = themeStyles?.typography?.fontSize;
            const n = parseFloat(String(raw || '').replace('px',''));
            return Number.isFinite(n) ? `${n}px` : '16px';
          })(),
          fontWeight: 400,
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
