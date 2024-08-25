import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box as MuiBox, 
  Typography as MuiTypography, 
  TextField as MuiTextField, 
  Select as MuiSelect, 
  MenuItem as MuiMenuItem, 
  Button as MuiButton, 
  Grid as MuiGrid, 
} from '@mui/material';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  updateSurveyTitle, updateSurveyDescription, updateSurveyPageTitle, updateSurveyPageDescription, 
} from '@/utils/api/survey-api';
import useDebounce from '../hooks/useDebounce';
import useSurveyData from '../hooks/useSurveyData';
import useSurveyQuestions from '../hooks/useSurveyQuestions';
import useSurveyPages from '../hooks/useSurveyPages';
import QuestionList from './QuestionList';
import AddQuestionModal from './AddQuestionModal';

const SurveyPage = ({ surveyPage, questions, handleOptionSelection }) => {
  console.log('SurveyPage props:', { surveyPage, questions });

  const navigate = useNavigate();
  const location = useLocation();
  const { surveyId, surveyPageId } = useParams();
  console.log('SurveyPage component rendered with surveyId:', surveyId, 'and surveyPageId:', surveyPageId);
  

  const { user } = useSelector(state => state.auth);
  const userId = user?.id;
  console.log('userId:', userId);
  
  useEffect(() => {
    if (!userId) {
      console.log('User is not logged in, redirecting to login...');
      navigate('/login');
    }
  }, [userId, navigate]);

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

  const { surveyPages, fetchSurveyPages, addSurveyPage } = useSurveyPages();
  
  const { 
    surveyQuestions, 
    fetchSurveyQuestions, 
    addQuestion, 
    deleteQuestion, 
  } = useSurveyQuestions({ surveyId, surveyPageId });

  const [layout, setLayout] = useState('default');
  const [validationErrors] = useState({});
  const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] = useState(false);

  const debouncedSurveyTitle = useDebounce(surveyTitle, 5000);
  const debouncedSurveyDescription = useDebounce(surveyDescription, 5000);
  const debouncedSurveyPageTitle = useDebounce(surveyPageTitle, 5000);
  const debouncedSurveyPageDescription = useDebounce(surveyPageDescription, 5000);
  
  useEffect(() => {
    console.log('SurveyPage useEffect triggered with surveyId:', surveyId, 'surveyPageId:', surveyPageId);
    let isMounted = true;

    const fetchData = async () => {
      console.log('fetchData function triggered with surveyId:', surveyId, 'and surveyPageId:', surveyPageId);

      try {
        if (surveyId && surveyPageId && isMounted) {
          console.log(`Fetching data for SurveyID: ${surveyId} SurveyPageID: ${surveyPageId}`);
          await Promise.all([
            fetchSurveyData(), 
            fetchSurveyPages(surveyId), 
            fetchSurveyQuestions()
          ]);
        }
      } catch (error) {
          console.error('Error fetching data:', error);
          return null;
      }
      return true;
    };

    if (isMounted) {
      fetchData();
    }

    return () => {
      isMounted = false;
      console.log('SurveyPage component unmounted');
    };
  }, [surveyId, surveyPageId, fetchSurveyData, fetchSurveyPages, fetchSurveyQuestions]);

  useEffect(() => {
    if (debouncedSurveyTitle) {
      updateSurveyTitle(surveyId, debouncedSurveyTitle, userId)
        .then(() => fetchSurveyData())
        .catch(error => console.error('Error updating survey title:', error));
    }
  }, [debouncedSurveyTitle, surveyId, fetchSurveyData, userId]);

  useEffect(() => {
    if (debouncedSurveyDescription) {
      updateSurveyDescription(surveyId, debouncedSurveyDescription, userId)
        .then(() => fetchSurveyData())
        .catch(error => console.error('Error updating survey description:', error));
    }
  }, [debouncedSurveyDescription, surveyId, fetchSurveyData, userId]);

  useEffect(() => {
    if (debouncedSurveyPageTitle) {
      updateSurveyPageTitle(surveyPageId, debouncedSurveyPageTitle, userId)
        .then(() => fetchSurveyData())
        .catch(error => console.error('Error updating page title:', error));
    }
  }, [debouncedSurveyPageTitle, surveyPageId, fetchSurveyData, userId]);

  useEffect(() => {
    if (debouncedSurveyPageDescription) {
      updateSurveyPageDescription(surveyPageId, debouncedSurveyPageDescription, userId)
        .then(() => fetchSurveyData())
        .catch(error => console.error('Error updating page description:', error));
    }
  }, [debouncedSurveyPageDescription, surveyPageId, fetchSurveyData, userId]);

  const handleSurveyTitleChange = e => setSurveyTitle(e.target.value);
  const handleSurveyDescriptionChange = e => setSurveyDescription(e.target.value);
  const handleSurveyPageTitleChange = e => setSurveyPageTitle(e.target.value);
  const handleSurveyPageDescriptionChange = e => setSurveyPageDescription(e.target.value);
  const handleLayoutChange = e => setLayout(e.target.value);
  const handleAddNewPage = async () => {
    try {
      const newPageData = {
        title: '',
        description: '',
        survey_id: surveyId,
      };
      const response = await addSurveyPage(newPageData);
      fetchSurveyPages();
      setSurveyPageTitle('');
      setSurveyPageDescription('');
      return response.data;
    } catch (error) {
      console.error('Error adding new page:', error);
      return null;
    }
  };

  
  const openAddQuestionModal = () => {
    setIsAddQuestionModalOpen(true);
    console.log('modal open state: ', isAddQuestionModalOpen);
    };
  const closeAddQuestionModal = () => setIsAddQuestionModalOpen(false);
  
  const handleAddQuestionSubmit = async (questionData) => {
    try {
      await addQuestion(questionData);
      await fetchSurveyQuestions();
      closeAddQuestionModal();
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  const handleStockSurveyChange = e => setSelectedStockSurvey(e.target.value);

  return (
    <MuiGrid container spacing={4}>
      <MuiGrid item xs={12} md={4}>
        <MuiBox sx={{ paddingBottom: 4 }}>
          <MuiTypography variant="h6" sx={{ fontWeight: 300 }}>Select Stock Survey</MuiTypography>
          <MuiSelect fullWidth value={selectedStockSurvey} onChange={handleStockSurveyChange}>
            <MuiMenuItem value=""><em>None</em></MuiMenuItem>
            {stockSurveys.map(survey => (
              <MuiMenuItem key={survey.id} value={survey.id}>{survey.title}</MuiMenuItem>
            ))}
          </MuiSelect>
        </MuiBox>
        <MuiBox>
          <MuiTypography 
            fontWeight="300" 
            variant="h3"
          >
            {surveyTitle}
          </MuiTypography>
          <MuiTextField 
            fullWidth 
            label="Survey Title" 
            variant="outlined" 
            margin="normal" 
            value={surveyTitle} 
            onChange={handleSurveyTitleChange} 
          />
          <MuiTextField 
            fullWidth 
            label="Survey Description" 
            variant="outlined" 
            margin="normal" 
            multiline 
            rows={6} 
            value={surveyDescription} 
            onChange={handleSurveyDescriptionChange} 
            sx={{ paddingBottom: 3, fontWeight: 300 }}
          />
          <MuiTypography variant="h5" sx={{ paddingBottom: 1.5, fontWeight: 300 }}>Survey Page title: {surveyPageTitle}</MuiTypography>
          <MuiTextField 
            fullWidth 
            label="Page Title" 
            variant="outlined" 
            margin="normal" 
            value={surveyPageTitle} 
            onChange={handleSurveyPageTitleChange} 
            sx={{ paddingBottom: 1.5 }}
          />
          <MuiTextField 
            fullWidth 
            label="Page Description" 
            variant="outlined" 
            margin="normal" 
            multiline 
            rows={6} 
            value={surveyPageDescription} 
            onChange={handleSurveyPageDescriptionChange} 
            InputLabelProps={{ shrink: true }} 
          />
          <MuiSelect fullWidth value={layout} onChange={handleLayoutChange} displayEmpty>
            <MuiMenuItem value="default">Default</MuiMenuItem>
            <MuiMenuItem value="default">Single</MuiMenuItem>
            <MuiMenuItem value="default">Multiple</MuiMenuItem>
          </MuiSelect>
        </MuiBox>
      </MuiGrid>
      <MuiGrid item xs={12} md={8}>
        <MuiBox sx={{ marginLeft: { xs: 0, md: 4 } }}>
          <QuestionList 
            questions={surveyQuestions} 
            onDelete={deleteQuestion} 
            onOptionSelection={handleOptionSelection} 
          />
          <MuiButton 
            variant="contained" 
            color="primary" 
            sx={{ marginTop: 0.1 }}
            onClick={openAddQuestionModal}
          >
            Add Question
          </MuiButton>
        </MuiBox>  
        {isAddQuestionModalOpen && (
          <AddQuestionModal 
            isOpen={isAddQuestionModalOpen} 
            onClose={closeAddQuestionModal} 
            onSubmit={handleAddQuestionSubmit} 
            surveyPages={surveyPages}
            currentSurveyPageId={surveyPageId}
            onAddNewPage={handleAddNewPage}
            validationErrors={validationErrors}
          />
        )}
      </MuiGrid>
    </MuiGrid>
  );
};

SurveyPage.propTypes = {
  surveyPage: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string,
    }),
  ).isRequired,
  handleOptionSelection: PropTypes.func.isRequired,
};

export default SurveyPage;
