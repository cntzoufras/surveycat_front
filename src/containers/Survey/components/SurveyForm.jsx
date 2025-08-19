import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box as MuiBox,
  Typography as MuiTypography,
  TextField as MuiTextField,
  Button as MuiButton,
  FormControl as MuiFormControl,
  InputLabel as MuiInputLabel,
  Select as MuiSelect,
  MenuItem as MuiMenuItem,
  useTheme,
} from '@mui/material';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  fetchSurveyCategoriesAction,
  fetchSurveyThemesAction,
  createSurveyAction,
  createSurveyPageAction,
} from '@/redux/actions/surveyActions';
import FontSelector from './FontSelector';
import CategorySelector from './CategorySelector';
import ThemeSelector from './ThemeSelector';

const MuiStyledFormControl = styled(MuiFormControl)`
  margin-bottom: 1rem;
  min-height: 56px; // Ensure a consistent height
`;

const CustomInputLabel = styled(MuiInputLabel)`
  background-color: transparent; /* This removes the white background */
  color: white; /* Sets the text color to white */
`;

const MuiStyledErrorBox = styled(MuiBox)`
  margin-top: 1rem;
  background-color: #f44336;
  color: white;
  padding: 1rem;
  border-radius: 4px;
`;

const SurveyForm = ({ userId }) => {
  const theme = useTheme();
  const textColor = theme.palette.text.primary;
  const [surveyTitle, setSurveyTitle] = useState('');
  const [surveyDescription, setSurveyDescription] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedThemeId, setSelectedThemeId] = useState('');
  const [showThemePreview, setShowThemePreview] = useState(false);
  const [customThemeSettings, setCustomThemeSettings] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const [selectedFont, setSelectedFont] = useState('Roboto'); // Default font

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSurveyCategoriesAction());
    dispatch(fetchSurveyThemesAction());
  }, [dispatch]);
  
  const surveyCategories = useSelector(state => state.survey.surveyCategories);
  const surveyThemes = useSelector(state => state.survey.surveyThemes);
  const currentTheme = surveyThemes.find(t => t.id === selectedThemeId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const surveyData = {
        title: surveyTitle,
        description: surveyDescription,
        survey_category_id: selectedCategoryId,
        theme_id: selectedThemeId,
        user_id: userId,
      };

      const surveyResponse = await dispatch(createSurveyAction(surveyData));
      const surveyId = surveyResponse.id;

      const surveyPageData = {
        title: '',
        description: '',
        survey_id: surveyId,
      };

      const surveyPageResponse = await dispatch(createSurveyPageAction(surveyPageData));
      const surveyPageId = surveyPageResponse.id;

      navigate(`/surveys/${surveyId}/pages/${surveyPageId}`, {
        state: { surveyData, surveyPageData },
      });
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setValidationErrors(error.response.data.errors);
      } else {
        console.error('Error creating survey:', error);
      }
    }
  };

  return (
    <MuiBox
      mb={3}
      sx={{
        fontFamily: 'Roboto, Arial, sans-serif',
        width: '100%',                   // Fill parent width
        boxSizing: 'border-box',         // Prevent overflow from any padding
      }}
    >
      <form onSubmit={handleSubmit}>
        <MuiBox style={{ fontFamily: selectedFont }}>
          <MuiTextField
            fullWidth
            label="Survey Title"
            variant="outlined"
            margin="normal"
            size="medium"
            value={surveyTitle}
            onChange={e => setSurveyTitle(e.target.value)}
            required
          />
          <MuiTextField
            fullWidth
            label="Survey Description"
            variant="outlined"
            margin="normal"
            size="medium"
            multiline
            rows={8}
            value={surveyDescription}
            onChange={e => setSurveyDescription(e.target.value)}
          />
          <CategorySelector
            value={selectedCategoryId}
            onChange={e => setSelectedCategoryId(e.target.value)}
            options={surveyCategories.map(cat => ({ value: cat.id, label: cat.title }))}
            size="medium"
          />
          <ThemeSelector
            value={selectedThemeId}
            onChange={e => setSelectedThemeId(e.target.value)}
            options={surveyThemes.map(t => ({ value: t.id, label: t.title }))}
            size="medium"
          />
          <MuiBox sx={{ my: 2 }}>
            <FontSelector selectedFont={selectedFont} setSelectedFont={setSelectedFont} />
          </MuiBox>
        </MuiBox>
        <MuiBox display="flex" justifyContent="center" mt={2}>
          <MuiButton
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              padding: '12px 24px',
              fontSize: '1rem',
            }}
          >
            Create New Survey
          </MuiButton>
        </MuiBox>
        {Object.keys(validationErrors).length > 0 && (
          <MuiStyledErrorBox marginTop="1rem" bgcolor="#f44336" color="white" padding="1rem" borderRadius="4px">
            {Object.keys(validationErrors).map(key => (
              <MuiTypography key={key}>{validationErrors[key]}</MuiTypography>
            ))}
          </MuiStyledErrorBox>
        )}
      </form>
    </MuiBox>
  );
};

SurveyForm.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default SurveyForm;
