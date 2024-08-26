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
  IconButton as MuiIconButton
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import {
  updateSurveyTitleAction,
  updateSurveyDescriptionAction, 
  updateSurveyPageTitleAction, 
  updateSurveyPageDescriptionAction,
  addSurveyPageAction,
  fetchSurveyQuestionsAction,
  fetchStockSurveysAction,
  deleteSurveyQuestionAction,
  createSurveyQuestionAction,
} from '@/redux/actions/surveyActions';
import QuestionList from './QuestionList';
import AddQuestionModal from './AddQuestionModal';

const SurveyPage = ({ handleOptionSelection }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { surveyId, surveyPageId } = useParams();

  const { user } = useSelector(state => state.auth);
  const surveyPages = useSelector(state => state.survey.surveyPages);
  const surveyQuestions = useSelector(state => state.survey.questions);
  const stockSurveys = useSelector(state => state.survey.stockSurveys);
  
  const surveyTitle = useSelector(state => state.survey.survey?.title);
  const surveyDescription = useSelector(state => state.survey.survey?.description);
  const surveyPageTitle = useSelector(state => state.survey.surveyPage?.title);
  const surveyPageDescription = useSelector(state => state.survey.surveyPage?.description);

  const [layout, setLayout] = useState('default');
  const [validationErrors, setValidationErrors] = useState({});
  const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  useEffect(() => {
    if (!user?.id) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (surveyId) {
      dispatch(fetchSurveyQuestionsAction(surveyId, surveyPageId));
      dispatch(fetchStockSurveysAction());
    }
  }, [surveyId, surveyPageId, dispatch]);

  useEffect(() => {
    if (surveyPages.length > 0) {
      setCurrentPageIndex(surveyPages.findIndex(page => page.id === surveyPageId));
    }
  }, [surveyPages, surveyPageId]);

  const handleSurveyTitleChange = (e) => {
    const newSurveyTitle = e.target.value;
    dispatch(updateSurveyTitleAction(surveyId, newSurveyTitle));
  };

  const handleSurveyDescriptionChange = (e) => {
    const newSurveyDescription = e.target.value;
    dispatch(updateSurveyDescriptionAction(surveyId, newSurveyDescription));
  };
  
  const handleSurveyPageTitleChange = (e) => {
    const newPageTitle = e.target.value;
    dispatch(updateSurveyPageTitleAction(surveyPageId, newPageTitle));
  };
  
  const handleSurveyPageDescriptionChange = (e) => {
    const newSurveyPageDescription = e.target.value;
    dispatch(updateSurveyPageDescriptionAction(surveyPageId, newSurveyPageDescription));
  };
  
  const handleLayoutChange = (e) => {
    setLayout(e.target.value);
  };

  const handleAddNewPage = async () => {
    try {
      const newPageData = {
        title: '',
        description: '',
        survey_id: surveyId,
      };
      const newPage = await dispatch(addSurveyPageAction(surveyId, newPageData));

      navigate(`/surveys/${surveyId}/pages/${newPage.id}`);

      setCurrentPageIndex(surveyPages.length);
      setValidationErrors({});
    } catch (error) {
      console.error('Error adding new page:', error);
      if (error.response && error.response.status === 422) {
        setValidationErrors(error.response.data.errors);
      }
    }
  };

  const handleNextPage = () => {
    if (currentPageIndex < surveyPages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  const openAddQuestionModal = () => setIsAddQuestionModalOpen(true);
  const closeAddQuestionModal = () => setIsAddQuestionModalOpen(false);

  const handleAddQuestionSubmit = async (questionData) => {
    try {
      await dispatch(createSurveyQuestionAction({ ...questionData, survey_page_id: surveyPageId }));
      await dispatch(fetchSurveyQuestionsAction(surveyId, surveyPageId));
      closeAddQuestionModal();
      setValidationErrors({});
    } catch (error) {
      console.error('Error adding question:', error);
      if (error.response && error.response.status === 422) {
        setValidationErrors(error.response.data.errors);
      }
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      await dispatch(deleteSurveyQuestionAction(questionId));
      await dispatch(fetchSurveyQuestionsAction(surveyId, surveyPageId));
      setValidationErrors({});
    } catch (error) {
      console.error('Error adding question:', error);
      if (error.response && error.response.status === 422) {
        setValidationErrors(error.response.data.errors);
      }
    }
  };

  const handleStockSurveyChange = e => setSelectedStockSurvey(e.target.value);

  return (
    <MuiGrid container spacing={4}>
      <MuiGrid item xs={12} md={4}>
        <MuiBox sx={{ paddingBottom: 4 }}>
          <MuiTypography variant="h6" sx={{ fontWeight: 300 }}>Select Stock Survey</MuiTypography>
          <MuiSelect fullWidth value={surveyId} onChange={handleStockSurveyChange}>
            <MuiMenuItem value=""><em>None</em></MuiMenuItem>
            {stockSurveys.map(survey => (
              <MuiMenuItem key={survey.id} value={survey.id}>{survey.title}</MuiMenuItem>
            ))}
          </MuiSelect>
        </MuiBox>
        <MuiBox>
          <MuiTypography fontWeight="300" variant="h3">
            {surveyTitle}
          </MuiTypography>
          <MuiTextField 
            fullWidth 
            label="Survey Title" 
            variant="outlined" 
            margin="normal" 
            value={surveyTitle || ''} 
            onChange={handleSurveyTitleChange} 
          />
          <MuiTextField 
            fullWidth 
            label="Survey Description" 
            variant="outlined" 
            margin="normal" 
            multiline 
            rows={6} 
            value={surveyDescription || ''} 
            onChange={handleSurveyDescriptionChange} 
            sx={{ paddingBottom: 3, fontWeight: 300 }}
          />
          <MuiTypography variant="h5" sx={{ paddingBottom: 1.5, fontWeight: 300 }}>
            Survey Page title: {surveyPageTitle || 'No page selected'}
          </MuiTypography>
          <MuiTextField 
            fullWidth 
            label="Page Title" 
            variant="outlined" 
            margin="normal" 
            value={surveyPageTitle || ''} 
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
            value={surveyPageDescription || ''} 
            onChange={handleSurveyPageDescriptionChange} 
            InputLabelProps={{ shrink: true }} 
          />
          <MuiSelect fullWidth value={layout} onChange={handleLayoutChange} displayEmpty>
            <MuiMenuItem value="default">Default</MuiMenuItem>
            <MuiMenuItem value="single">Single</MuiMenuItem>
            <MuiMenuItem value="multiple">Multiple</MuiMenuItem>
          </MuiSelect>
          <MuiBox sx={{ display: 'flex', justifyContent: 'space-between', paddingTop: 2 }}>
            <MuiIconButton onClick={handlePrevPage} disabled={currentPageIndex <= 0}>
              <ArrowBackIos />
            </MuiIconButton>
            <MuiIconButton onClick={handleNextPage} disabled={currentPageIndex >= surveyPages.length - 1}>
              <ArrowForwardIos />
            </MuiIconButton>
            <MuiButton 
              variant="contained" 
              color="secondary" 
              onClick={handleAddNewPage}
            >
              Add New Page
            </MuiButton>
          </MuiBox>
        </MuiBox>
      </MuiGrid>
      <MuiGrid item xs={12} md={8}>
        <MuiBox sx={{ marginLeft: { xs: 0, md: 4 } }}>
          <QuestionList 
            questions={surveyQuestions} 
            onDelete={handleDeleteQuestion} 
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
            currentSurveyPageId={surveyPages[currentPageIndex]?.id}
            onAddNewPage={handleAddNewPage}
          />
        )}
      </MuiGrid>
    </MuiGrid>
  );
};

SurveyPage.propTypes = {
  handleOptionSelection: PropTypes.func.isRequired,
};

export default SurveyPage;
