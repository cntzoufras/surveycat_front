import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Box as MuiBox, Typography as MuiTypography, TextField as MuiTextField, Select as MuiSelect, MenuItem as MuiMenuItem, Button as MuiButton, Grid as MuiGrid } from '@mui/material';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';  // Import useSelector hook
import { useNavigate } from 'react-router-dom';
import useDebounce from '../hooks/useDebounce';
import useSurveyData from '../hooks/useSurveyData';
import useSurveyQuestions from '../hooks/useSurveyQuestions';
import QuestionList from './QuestionList';
import AddQuestionModal from './AddQuestionModal';

const SurveyPage = ({ handleOptionSelection }) => {
  const navigate = useNavigate();

  const location = useLocation();
  const { surveyId, surveyPageId } = useParams();

  const { user } = useSelector((state) => state.auth);
  const user_id = user?.id;
  console.log('user_id:', user_id);
  
  useEffect(() => {
    if (!user_id) {
      console.log('User is not logged in, redirecting to login...');
      navigate('/login');
    }
  }, [user_id, navigate]);

  if (!user_id) {
    return <div>Loading user data...</div>;
  }

  const {
    surveyTitle,
    surveyDescription,
    surveyPageTitle,
    surveyPageDescription,
    setSurveyTitle,
    setSurveyDescription,
    setSurveyPageTitle,
    setSurveyPageDescription,
    stockSurveys,
    selectedStockSurvey,
    setSelectedStockSurvey,
    fetchSurveyData,
  } = useSurveyData({ surveyId, surveyPageId, location });

  const { surveyQuestions, fetchSurveyQuestions, addQuestion, deleteQuestion } = useSurveyQuestions({ surveyId, surveyPageId });

  const [layout, setLayout] = useState('default');
  const [validationErrors, setValidationErrors] = useState({});
  const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] = useState(false);

  const debouncedSurveyTitle = useDebounce(surveyTitle, 1000);
  const debouncedSurveyDescription = useDebounce(surveyDescription, 1000);
  const debouncedSurveyPageTitle = useDebounce(surveyPageTitle, 1000);
  const debouncedSurveyPageDescription = useDebounce(surveyPageDescription, 1000);

  useEffect(() => {
    if (surveyId && surveyPageId) {
      fetchSurveyData();
    }
  }, [surveyId, surveyPageId, fetchSurveyData]);

  useEffect(() => {
    if (surveyPageId) {
      fetchSurveyQuestions();
    }
  }, [surveyPageId, fetchSurveyQuestions]);

  useEffect(() => {
    if (debouncedSurveyTitle) {
      axios.put(`http://surveycat.test/api/surveys/${surveyId}`, 
        {
          title: debouncedSurveyTitle, 
          user_id: user_id 
        },
        {
          withCredentials: true,
          withXSRFToken:true
        }
      )
      .then(() => fetchSurveyData())  // Fetch latest data after update
      .catch(error => console.error('Error updating survey title:', error));
    }
  }, [debouncedSurveyTitle, surveyId, fetchSurveyData]);

  useEffect(() => {
    if (debouncedSurveyDescription) {
      axios.put(`http://surveycat.test/api/surveys/${surveyId}`,
        { 
          description: debouncedSurveyDescription, 
          user_id: user_id 
        },
        {
          withCredentials: true,
          withXSRFToken:true
        }
      )
      .then(() => fetchSurveyData())  // Fetch latest data after update
      .catch(error => console.error('Error updating survey description:', error));
    }
  }, [debouncedSurveyDescription, surveyId, fetchSurveyData]);

  useEffect(() => {
    if (debouncedSurveyPageTitle) {
      axios.put(`http://surveycat.test/api/survey-pages/${surveyPageId}`, 
        { 
          title: debouncedSurveyPageTitle 
        },
        {
          withCredentials: true,
          withXSRFToken:true
        }
      )
      .then(() => fetchSurveyData())  // Fetch latest data after update
      .catch(error => console.error('Error updating page title:', error));
    }
  }, [debouncedSurveyPageTitle, surveyPageId, fetchSurveyData]);

  useEffect(() => {
    if (debouncedSurveyPageDescription) {
      axios.put(`http://surveycat.test/api/survey-pages/${surveyPageId}`, 
        { 
          description: debouncedSurveyPageDescription 
        },
        {
          withCredentials: true,
          withXSRFToken:true
        }
      )
      .then(() => fetchSurveyData())  // Fetch latest data after update
      .catch(error => console.error('Error updating page description:', error));
    }
  }, [debouncedSurveyPageDescription, surveyPageId, fetchSurveyData]);

  const handleSurveyTitleChange = e => setSurveyTitle(e.target.value);
  const handleSurveyDescriptionChange = e => setSurveyDescription(e.target.value);
  const handleSurveyPageTitleChange = e => setSurveyPageTitle(e.target.value);
  const handleSurveyPageDescriptionChange = e => setSurveyPageDescription(e.target.value);
  const handleLayoutChange = e => setLayout(e.target.value);
  const openAddQuestionModal = () => setIsAddQuestionModalOpen(true);
  const closeAddQuestionModal = () => setIsAddQuestionModalOpen(false);
  const handleStockSurveyChange = e => setSelectedStockSurvey(e.target.value);

  return (
    <MuiGrid container spacing={4}>
      <MuiGrid item xs={3}>
        <MuiBox>
          <MuiTypography variant="h6">Select Premade Survey</MuiTypography>
          <MuiSelect fullWidth value={selectedStockSurvey} onChange={handleStockSurveyChange}>
            <MuiMenuItem value=""><em>None</em></MuiMenuItem>
            {stockSurveys.map(survey => (
              <MuiMenuItem key={survey.id} value={survey.id}>{survey.title}</MuiMenuItem>
            ))}
          </MuiSelect>
        </MuiBox>
      </MuiGrid>
      <MuiGrid item xs={9}>
        <MuiBox>
          <MuiTypography fontWeight="medium" variant="h2">Survey: {surveyTitle}</MuiTypography>
          <MuiTextField fullWidth label="Survey Title" variant="outlined" margin="normal" value={surveyTitle} onChange={handleSurveyTitleChange} />
          <MuiTextField fullWidth label="Survey Description" variant="outlined" margin="normal" multiline rows={4} value={surveyDescription} onChange={handleSurveyDescriptionChange} />
          <MuiTypography variant="h4">Page: {surveyPageTitle}</MuiTypography>
          <MuiTextField fullWidth label="Page Title" variant="outlined" margin="normal" value={surveyPageTitle} onChange={handleSurveyPageTitleChange} />
          <MuiTextField fullWidth label="Page Description" variant="outlined" margin="normal" multiline rows={4} value={surveyPageDescription} onChange={handleSurveyPageDescriptionChange} />
          <MuiSelect fullWidth value={layout} onChange={handleLayoutChange} displayEmpty>
            <MuiMenuItem value="default">Default</MuiMenuItem>
            <MuiMenuItem value="default">Single</MuiMenuItem>
            <MuiMenuItem value="default">Multiple</MuiMenuItem>
            {/* Add other layout options here */}
          </MuiSelect>
          <QuestionList questions={surveyQuestions} onDelete={deleteQuestion} onOptionSelection={handleOptionSelection} />
          <MuiButton variant="contained" color="primary" onClick={openAddQuestionModal}>Add Question</MuiButton>
          {isAddQuestionModalOpen && (
            <AddQuestionModal isOpen={isAddQuestionModalOpen} onClose={closeAddQuestionModal} onSubmit={addQuestion} validationErrors={validationErrors} />
          )}
        </MuiBox>
      </MuiGrid>
    </MuiGrid>
  );
}

export default SurveyPage;
