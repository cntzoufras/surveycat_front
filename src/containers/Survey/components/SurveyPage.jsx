import React, { useState, useEffect, useCallback } from 'react';
import {
 Box as MuiBox, Typography as MuiTypography, TextField as MuiTextField, Select as MuiSelect, MenuItem as MuiMenuItem, Button as MuiButton, Grid as MuiGrid, 
} from '@mui/material';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector hook
import { useNavigate } from 'react-router-dom';
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

  const {
 surveyQuestions, fetchSurveyQuestions, addQuestion, deleteQuestion, 
} = useSurveyQuestions({ surveyId, surveyPageId });
  const { surveyPages, fetchSurveyPages, addSurveyPage } = useSurveyPages({ surveyId });

  const [layout, setLayout] = useState('default');
  const [validationErrors, setValidationErrors] = useState({});
  const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] = useState(false);

  const debouncedSurveyTitle = useDebounce(surveyTitle, 1000);
  const debouncedSurveyDescription = useDebounce(surveyDescription, 1000);
  const debouncedSurveyPageTitle = useDebounce(surveyPageTitle, 1000);
  const debouncedSurveyPageDescription = useDebounce(surveyPageDescription, 1000);
  
  useEffect(() => {
    console.log('SurveyPage useEffect triggered with surveyId:', surveyId, 'surveyPageId:', surveyPageId);
    let isMounted = true;

    const fetchData = async () => {
      console.log('fetchData function triggered');
      console.log('fetchData function triggered with surveyId:', surveyId, 'and surveyPageId:', surveyPageId);

      try {
        if (surveyId && surveyPageId) {
          console.log(`Fetching data for SurveyID: ${surveyId} SurveyPageID: ${surveyPageId}`);
          await Promise.all([fetchSurveyData(), fetchSurveyPages(), fetchSurveyQuestions()]);
        }
      } catch (error) {
          console.error('Error fetching data:', error);
        }
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
      updateSurveyTitle(surveyId, debouncedSurveyTitle, user_id)
        .then(() => fetchSurveyData())
        .catch(error => console.error('Error updating survey title:', error));
    }
  }, [debouncedSurveyTitle, surveyId, fetchSurveyData, user_id]);

  useEffect(() => {
    if (debouncedSurveyDescription) {
      updateSurveyDescription(surveyId, debouncedSurveyDescription, user_id)
        .then(() => fetchSurveyData())
        .catch(error => console.error('Error updating survey description:', error));
    }
  }, [debouncedSurveyDescription, surveyId, fetchSurveyData, user_id]);

  useEffect(() => {
    if (debouncedSurveyPageTitle) {
      updateSurveyPageTitle(surveyPageId, debouncedSurveyPageTitle, user_id)
        .then(() => fetchSurveyData())
        .catch(error => console.error('Error updating page title:', error));
    }
  }, [debouncedSurveyPageTitle, surveyPageId, fetchSurveyData, user_id]);

  useEffect(() => {
    if (debouncedSurveyPageDescription) {
      updateSurveyPageDescription(surveyPageId, debouncedSurveyPageDescription, user_id)
        .then(() => fetchSurveyData())
        .catch(error => console.error('Error updating page description:', error));
    }
  }, [debouncedSurveyPageDescription, surveyPageId, fetchSurveyData, user_id]);

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
      fetchSurveyPages(); // Fetch pages again to update the list
      setSurveyPageTitle(''); // Clear any existing title in the state
      setSurveyPageDescription(''); // Clear any existing description in the state
      return response.data; // Return the new page data
    } catch (error) {
      console.error('Error adding new page:', error);
    }
  };

  
  const openAddQuestionModal = () => {
    setIsAddQuestionModalOpen(true);
    console.log('modal open state: ', isAddQuestionModalOpen);
    };
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
            <AddQuestionModal 
              isOpen={isAddQuestionModalOpen} 
              onClose={closeAddQuestionModal} 
              onSubmit={addQuestion} 
              surveyPages={surveyPages}
              currentSurveyPageId={surveyPageId}
              onAddNewPage={handleAddNewPage}
              validationErrors={validationErrors}
            />
          )}
        </MuiBox>
      </MuiGrid>
    </MuiGrid>
  );
};

export default SurveyPage;
