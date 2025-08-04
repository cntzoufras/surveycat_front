// src/components/public/FollowUpForm.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Paper,
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  useTheme,
} from '@mui/material';
import { useSurveyTheme } from '../../../../contexts/SurveyThemeContext';

const FollowUpForm = ({ onSubmit }) => {
  const theme = useTheme();
  const themeStyles = useSurveyTheme();

  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [errors, setErrors] = useState({});

  const handleFinish = () => {
    const newErrors = {};
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Invalid email';
    }
    // Validate age if provided
    if (age) {
      const ageNum = parseInt(age, 10);
      if (Number.isNaN(ageNum) || ageNum < 0) {
        newErrors.age = 'Enter a valid age';
      }
    }
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    onSubmit({
      email: email.trim() || null,
      gender: gender || null,
      age: age ? parseInt(age, 10) : null,
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 4,
        px: 2,
        // bgcolor: '#FAFAFA',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 500,
          width: '100%',
          bgcolor: themeStyles?.colors?.background || '#F2F2F2',
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ 
          color: themeStyles?.colors?.text || '#1C1C1E',
          fontFamily: themeStyles?.typography?.fontFamily || 'Arial, sans-serif',
          fontSize: themeStyles?.typography?.headingStyle?.H2 || '24px',
          fontWeight: 'bold'
        }}>
          Additional Information
        </Typography>
        <Typography variant="body2" gutterBottom sx={{ 
          color: themeStyles?.colors?.choice || '#3C3C43',
          fontFamily: themeStyles?.typography?.fontFamily || 'Arial, sans-serif',
          fontSize: themeStyles?.typography?.fontSize || '16px'
        }}>
          Help us understand our audience better. This information is optional and will be kept confidential.
        </Typography>

        <TextField
          label="Email address"
          placeholder="you@example.com"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors(err => ({ ...err, email: null }));
          }}
          error={!!errors.email}
          helperText={errors.email}
          InputLabelProps={{ shrink: true }}
          sx={{
            mt: 2,
            // ensure label and text are dark
            '& .MuiInputLabel-root': { color: themeStyles?.colors?.text || '#424242' },
            '& .MuiOutlinedInput-input': { color: themeStyles?.colors?.text || '#424242' },
            '& .MuiOutlinedInput-root': {
              '& input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus': {
                WebkitBoxShadow: '0 0 0px 1000px #fff8e1 inset !important',
                WebkitTextFillColor: `${themeStyles?.colors?.text || '#424242'} !important`,
              },
            },
          }}
        />

        <TextField
          label="Age"
          placeholder="e.g. 30"
          variant="outlined"
          fullWidth
          type="number"
          value={age}
          onChange={(e) => {
            setAge(e.target.value);
            setErrors(err => ({ ...err, age: null }));
          }}
          error={!!errors.age}
          helperText={errors.age}
          InputLabelProps={{ shrink: true }}
          sx={{
            mt: 2,
            // explicitly color the label
            '& .MuiInputLabel-root': {
              color: '#424242',
            },
            // explicitly color the input text
            '& .MuiOutlinedInput-input': {
              color: '#424242',
            },
            // if you want the outline border a different shade on focus
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#424242',
            },
          }}
        />
        

        <Box sx={{
          display: 'flex', 
          justifyContent: 'center', 
          mt: 4, 
          mb: 2, 
          }}
        >
          <RadioGroup
            row
            value={gender}
            onChange={e => setGender(e.target.value)}
          >
            {['Male', 'Female', 'Other'].map(option => (
              <FormControlLabel
                key={option}
                value={option.toLowerCase()}
                control={(
                  <Radio
                    sx={{
                      color: '#424242',
                      '&.Mui-checked': { color: themeStyles?.colors?.primary || '#1C1C1E' },
                    }}
                  />
                )}
                label={option}
                sx={{ 
                  // label color
                  color: '#424242',
                  // ensure margin/padding nice
                  mx: 1,
                }}
              />
            ))}
          </RadioGroup>
        </Box>

        <Box textAlign="center" mt={3}>
          <Button
            variant="contained"
            onClick={handleFinish}
            sx={{
              bgcolor: themeStyles?.colors?.primary || '#007ACC',
              color: '#fff',
              '&:hover': { bgcolor: themeStyles?.colors?.secondary || '#005A9E' },
              px: 4,
            }}
          >
            Finish
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};



FollowUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default FollowUpForm;
