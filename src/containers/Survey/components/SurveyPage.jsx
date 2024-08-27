import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';
import {
  Box as MuiBox,
  Typography as MuiTypography,
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
  fetchSurveyPagesAction,
  fetchStockSurveysAction,
  fetchSurveyAction,
  deleteSurveyQuestionAction,
  createSurveyQuestionAction,
  publishSurveyAction,
} from '@/redux/actions/surveyActions'; // ... other imports

import SurveyTitleField from './SurveyTitleField';
import SurveyDescriptionField from './SurveyDescriptionField';
import SurveyPageTitleField from './SurveyPageTitleField';
import SurveyPageDescriptionField from './SurveyPageDescriptionField';
import SurveyPageNavigation from './SurveyPageNavigation';
import ConfirmPublishModal from './ConfirmPublishModal';
import AddQuestionModal from './AddQuestionModal';
import QuestionList from './QuestionList';

const SurveyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { surveyId, surveyPageId } = useParams();

  const { user } = useSelector(state => state.auth);

  const survey = useSelector(state => state.survey.survey);
  const surveyTitle = survey?.title || '';
  const surveyDescription = survey?.description || '';

  const surveyPages = useSelector(state => state.survey.surveyPages);
  const surveyQuestions = useSelector(state => state.survey.questions);
  const stockSurveys = useSelector(state => state.survey.stockSurveys || []);
  const surveyPageTitle = useSelector(state => state.survey.surveyPage?.title);
  const surveyPageDescription = useSelector(state => state.survey.surveyPage?.description);

  const [localSurveyTitle, setLocalSurveyTitle] = useState(surveyTitle);
  const [localSurveyDescription, setLocalSurveyDescription] = useState(surveyDescription);
  const [localSurveyPageTitle, setLocalSurveyPageTitle] = useState('');
  const [localSurveyPageDescription, setLocalSurveyPageDescription] = useState('');
  const [layout, setLayout] = useState('default');
  const [validationErrors, setValidationErrors] = useState({});
  const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [selectedStockSurvey, setSelectedStockSurvey] = useState('');

  useEffect(() => {
    if (!user?.id) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (surveyId) {
      dispatch(fetchSurveyAction(surveyId));
      dispatch(fetchSurveyPagesAction(surveyId));
      dispatch(fetchStockSurveysAction());
    }
  }, [surveyId, dispatch]);

  useEffect(() => {
    if (surveyId && surveyPageId) {
      dispatch(fetchSurveyQuestionsAction(surveyId, surveyPageId));
    }
  }, [surveyId, surveyPageId, dispatch]);

  useEffect(() => {
    if (surveyPages.length > 0 && surveyPageId) {
      const currentPageIndex = surveyPages.findIndex(page => page.id === surveyPageId);
      setCurrentPageIndex(currentPageIndex);

      const currentPage = surveyPages[currentPageIndex];
      if (currentPage) {
        setLocalSurveyPageTitle(currentPage.title || '');
        setLocalSurveyPageDescription(currentPage.description || '');
      }
    }
  }, [surveyPages, surveyPageId]);

  useEffect(() => {
    setLocalSurveyTitle(surveyTitle);
  }, [surveyTitle]);

  useEffect(() => {
    setLocalSurveyDescription(surveyDescription);
  }, [surveyDescription]);

  useEffect(() => {
    setLocalSurveyPageTitle(surveyPageTitle || '');
  }, [surveyPageTitle]);

  useEffect(() => {
    setLocalSurveyPageDescription(surveyPageDescription || '');
  }, [surveyPageDescription]);

  const debouncedUpdateSurveyTitle = useCallback(
    debounce((newSurveyTitle) => {
      if (newSurveyTitle.trim()) {
        dispatch(updateSurveyTitleAction(surveyId, newSurveyTitle));
      }
    }, 1500),
    [dispatch, surveyId]
  );

  const debouncedUpdateSurveyDescription = useCallback(
    debounce((newSurveyDescription) => {
      if (newSurveyDescription.trim()) {
        dispatch(updateSurveyDescriptionAction(surveyId, newSurveyDescription));
      }
    }, 1500),
    [dispatch, surveyId]
  );

  const debouncedUpdateSurveyPageTitle = useCallback(
    debounce((newSurveyPageTitle) => {
      if (newSurveyPageTitle.trim()) {
        dispatch(updateSurveyPageTitleAction(surveyPageId, newSurveyPageTitle));
      }
    }, 1500),
    [dispatch, surveyPageId]
  );

  const debouncedUpdateSurveyPageDescription = useCallback(
    debounce((newSurveyPageDescription) => {
      if (newSurveyPageDescription.trim()) {
        dispatch(updateSurveyPageDescriptionAction(surveyPageId, newSurveyPageDescription));
      }
    }, 1500),
    [dispatch, surveyPageId]
  );

  const handleStockSurveyChange = (e) => {
    const selectedSurveyId = e.target.value;
    setSelectedStockSurvey(selectedSurveyId);
  };

  const handleSurveyTitleChange = (e) => {
    const newSurveyTitle = e.target.value;
    setLocalSurveyTitle(newSurveyTitle);
    debouncedUpdateSurveyTitle(newSurveyTitle);
  };

  const handleSurveyDescriptionChange = (e) => {
    const newSurveyDescription = e.target.value;
    setLocalSurveyDescription(newSurveyDescription);
    debouncedUpdateSurveyDescription(newSurveyDescription);
  };

  const handleSurveyPageTitleChange = (e) => {
    const newSurveyPageTitle = e.target.value;
    setLocalSurveyPageTitle(newSurveyPageTitle);
    debouncedUpdateSurveyPageTitle(newSurveyPageTitle);
  };

  const handleSurveyPageDescriptionChange = (e) => {
    const newSurveyPageDescription = e.target.value;
    setLocalSurveyPageDescription(newSurveyPageDescription);
    debouncedUpdateSurveyPageDescription(newSurveyPageDescription);
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

      setCurrentPageIndex(surveyPages.length);
      setLocalSurveyPageTitle('');
      setLocalSurveyPageDescription('');
      navigate(`/surveys/${surveyId}/pages/${newPage.id}`);
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
      const nextPageId = surveyPages[currentPageIndex + 1]?.id;
      if (nextPageId) {
        setCurrentPageIndex(currentPageIndex + 1);
        navigate(`/surveys/${surveyId}/pages/${nextPageId}`);
      }
    }
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      const prevPageId = surveyPages[currentPageIndex - 1]?.id;
      if (prevPageId) {
        setCurrentPageIndex(currentPageIndex - 1);
        navigate(`/surveys/${surveyId}/pages/${prevPageId}`);
      }
    }
  };

  const handleSurveyPageSelection = (selectedPageId) => {
    if (selectedPageId) {
      navigate(`/surveys/${surveyId}/pages/${selectedPageId}`);
    }
  };

  const openAddQuestionModal = () => setIsAddQuestionModalOpen(true);
  const closeAddQuestionModal = () => setIsAddQuestionModalOpen(false);

  const openPublishModal = () => setIsPublishModalOpen(true);
  const closePublishModal = () => setIsPublishModalOpen(false);

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

  const handlePublishSurvey = async () => {
    try {
      const publishResponse = await dispatch(publishSurveyAction(surveyId));
      const publicUrl = `/surveys/public/${publishResponse.id}`;
      navigate(publicUrl);
    } catch (error) {
      console.error('Error publishing survey:', error);
    }
  };

  return (
    <MuiGrid container spacing={4}>
      <MuiGrid item xs={12} md={4}>
        <MuiBox sx={{ paddingBottom: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <MuiTypography variant="h6" sx={{ fontWeight: 300 }}>Select Stock Survey</MuiTypography>
          <MuiSelect
            fullWidth
            value={selectedStockSurvey}
            onChange={handleStockSurveyChange}
          >
            <MuiMenuItem value=""><em>None</em></MuiMenuItem>
            {stockSurveys.map(survey => (
              <MuiMenuItem key={survey.id} value={survey.id}>{survey.title}</MuiMenuItem>
            ))}
          </MuiSelect>
        </MuiBox>
        <MuiBox>
          <SurveyTitleField
            value={localSurveyTitle}
            onChange={handleSurveyTitleChange}
          />
          <SurveyDescriptionField
            value={localSurveyDescription}
            onChange={handleSurveyDescriptionChange}
          />
          <SurveyPageTitleField
            value={localSurveyPageTitle}
            onChange={handleSurveyPageTitleChange}
          />
          <SurveyPageDescriptionField
            value={localSurveyPageDescription}
            onChange={handleSurveyPageDescriptionChange}
          />
          <SurveyPageNavigation
            currentPageIndex={currentPageIndex}
            surveyPages={surveyPages}
            onPrev={handlePrevPage}
            onNext={handleNextPage}
            onSelectPage={handleSurveyPageSelection}  // Correctly passing the function
            onAddNewPage={handleAddNewPage}
          />
        </MuiBox>
      </MuiGrid>
      <MuiGrid item xs={12} md={8}>
        <MuiBox sx={{ marginLeft: { xs: 0, md: 4 } }}>
          <QuestionList questions={surveyQuestions} onDelete={handleDeleteQuestion} />
          <MuiButton variant="contained" color="primary" sx={{ marginTop: 0.1 }} onClick={openAddQuestionModal}>
            Add Question
          </MuiButton>
          <MuiBox sx={{ marginTop: 20, lg: 12 }}>
            <MuiButton
              variant="contained"
              color="success"
              onClick={openPublishModal}
              fullWidth
              sx={{ backgroundColor: '252525', '&:hover': { backgroundColor: 'darkorange' } }}
            >
              Publish
            </MuiButton>
          </MuiBox>
        </MuiBox>
        <AddQuestionModal
          isOpen={isAddQuestionModalOpen}
          onClose={closeAddQuestionModal}
          onSubmit={handleAddQuestionSubmit}
          surveyPages={surveyPages}
          currentSurveyPageId={surveyPages[currentPageIndex]?.id}
          onAddNewPage={handleAddNewPage}
        />
        <ConfirmPublishModal
          open={isPublishModalOpen}
          onClose={closePublishModal}
          onConfirm={() => {
            handlePublishSurvey();
            closePublishModal();
          }}
        />
      </MuiGrid>
    </MuiGrid>
  );
};

export default SurveyPage;
