import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Radio,
  FormControlLabel,
  Checkbox,
  List,
  ListItem,
  TextField,
  Rating,
  Slider,
  MenuItem,
  Box,
  Typography,
} from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { useSurveyTheme } from '../../../../contexts/SurveyThemeContext';

const PublicQuestionRenderer = ({ question, onAnswerChange }) => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [bestWorst, setBestWorst] = useState({ best: '', worst: '' });

    const qc = question.survey_question_choices || [];



  const handleRadioChange = (event) => {
    const { value } = event.target;
    setSelectedValues([value]);
    onAnswerChange(question.id, value);
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    const updated = checked
      ? [...selectedValues, value]
      : selectedValues.filter(v => v !== value);

    setSelectedValues(updated);
    onAnswerChange(question.id, updated);
  };

  const handleTextChange = (event) => {
    const text = event.target.value;
    setSelectedValues([text]);
    onAnswerChange(question.id, text);
  };

  const handleRatingChange = (_, v) => {
    setSelectedValues([v]);
    onAnswerChange(question.id, v);
  };
  const handleSliderChange = (_, v) => {
    setSelectedValues([v]);
  };

  const handleSliderCommit = (_, v) => {
    onAnswerChange(question.id, v);
  };
  const handleDropdownChange = (e) => {
    const v = e.target.value;
    setSelectedValues([v]);
    onAnswerChange(question.id, v);
  };

  // best/worst handlers
  const handleBestChange = (e) => {
    const best = e.target.value;
    const next = { ...bestWorst, best };
    setBestWorst(next);
    onAnswerChange(question.id, next);
  };
  const handleWorstChange = (e) => {
    const worst = e.target.value;
    const next = { ...bestWorst, worst };
    setBestWorst(next);
    onAnswerChange(question.id, next);
  };



  const themeStyles = useSurveyTheme();
  const qaColor = themeStyles?.colors?.question_answer_color || themeStyles?.colors?.primary;
  const bodyFontFamily = themeStyles?.typography?.fontFamily || 'Arial, sans-serif';
  const bodyFontSize = (() => {
    const p = themeStyles?.typography?.fontSizePx;
    if (Number.isFinite(p)) return `${p}px`;
    const raw = themeStyles?.typography?.fontSize;
    if (typeof raw === 'number') return `${raw}px`;
    if (typeof raw === 'string') {
      const n = parseFloat(raw.replace('px', ''));
      if (!Number.isNaN(n)) return `${n}px`;
    }
    return '16px';
  })();
  
  return (
    <div style={{ 
      fontFamily: bodyFontFamily,
      // Do not force a global text color here; let individual widgets decide.
      color: 'inherit',
      backgroundColor: 'transparent',
      padding: '20px',
      borderRadius: '8px',
    }}
    >
      {/* Multiple Choice (Radio) */}
      {question.question_type_id === 1 && Array.isArray(question.survey_question_choices) && (
        <List>
          {question.survey_question_choices.map(choice => (
            <ListItem key={`${question.id}-${choice.id}`} disablePadding>
              <FormControlLabel
                control={(
                  <Radio
                    name={`question-${question.id}`}
                    value={choice.id}
                    checked={selectedValues.includes(choice.id)}
                    onChange={handleRadioChange}
                    sx={{
                      // Unchecked radio color should follow choice color, not generic text
                      color: themeStyles?.colors?.choice || 'grey.400',
                      '&.Mui-checked': { 
                        color: qaColor || 'grey.700', 
                      },
                    }}
                  />
                )}
                label={choice.content}
                sx={{ 
                  // Choice label color should use the theme's choice color
                  color: themeStyles?.colors?.choice || '#252525',
                  '& .MuiFormControlLabel-label': {
                    fontFamily: bodyFontFamily,
                    fontSize: `${bodyFontSize} !important`,
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
      )}

      {/* Checkboxes */}
      {(question.question_type_id === 2 || question.question_type_id === 10) 
        && Array.isArray(question.survey_question_choices) 
        && (
        <List>
          {question.survey_question_choices.map(choice => (
            <ListItem key={`${question.id}-${choice.id}`} disablePadding>
              <FormControlLabel
                control={(
                  <Checkbox
                    name={`question-${question.id}`}
                    value={choice.id}
                    checked={selectedValues.includes(choice.id)}
                    onChange={handleCheckboxChange}
                    sx={{
                      // Unchecked checkbox color should follow choice color
                      color: themeStyles?.colors?.choice || 'grey.400',
                      '&.Mui-checked': { 
                        color: qaColor || 'grey.700', 
                      },
                    }}
                  />
                )}
                label={choice.content}
                sx={{ 
                  color: themeStyles?.colors?.choice || '#252525',
                  '& .MuiFormControlLabel-label': {
                    fontFamily: bodyFontFamily,
                    fontSize: `${bodyFontSize} !important`,
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
      )}

      {/* Single Textbox */}
      {question.question_type_id === 3 && (
        <TextField
          variant="outlined"
          fullWidth
          multiline={false}
          placeholder="Your answer..."
          value={selectedValues[0] || ''}
          onChange={handleTextChange}
          sx={{ 
            mt: 1,
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'transparent',
              borderRadius: themeStyles?.layout?.borderRadius || 1,
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: qaColor || 'grey.600',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: qaColor || 'grey.600',
                borderWidth: '2px',
              },
            },
            '& .MuiOutlinedInput-notchedOutline': {
              // Outline defaults to primary to match selection color
              borderColor: qaColor || 'grey.700',
            },
            '& input::placeholder': {
              // Placeholder matches Text color from theme settings
              color: themeStyles?.colors?.text || '#252525',
              opacity: 1,
              fontFamily: bodyFontFamily,
              fontSize: bodyFontSize,
            },
            '& .MuiOutlinedInput-input': {
              // Actual typed text should use Text color from theme settings
              color: themeStyles?.colors?.text || '#252525',
              caretColor: themeStyles?.colors?.text || '#252525',
              fontFamily: bodyFontFamily,
              fontSize: `${bodyFontSize} !important`,
            },
            // Also target base input classes to be safe
            '& .MuiInputBase-input': {
              color: themeStyles?.colors?.text || '#252525',
              caretColor: themeStyles?.colors?.text || '#252525',
              WebkitTextFillColor: themeStyles?.colors?.text || '#252525',
              fontFamily: bodyFontFamily,
              fontSize: `${bodyFontSize} !important`,
            },
          }}
        />
      )}

      {/* 6: Star rating (1–5) */}
      {question.question_type_id === 4 && (
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
        <Rating
          name={`rating-${question.id}`}
          value={selectedValues[0] || 0}
          onChange={handleRatingChange}
          size="large"
          /* make the outline stars grey and filled stars orange */
          sx={{
            '& .MuiRating-iconEmpty': { 
              // Empty stars follow choice color (not generic text)
              color: themeStyles?.colors?.choice || 'grey.400', 
            },
            '& .MuiRating-iconFilled': { 
              // Filled stars use the answer/input color (blue), as before
              color: qaColor || themeStyles?.colors?.primary || 'warning.main', 
            },
          }}
          /* or if you prefer custom icons: */
          icon={<StarIcon sx={{ fontSize: '2rem' }} />}
          emptyIcon={<StarBorderIcon sx={{ fontSize: '2rem' }} />}
        />
        <Typography sx={{ ml: 2, color: themeStyles?.colors?.choice || 'text.primary', fontFamily: bodyFontFamily, fontSize: bodyFontSize }}>
          {selectedValues[0] || ''}
        </Typography>
      </Box>
    )}

      {/* 7: Slider (1–10) */}
      {question.question_type_id === 5 && (
      <Box sx={{ mt: 2, px: 1 }}>
        <Slider
          value={selectedValues[0] || 1}
          onChange={handleSliderChange}
          onChangeCommitted={handleSliderCommit}
          step={1}
          min={1}
          max={10}
          marks={[
             { value: 1, label: '1' },
             { value: 5, label: '5' },
             { value: 10, label: '10' },
          ]}
          valueLabelDisplay="auto"
          sx={{
            color: qaColor || 'primary.main',
          }}
        />
      </Box>
      )}

      {/* 6) Comment Box */}
      {question.question_type_id === 6 && (
        <TextField
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          placeholder="Write your detailed feedback here..."
          value={selectedValues[0] || ''}
          onChange={handleTextChange}
          sx={{
            mt: 1,
            '& .MuiOutlinedInput-root': { 
              backgroundColor: 'transparent', 
              borderRadius: themeStyles?.layout?.borderRadius || 1, 
              '&:hover .MuiOutlinedInput-notchedOutline': { 
                borderColor: qaColor || 'grey.600', 
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { 
                borderColor: qaColor || 'grey.600', 
                borderWidth: '2px',
              },
            },
            '& .MuiOutlinedInput-notchedOutline': { 
              // Match outline to text/placeholder (choice)
              borderColor: qaColor || 'grey.400', 
            },
            '& textarea::placeholder': { 
              // Placeholder should use Text color
              color: themeStyles?.colors?.text || '#252525', 
              opacity: 1, 
              fontFamily: bodyFontFamily,
              fontSize: bodyFontSize,
            },
            '& .MuiOutlinedInput-input': { 
              // Multiline typed text uses Text color
              color: themeStyles?.colors?.text || '#252525', 
              caretColor: themeStyles?.colors?.text || '#252525',
              fontFamily: bodyFontFamily,
              fontSize: `${bodyFontSize} !important`,
            },
            '& .MuiInputBase-inputMultiline': {
              color: themeStyles?.colors?.text || '#252525',
              caretColor: themeStyles?.colors?.text || '#252525',
              WebkitTextFillColor: themeStyles?.colors?.text || '#252525',
              fontFamily: bodyFontFamily,
              fontSize: `${bodyFontSize} !important`,
            },
          }}
        />
      )}


      {/* 7) Dropdown */}
      {question.question_type_id === 7 && (
        <TextField
          select
          variant="outlined"
          fullWidth
          value={selectedValues[0] || ''}
          onChange={handleDropdownChange}
          sx={{
            mt: 1,
            '& .MuiOutlinedInput-root': { 
              backgroundColor: 'transparent', 
              borderRadius: themeStyles?.layout?.borderRadius || 1, 
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: qaColor || 'grey.700',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: qaColor || 'grey.700',
                borderWidth: '1px',
              },
            },
            '& .MuiOutlinedInput-notchedOutline': { 
              borderColor: qaColor || 'grey.400', 
            },
            '& .MuiSelect-select': { 
              // Dropdown selected text uses body typography, color remains answer/input color
              color: qaColor || themeStyles?.colors?.choice || '#252525', 
              fontFamily: bodyFontFamily,
              fontSize: bodyFontSize,
            },
          }}
        >
          <MenuItem value=""><em>Select an option</em></MenuItem>
          {qc.map(c => <MenuItem key={c.id} value={c.id}>{c.content}</MenuItem>)}
        </TextField>
      )}


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
  onAnswerChange: PropTypes.func.isRequired,
};

export default PublicQuestionRenderer;
