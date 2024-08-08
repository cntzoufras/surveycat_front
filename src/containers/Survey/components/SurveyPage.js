import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Box as MuiBox, Typography as MuiTypography, TextField as MuiTextField, Select as MuiSelect, MenuItem as MuiMenuItem, Button as MuiButton, Grid as MuiGrid } from '@mui/material';
import QuestionList from './QuestionList';
import AddQuestionModal from './AddQuestionModal';
import { useParams, useLocation } from 'react-router-dom';
import useDebounce from '../hooks/useDebounce'

const SurveyPage = ({
  handleOptionSelection,
}) => {
  const location = useLocation();
  // const { surveyData, surveyPageData } = location.state || {};
  const { surveyId, surveyPageId } = useParams();
  const [surveyTitle, setSurveyTitle] = useState('');
  const [surveyDescription, setSurveyDescription] = useState('');
  const [surveyPageTitle, setSurveyPageTitle] = useState('');
  const [surveyPageDescription, setSurveyPageDescription] = useState('');
  const [layout, setLayout] = useState('default');
  const [validationErrors, setValidationErrors] = useState({});
  const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] = useState(false);
  const [stockSurveys, setStockSurveys] = useState([]);
  const [selectedStockSurvey, setSelectedStockSurvey] = useState('');
  const [surveyQuestions, setSurveyQuestions] = useState([]);
  
  const debouncedSurveyTitle = useDebounce(surveyTitle, 1000);
  const debouncedSurveyDescription = useDebounce(surveyDescription, 1000);
  const debouncedSurveyPageTitle = useDebounce(surveyPageTitle, 1000);
  const debouncedSurveyPageDescription = useDebounce(surveyPageDescription, 1000);

  // const { surveyId, surveyPageId } = useParams();
    
   // Fetch initial data
  const fetchSurveyData = useCallback(async () => {
    try {
      const [surveyResponse, surveyPageResponse] = await Promise.all([
        axios.get(`http://surveycat.test/api/surveys/${surveyId}`),
        axios.get(`http://surveycat.test/api/survey-pages/${surveyPageId}`)
      ]);
      
      setSurveyTitle(surveyResponse.data.title);
      setSurveyDescription(surveyResponse.data.description);
      setSurveyPageTitle(surveyPageResponse.data.title);
      setSurveyPageDescription(surveyPageResponse.data.description);
    } catch (error) {
      console.error('Error fetching survey data:', error);
    }
  }, [surveyId, surveyPageId]);
  
  useEffect(() => {
    // Check if data is passed through state, if not fetch from server
    if (location.state) {
      const { surveyData, surveyPageData } = location.state;
      if (surveyData) {
        setSurveyTitle(surveyData.title);
        setSurveyDescription(surveyData.description);
      }
      if (surveyPageData) {
        setSurveyPageTitle(surveyPageData.title);
        setSurveyPageDescription(surveyPageData.description);
      }
    } else {
      fetchSurveyData();
    }
  }, [location.state, fetchSurveyData]);

  useEffect(() => {
      // Fetch stock surveys
      axios.get('http://surveycat.test/api/stock-surveys')
        .then(response => {
          setStockSurveys(response.data.data);
        })
        .catch(error => {
          console.error('Error fetching stock surveys:', error);
        });
    }, []);
  
   const fetchSurveyQuestions = useCallback((surveyId, surveyPageId) => {
    axios.get(`http://surveycat.test/api/surveys/${surveyId}/pages/${surveyPageId}/questions`)
      .then(response => {
        setSurveyQuestions(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
      });
  }, []);


  useEffect(() => {
    if (surveyPageId) {
      fetchSurveyQuestions(surveyId, surveyPageId);
    }
  }, [surveyPageId, fetchSurveyQuestions, surveyId]);
  
  useEffect(() => {
    if (debouncedSurveyTitle) {
      console.log('mesa debounce0');
      axios.put(`http://surveycat.test/api/surveys/${surveyId}`, { title: debouncedSurveyTitle,user_id:'947c7a94-5a0f-3f1d-9748-061ae08a60e5' })
        .catch(error => console.error('Error updating survey title:', error));
    }
  }, [debouncedSurveyTitle, surveyId]);

  useEffect(() => {
    if (debouncedSurveyDescription) {
      axios.put(`http://surveycat.test/api/surveys/${surveyId}`, { description: debouncedSurveyDescription, user_id:'947c7a94-5a0f-3f1d-9748-061ae08a60e5' })
        .catch(error => console.error('Error updating survey description:', error));
    }
  }, [debouncedSurveyDescription, surveyId]);

  useEffect(() => {
    if (debouncedSurveyPageTitle) {
      axios.put(`http://surveycat.test/api/survey-pages/${surveyPageId}`, { title: debouncedSurveyPageTitle })
        .catch(error => console.error('Error updating page title:', error));
    }
  }, [debouncedSurveyPageTitle, surveyPageId]);

  useEffect(() => {
    if (debouncedSurveyPageDescription) {
      axios.put(`http://surveycat.test/api/survey-pages/${surveyPageId}`, { description: debouncedSurveyPageDescription })
        .catch(error => console.error('Error updating page description:', error));
    }
  }, [debouncedSurveyPageDescription, surveyPageId]);

  
  const handleSurveyTitleChange = e => setSurveyTitle(e.target.value);
  const handleSurveyDescriptionChange = e => setSurveyDescription(e.target.value);
  
  const handleSurveyPageTitleChange = e => setSurveyPageTitle(e.target.value);
  const handleSurveyPageDescriptionChange = e => setSurveyPageDescription(e.target.value);
  
  const handleLayoutChange = e => setLayout(e.target.value);
  
  const openAddQuestionModal = () => setIsAddQuestionModalOpen(true);
  const closeAddQuestionModal = () => setIsAddQuestionModalOpen(false);

  const handleStockSurveyChange = e => {
    setSelectedStockSurvey(e.target.value);
    // You can add logic here to load the selected stock survey's details
  };

  const addQuestion = questionData => {
    axios
      .post(
        'http://surveycat.test/api/survey-questions',
        { ...questionData, survey_page_id: surveyPageId },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json, text/plain, */*',
            Referer: 'http://surveycat.test:3000/',
          },
        },
      )
      .then(() => {
        setValidationErrors({});
        fetchSurveyQuestions(surveyId, surveyPageId);
        closeAddQuestionModal();
      })
      .catch(error => {
        if (error.response && error.response.status === 422) {
          setValidationErrors(error.response.data.errors);
        } else {
          console.error(error);
        }
      });
  };
  
  const deleteQuestion = questionId => {
    axios
      .delete(`http://surveycat.test/api/survey-questions/${questionId}`)
      .then(() => {
        fetchSurveyQuestions(surveyId, surveyPageId); // Refresh the questions list after deleting
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <MuiGrid container spacing={4}>
      <MuiGrid item xs={3}>
        <MuiBox>
          <MuiTypography variant="h6">Select Premade Survey</MuiTypography>
          <MuiSelect
            fullWidth
            value={selectedStockSurvey}
            onChange={handleStockSurveyChange}
          >
            <MuiMenuItem value="">
              <em>None</em>
            </MuiMenuItem>
            {stockSurveys.map((survey) => (
              <MuiMenuItem key={survey.id} value={survey.id}>
                {survey.title}
              </MuiMenuItem>
            ))}
          </MuiSelect>
        </MuiBox>
      </MuiGrid>
      <MuiGrid item xs={9}>
        <MuiBox>
          <MuiTypography fontWeight="medium" variant="h2">Survey: {surveyTitle}</MuiTypography>
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
            rows={4}
            value={surveyDescription}
            onChange={handleSurveyDescriptionChange}
          />
          <MuiTypography variant="h4">Page: {surveyPageTitle}</MuiTypography>
          <MuiTextField
            fullWidth
            label="Page Title"
            variant="outlined"
            margin="normal"
            value={surveyPageTitle}
            onChange={handleSurveyPageTitleChange}
          />
          <MuiTextField
            fullWidth
            label="Page Description"
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            value={surveyPageDescription}
            onChange={handleSurveyPageDescriptionChange}
          />

          <MuiSelect
            fullWidth
            value={layout}
            onChange={handleLayoutChange}
            displayEmpty
          >
            <MuiMenuItem value="default">Default</MuiMenuItem>
            {/* Add other layout options here */}
          </MuiSelect>
          <QuestionList
            questions={surveyQuestions || []}
            onDelete={deleteQuestion}
            onOptionSelection={handleOptionSelection}
          />
          <MuiButton variant="contained" color="primary" onClick={openAddQuestionModal}>
            Add Question
          </MuiButton>
          {isAddQuestionModalOpen && (
            <AddQuestionModal
              isOpen={isAddQuestionModalOpen}
              onClose={closeAddQuestionModal}
              onSubmit={addQuestion}
              validationErrors={validationErrors}
            />
          )}
        </MuiBox>
      </MuiGrid>
    </MuiGrid>
  );
}

export default SurveyPage;
