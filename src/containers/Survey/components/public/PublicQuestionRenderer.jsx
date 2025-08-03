import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSurveyTheme } from '../../../../contexts/SurveyThemeContext';
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
  
  return (
    <div style={{ 
      fontFamily: themeStyles?.typography?.fontFamily || 'Arial, sans-serif',
      color: themeStyles?.colors?.text || '#252525',
      backgroundColor: themeStyles?.colors?.background || 'transparent',
      padding: '20px',
      borderRadius: '8px'
    }}>
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
                      color: themeStyles?.colors?.choice || 'grey.400',
                      '&.Mui-checked': { 
                        color: themeStyles?.colors?.primary || 'grey.700' 
                      },
                    }}
                  />
                )}
                label={choice.content}
                sx={{ 
                  color: themeStyles?.colors?.text || '#252525',
                  fontSize: themeStyles?.typography?.fontSize || '16px'
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
                      color: themeStyles?.colors?.choice || 'grey.400',
                      '&.Mui-checked': { 
                        color: themeStyles?.colors?.primary || 'grey.700' 
                      },
                    }}
                  />
                )}
                label={choice.content}
                sx={{ 
                  color: themeStyles?.colors?.text || '#252525',
                  fontSize: themeStyles?.typography?.fontSize || '16px'
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
             backgroundColor: themeStyles?.colors?.background || 'grey.100',
             borderRadius: themeStyles?.layout?.borderRadius || 1,
           },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: themeStyles?.colors?.primary || 'grey.700',
            },
            '& input::placeholder': {
              color: themeStyles?.colors?.choice || 'grey.400',
              opacity: 1,
           },
           '& .MuiOutlinedInput-input': {
              color: themeStyles?.colors?.text || 'grey.900', 
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
              color: themeStyles?.colors?.choice || 'grey.400' 
            },
            '& .MuiRating-iconFilled': { 
              color: themeStyles?.colors?.primary || 'warning.main' 
            },
          }}
          /* or if you prefer custom icons: */
          icon={<StarIcon sx={{ fontSize: '2rem' }} />}
          emptyIcon={<StarBorderIcon sx={{ fontSize: '2rem' }} />}
        />
        <Typography sx={{ ml: 2, color: themeStyles?.colors?.text || 'text.primary' }}>
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
            color: 'primary.main',
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
              backgroundColor: themeStyles?.colors?.background || 'grey.100', 
              borderRadius: themeStyles?.layout?.borderRadius || 1 
            },
            '& .MuiOutlinedInput-notchedOutline': { 
              borderColor: themeStyles?.colors?.primary || 'grey.400' 
            },
            '& textarea::placeholder': { 
              color: themeStyles?.colors?.choice || 'grey.600', 
              opacity: 1 
            },
            '& .MuiOutlinedInput-input': { 
              color: themeStyles?.colors?.text || '#252525' 
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
              backgroundColor: themeStyles?.colors?.background || 'grey.100', 
              borderRadius: themeStyles?.layout?.borderRadius || 1 
            },
            '& .MuiOutlinedInput-notchedOutline': { 
              borderColor: themeStyles?.colors?.primary || 'grey.400' 
            },
            '& .MuiSelect-select': { 
              color: themeStyles?.colors?.text || '#252525' 
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
