import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';
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
  fetchSurveyPagesAction,
  fetchStockSurveysAction,
  deleteSurveyQuestionAction,
  createSurveyQuestionAction,
} from '@/redux/actions/surveyActions';
import QuestionList from './QuestionList';
import AddQuestionModal from './AddQuestionModal';

const SurveyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { surveyId, surveyPageId } = useParams();

  const { user } = useSelector(state => state.auth);
  const surveyPages = useSelector(state => state.survey.surveyPages);
  const surveyQuestions = useSelector(state => state.survey.questions);
  const stockSurveys = useSelector(state => state.survey.stockSurveys || []);

  const surveyTitle = useSelector(state => state.survey.survey?.title);
  const surveyDescription = useSelector(state => state.survey.survey?.description);
  const surveyPageTitle = useSelector(state => state.survey.surveyPage?.title);
  const surveyPageDescription = useSelector(state => state.survey.surveyPage?.description);

  // Local state to manage the input field
  const [localSurveyTitle, setLocalSurveyTitle] = useState(surveyTitle || '');
  const [localSurveyDescription, setLocalSurveyDescription] = useState(surveyDescription || '');
  const [localSurveyPageTitle, setLocalSurveyPageTitle] = useState(surveyPageTitle || '');
  const [localSurveyPageDescription, setLocalSurveyPageDescription] = useState(surveyPageDescription || '');

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
      dispatch(fetchSurveyPagesAction(surveyId)); // Ensure survey pages are fetched
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

      // Update the local state with the current page's title and description
      const currentPage = surveyPages[currentPageIndex];
      if (currentPage) {
        setLocalSurveyPageTitle(currentPage.title || '');
        setLocalSurveyPageDescription(currentPage.description || '');
      }
    }
  }, [surveyPages, surveyPageId]);

  useEffect(() => {
    setLocalSurveyTitle(surveyTitle || '');
  }, [surveyTitle]);

  useEffect(() => {
    setLocalSurveyDescription(surveyDescription || '');
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
    [dispatch, surveyId, surveyPageId]
  );

  const debouncedUpdateSurveyPageDescription = useCallback(
    debounce((newSurveyPageDescription) => {
      if (newSurveyPageDescription.trim()) {
        dispatch(updateSurveyPageDescriptionAction(surveyPageId, newSurveyPageDescription));
      }
    }, 1500),
    [dispatch, surveyId, surveyPageId]
  );

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

      // Update the state to reflect the new page
      setCurrentPageIndex(surveyPages.length); // Index of the new page
      setLocalSurveyPageTitle(''); // Reset the title
      setLocalSurveyPageDescription(''); // Reset the description

      // Navigate to the new page's URL
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
      setCurrentPageIndex(currentPageIndex + 1);
      const nextPageId = surveyPages[currentPageIndex + 1].id;
      navigate(`/surveys/${surveyId}/pages/${nextPageId}`);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
      const prevPageId = surveyPages[currentPageIndex - 1].id;
      navigate(`/surveys/${surveyId}/pages/${prevPageId}`);
    }
  };

  const handleSurveyPageSelection = (e) => {
    const selectedPageId = e.target.value;
    navigate(`/surveys/${surveyId}/pages/${selectedPageId}`);
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

  return (
    <MuiGrid container spacing={4}>
      <MuiGrid item xs={12} md={4}>
        <MuiBox sx={{ paddingBottom: 4 }}>
          <MuiTypography variant="h6" sx={{ fontWeight: 300 }}>Select Stock Survey</MuiTypography>
          <MuiSelect fullWidth value={surveyId} onChange={handleSurveyPageSelection}>
            <MuiMenuItem value=""><em>None</em></MuiMenuItem>
            {surveyPages.map(page => (
              <MuiMenuItem key={page.id} value={page.id}>{page.title || 'No page title yet'}</MuiMenuItem>
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
            value={localSurveyTitle}
            onChange={handleSurveyTitleChange}
          />
          <MuiTextField
            fullWidth
            label="Survey Description"
            variant="outlined"
            margin="normal"
            multiline
            rows={6}
            value={localSurveyDescription}
            onChange={handleSurveyDescriptionChange}
            sx={{ paddingBottom: 3, fontWeight: 300 }}
          />
          <MuiTypography variant="h5" sx={{ paddingBottom: 1.5, fontWeight: 300 }}>
            Survey Page title: {localSurveyPageTitle || 'No page selected'}
          </MuiTypography>
          <MuiTextField
            fullWidth
            label="Page Title"
            variant="outlined"
            margin="normal"
            value={localSurveyPageTitle || ''}
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
            value={localSurveyPageDescription || ''}
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
            <MuiSelect
              value={surveyPageId || ''}
              onChange={handleSurveyPageSelection}
              displayEmpty
              sx={{ width: '50%' }}
            >
              <MuiMenuItem value=""><em>Select Page</em></MuiMenuItem>
              {surveyPages.map(page => (
                <MuiMenuItem key={page.id} value={page.id}>
                  {page.title || 'No page title yet'}
                </MuiMenuItem>
              ))}
            </MuiSelect>
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

export default SurveyPage;
