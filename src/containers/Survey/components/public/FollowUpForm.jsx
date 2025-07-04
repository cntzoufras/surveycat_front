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

const FollowUpForm = ({ onSubmit }) => {
  const theme = useTheme();

  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [errors, setErrors] = useState({});

  const handleFinish = () => {
    const newErrors = {};
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Invalid email';
    }
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    onSubmit({
      email: email.trim() || null,
      gender: gender || null,
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
          bgcolor: '#F2F2F2',
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ color: '#1C1C1E' }}>
          Just one more thing…
        </Typography>
        <Typography variant="body2" gutterBottom sx={{ color: '#3C3C43' }}>
          <em>(optional)</em> Drop your email & tell us your gender:
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
            '& .MuiInputLabel-root': { color: '#424242' },
            '& .MuiOutlinedInput-input': { color: '#424242' },
            '& .MuiOutlinedInput-root': {
              '& input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus': {
                WebkitBoxShadow: '0 0 0px 1000px #fff8e1 inset !important',
                WebkitTextFillColor: '#424242 !important',
              },
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
                      '&.Mui-checked': { color: '#1C1C1E' },
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
              bgcolor: '#007ACC',
              color: '#fff',
              '&:hover': { bgcolor: '#005A9E' },
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
