import React, {
  useState, 
  useEffect, 
  useCallback, 
  useRef, 
} from 'react';
import debounce from 'lodash/debounce';
import {
  Box as MuiBox,
  Typography as MuiTypography,
  Select as MuiSelect,
  MenuItem as MuiMenuItem,
  Button as MuiButton,
  Grid as MuiGrid,
  IconButton as MuiIconButton,
  Tooltip,
  Link as MuiLink,
} from '@mui/material';
import LaunchIcon from '@mui/icons-material/Link';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Delete } from '@mui/icons-material';

import {
  updateSurveyTitleAction,
  updateSurveyDescriptionAction,
  updateSurveyPageTitleAction,
  updateSurveyPageDescriptionAction,
  addSurveyPageAction,
  deleteSurveyPageAction,
  deleteSurveyQuestionAction,
  fetchAllSurveyQuestionsWithChoices,
  fetchStockSurveysAction,
  fetchSurveyAction,
  createSurveyQuestionAction,
  publishSurveyAction,
  updateSurveyLayoutAction,
} from '@/redux/actions/surveyActions';

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

  const surveyData = useSelector(state => state.survey.survey);
  const surveyTitle = surveyData?.title || '';
  const surveyDescription = surveyData?.description || '';
  const surveyQuestions = useSelector(state => state.survey.questions);
  const stockSurveys = useSelector(state => state.survey.stockSurveys || []);

  const [surveyPages, setSurveyPages] = useState(surveyData?.survey_pages || []);
  const [currentPageQuestions, setCurrentPageQuestions] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0); // key to force re-render

  const [localSurveyTitle, setLocalSurveyTitle] = useState(surveyTitle);
  const [localSurveyDescription, setLocalSurveyDescription] = useState(surveyDescription);
  const [localSurveyPageTitle, setLocalSurveyPageTitle] = useState('');
  const [localSurveyPageDescription, setLocalSurveyPageDescription] = useState('');
  const [layout, setLayout] = useState('multiple');
  const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const currentPageIndexRef = useRef(currentPageIndex);
  const [selectedStockSurvey, setSelectedStockSurvey] = useState('');
  const isPublished = Boolean(surveyData?.public_link);

  useEffect(() => {
    if (!user?.id) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (surveyId) {
      dispatch(fetchSurveyAction(surveyId));
      dispatch(fetchStockSurveysAction());
      if (surveyPageId) {
        dispatch(fetchAllSurveyQuestionsWithChoices(surveyId));
      }
    }
  }, [surveyId, surveyPageId, dispatch]);

  useEffect(() => {
    if (surveyData?.survey_pages) {
      setSurveyPages(surveyData.survey_pages);
    }
    if (surveyData?.layout) {
      setLayout(surveyData.layout);
    }
  }, [surveyData?.survey_pages, surveyData?.layout]);

  useEffect(() => {
    if (surveyPageId) {
      const filteredQuestions = surveyQuestions.filter(
        question => question.survey_page_id === surveyPageId,
      );
      setCurrentPageQuestions(filteredQuestions);
    }
  }, [surveyQuestions, surveyPageId, refreshKey]); // added refreshKey

  useEffect(() => {
    if (surveyPages.length > 0 && surveyPageId) {
      const pageIndex = surveyPages.findIndex(page => page.id === surveyPageId);
      setCurrentPageIndex(pageIndex);
      currentPageIndexRef.current = pageIndex;

      const currentPage = surveyPages[pageIndex];
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

  const debouncedUpdateSurveyTitle = useCallback(
    debounce((newSurveyTitle) => {
      if (newSurveyTitle.trim()) {
        dispatch(updateSurveyTitleAction(surveyId, newSurveyTitle));
      }
    }, 1500),
    [dispatch, surveyId],
  );

  const debouncedUpdateSurveyDescription = useCallback(
    debounce((newSurveyDescription) => {
      if (newSurveyDescription.trim()) {
        dispatch(updateSurveyDescriptionAction(surveyId, newSurveyDescription));
      }
    }, 1500),
    [dispatch, surveyId],
  );

  const debouncedUpdateSurveyPageTitle = useCallback(
    debounce((newSurveyPageTitle) => {
      if (newSurveyPageTitle.trim()) {
        dispatch(updateSurveyPageTitleAction(surveyPageId, newSurveyPageTitle));
      }
    }, 1500),
    [dispatch, surveyPageId],
  );

  const debouncedUpdateSurveyPageDescription = useCallback(
    debounce((newSurveyPageDescription) => {
      if (newSurveyPageDescription.trim()) {
        dispatch(updateSurveyPageDescriptionAction(surveyPageId, newSurveyPageDescription));
      }
    }, 1500),
    [dispatch, surveyPageId],
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

  const handleLayoutChange = async (e) => {
    const newLayout = e.target.value;
    const userId = user?.id;
    setLayout(newLayout);
    try {
      await dispatch(updateSurveyLayoutAction(surveyId, newLayout, userId));
    } catch (error) {
      console.error('Failed to update layout:', error);
    }
  };

  const handleAddNewPage = async () => {
    try {
      const newPageData = {
        title: '',
        description: '',
        survey_id: surveyId,
      };
      const newPage = await dispatch(addSurveyPageAction(surveyId, newPageData));

      const updatedSurveyPages = [...surveyPages, newPage];
      setSurveyPages(updatedSurveyPages);

      setCurrentPageIndex(updatedSurveyPages.length - 1);
      currentPageIndexRef.current = updatedSurveyPages.length - 1;
      setLocalSurveyPageTitle('');
      setLocalSurveyPageDescription('');
      navigate(`/surveys/${surveyId}/pages/${newPage.id}`);
    } catch (error) {
      console.error('Error adding new page:', error);
    }
  };

  const handleNextPage = useCallback(() => {
    if (currentPageIndexRef.current < surveyPages.length - 1) {
      const nextPageId = surveyPages[currentPageIndexRef.current + 1]?.id;
      if (nextPageId) {
        setCurrentPageIndex(currentPageIndexRef.current + 1);
        currentPageIndexRef.current += 1;
        navigate(`/surveys/${surveyId}/pages/${nextPageId}`);
      }
    }
  }, [surveyPages, navigate, surveyId]);

  const handlePrevPage = useCallback(() => {
    if (currentPageIndexRef.current > 0) {
      const prevPageId = surveyPages[currentPageIndexRef.current - 1]?.id;
      if (prevPageId) {
        setCurrentPageIndex(currentPageIndexRef.current - 1);
        currentPageIndexRef.current -= 1;
        navigate(`/surveys/${surveyId}/pages/${prevPageId}`);
      }
    }
  }, [surveyPages, navigate, surveyId]);

  const handleSurveyPageSelection = useCallback(
    (selectedPageId) => {
      if (selectedPageId) {
        navigate(`/surveys/${surveyId}/pages/${selectedPageId}`);
      }
    },
    [navigate, surveyId],
  );

  const handleDeletePage = async () => {
    if (surveyPages.length === 0) {
      alert('Cannot delete the last survey page.');
      return;
    }

    const confirmation = window.confirm(
      'Deleting this page will also delete all associated questions. Are you sure you want to continue?',
    );
    if (confirmation) {
      try {
        await dispatch(deleteSurveyPageAction(surveyId, surveyPageId));
        const remainingPages = surveyPages.filter(page => page.id !== surveyPageId);
        if (remainingPages.length > 0) {
          const nextPageId = remainingPages.reduce(
            (minPage, page) => (page.sort_index < minPage.sort_index ? page : minPage),
            remainingPages[0],
          ).id;
          navigate(`/surveys/${surveyId}/pages/${nextPageId}`);
        }
      } catch (error) {
        console.error('Error deleting page:', error);
      }
    }
  };

  const openAddQuestionModal = () => setIsAddQuestionModalOpen(true);
  const closeAddQuestionModal = () => setIsAddQuestionModalOpen(false);

  const openPublishModal = () => setIsPublishModalOpen(true);
  const closePublishModal = () => setIsPublishModalOpen(false);

  const handleAddQuestionSubmit = async (questionData) => {
    try {
      await dispatch(createSurveyQuestionAction({ ...questionData, survey_page_id: surveyPageId }));
      await dispatch(fetchAllSurveyQuestionsWithChoices(surveyId));
      setRefreshKey(prev => prev + 1); // <-- Trigger re-render
      closeAddQuestionModal();
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      await dispatch(deleteSurveyQuestionAction(questionId));
      await dispatch(fetchAllSurveyQuestionsWithChoices(surveyId));
      setRefreshKey(prev => prev + 1); // <-- Trigger re-render
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  const handlePublishSurvey = async () => {
    try {
      if (!localSurveyTitle.trim()) {
        console.error('Title is required to create a public link.');
        return;
      }

      const publishResponse = await dispatch(publishSurveyAction(surveyId));
      const publicUrl = `/surveys/ps/${publishResponse.public_link}`;
      navigate(publicUrl);
    } catch (error) {
      console.error('Error publishing survey:', error);
    }
  };

  return (
    <MuiGrid container spacing={4}>
      <MuiGrid item xs={12} md={4}>
        <MuiBox
          sx={{
            paddingBottom: 4,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <MuiTypography variant="body2" sx={{ fontWeight: 300 }}>
            Select Stock Survey
          </MuiTypography>
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
            onSelectPage={handleSurveyPageSelection}
            onAddNewPage={handleAddNewPage}
          />
          <Tooltip title={surveyPages.length === 1 ? 'Cannot delete the last page' : 'Delete this page'}>
            <span>
              <MuiIconButton
                color="secondary"
                onClick={handleDeletePage}
                disabled={surveyPages.length === 1}
              >
                <Delete />
              </MuiIconButton>
            </span>
          </Tooltip>
        </MuiBox>
        <MuiBox
          sx={{
            paddingBottom: 4,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <MuiTypography variant="body2" sx={{ fontWeight: 300 }}>
            Select Layout
          </MuiTypography>
          <MuiSelect
            fullWidth
            value={layout}
            onChange={handleLayoutChange}
          >
            <MuiMenuItem value="single">Single</MuiMenuItem>
            <MuiMenuItem value="multiple">Multiple</MuiMenuItem>
          </MuiSelect>
        </MuiBox>
      </MuiGrid>
      <MuiGrid item xs={12} md={8}>
        <MuiBox sx={{ marginBottom: 4, marginLeft: { xs: 0, md: 4 } }}>
          <MuiTypography fontWeight="300" variant="h3" align="left">
            {localSurveyTitle || 'Survey Title'}
          </MuiTypography>
          <MuiTypography
            fontWeight="300"
            variant="body1"
            align="justify"
            sx={{ whiteSpace: 'pre-line', mt: 1 }}
          >
            {localSurveyDescription || 'Survey Description'}
          </MuiTypography>
        </MuiBox>
        
        <MuiBox
          sx={{
            mt: 2,
            marginLeft: { xs: 0, md: 4 },
            marginBottom: {xs: 0, md: 4 },
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {!isPublished && (
            <Tooltip title="Publish this survey">
              <span>
                <MuiButton
                  variant="contained"
                  color="success"
                  size="small"
                  fullWidth
                  onClick={openPublishModal}
                  sx={{
                    backgroundColor: 'success.main',
                    py: 1,
                    '&:hover': { backgroundColor: 'success.dark' },
                    marginLeft: 'auto',
                  }}
                >
                  Publish
                </MuiButton>
              </span>
            </Tooltip>
          )}

          
          {isPublished && surveyData.public_link && (
            <MuiLink
              href={`${window.location.origin}/surveys/ps/${surveyData.public_link}`}
              target="_blank"
              rel="noopener"
              underline="always"
              sx={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '0.875rem',
                color: 'primary.main',
                wordBreak: 'break-all',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              <LaunchIcon fontSize="small" sx={{ mr: 0.5, color: 'text.primary' }} />
                {`${window.location.origin}/surveys/ps/${surveyData.public_link}`}
            </MuiLink>
          )}
        </MuiBox>

        <MuiBox sx={{ marginLeft: { xs: 0, md: 4 } }}>
          <QuestionList questions={currentPageQuestions} onDelete={handleDeleteQuestion} />
          {!isPublished && (
            <MuiButton 
              variant="contained"
              color="primary"
              sx={{ marginTop: 0.01 }}
              onClick={openAddQuestionModal}
            >
              Add Question
            </MuiButton>
           )}
          
        </MuiBox>
        <AddQuestionModal
          isOpen={isAddQuestionModalOpen}
          onClose={closeAddQuestionModal}
          onSubmit={handleAddQuestionSubmit}
          surveyPages={surveyPages}
          currentSurveyPageId={surveyPages[currentPageIndex]?.id}
          onAddNewPage={handleAddNewPage}
          surveyId={surveyId}
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
