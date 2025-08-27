import React, {
 useState,
 useEffect,
 useCallback,
 useRef,
 useMemo,
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
 Snackbar,
 Alert,
 Chip,
} from '@mui/material';
import { Button } from '@/shared/components/Button';
import LaunchIcon from '@mui/icons-material/Link';
import { Delete, Category as CategoryIcon } from '@mui/icons-material'; // 2. IMPORT AN ICON (OPTIONAL)
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
 updateSurveyTitleAction,
 updateSurveyDescriptionAction,
 updateSurveyPageTitleAction,
 updateSurveyPageDescriptionAction,
 addSurveyPageAction,
 deleteSurveyPageAction,
 deleteSurveyQuestionAction,
 fetchAllSurveyQuestionsWithChoices,
 fetchSurveyAction,
 createSurveyQuestionAction,
 previewSurveyAction,
 publishSurveyAction,
 updateSurveyLayoutAction,
 updateSurveyThemeAction,
 fetchSurveyThemesAction,
 deleteSurveyAction,
 reorderQuestionsAction,
} from '@/redux/actions/surveyActions';

import ConfirmDeleteModal from '../../UI/Modals/components/ConfirmDeleteModal'; // Adjust path if needed
import SurveyTitleField from './SurveyTitleField';
import SurveyDescriptionField from './SurveyDescriptionField';
import SurveyPageTitleField from './SurveyPageTitleField';
import SurveyPageDescriptionField from './SurveyPageDescriptionField';
import SurveyPageNavigation from './SurveyPageNavigation';
import ConfirmPublishModal from './ConfirmPublishModal';
import AddQuestionModal from './AddQuestionModal';
import QuestionList from './QuestionList';
import ThemeEnhancementModal from './ThemeEnhancementModal';

const SurveyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { surveyId, surveyPageId } = useParams();

  const { user } = useSelector(state => state.auth);

  const [isDeletePageModalOpen, setDeletePageModalOpen] = useState(false);

 const surveyData = useSelector(state => state.survey.survey);
 const surveyTitle = surveyData?.title || '';
 const surveyDescription = surveyData?.description || '';
 const surveyQuestions = useSelector(state => state.survey.questions);
 const surveyThemes = useSelector(state => state.survey.surveyThemes);
 const surveyCategoryTitle = surveyData?.survey_category?.title;


 const [surveyPages, setSurveyPages] = useState(surveyData?.survey_pages || []);
//  const [currentPageQuestions, setCurrentPageQuestions] = useState([]);
 const allSurveyQuestions = useSelector(state => state.survey.questions); 

//  const [refreshKey, setRefreshKey] = useState(0);

 const [localSurveyTitle, setLocalSurveyTitle] = useState(surveyTitle);
 const [localSurveyDescription, setLocalSurveyDescription] = useState(surveyDescription);
 const [localSurveyPageTitle, setLocalSurveyPageTitle] = useState('');
 const [localSurveyPageDescription, setLocalSurveyPageDescription] = useState('');
 const [layout, setLayout] = useState('multiple');
 const [theme, setTheme] = useState(''); 
 const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] = useState(false);
 const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
 const [isThemeEnhancementModalOpen, setIsThemeEnhancementModalOpen] = useState(false);
 const [currentPageIndex, setCurrentPageIndex] = useState(0);
 const currentPageIndexRef = useRef(currentPageIndex);
  const isPublished = surveyData?.survey_status_id === 2;

  const [notification, setNotification] = useState({
   open: false,
   message: '',
   severity: 'success',
  });

 const currentPageQuestions = useMemo(() => {
    if (!surveyPageId || !allSurveyQuestions) return [];
    return allSurveyQuestions.filter(q => q.survey_page_id === surveyPageId);
  }, [allSurveyQuestions, surveyPageId]);
  
  const handleOnDragEnd = async (result) => {
    if (!result.destination) return;

    const items = Array.from(currentPageQuestions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    if (surveyPageId) {
      try {
        await dispatch(reorderQuestionsAction(surveyPageId, items));
        setNotification({
          open: true,
          message: 'Question order updated!',
          severity: 'success',
        });
      } catch (error) {
        console.error('Failed to reorder questions:', error);
        setNotification({
          open: true,
          message: 'Failed to update order.',
          severity: 'error',
        });
      }
    } else {
      console.error('Cannot reorder questions: surveyPageId is missing.');
    }
  };

 


 useEffect(() => {
    // 1. Fetch all necessary data
    dispatch(fetchSurveyThemesAction());
    if (surveyId) {
      dispatch(fetchSurveyAction(surveyId));
      if (surveyPageId) {
        dispatch(fetchAllSurveyQuestionsWithChoices(surveyId));
      }
    }
  }, [surveyId, surveyPageId, dispatch]);

  useEffect(() => {
    if (surveyData) {
      // 1. Set all non-theme state from the survey data.
      setLocalSurveyTitle(surveyData.title || '');
      setLocalSurveyDescription(surveyData.description || '');
      setSurveyPages(surveyData.survey_pages || []);
      setLayout(surveyData.layout || 'multiple');
 
      if (surveyData.theme_id && surveyThemes.length > 0) {
        const themeExists = surveyThemes.some(t => t.id === surveyData.theme_id);

        if (themeExists) {
          setTheme(surveyData.theme_id);
        }
      }
    }
  }, [surveyData, surveyThemes]);

  useEffect(() => {
    if (surveyPages.length > 0 && surveyPageId) {
      const pageIndex = surveyPages.findIndex(page => page.id === surveyPageId);
      if (pageIndex !== -1) {
        setCurrentPageIndex(pageIndex);
        currentPageIndexRef.current = pageIndex;
        const currentPage = surveyPages[pageIndex];
        if (currentPage) {
          setLocalSurveyPageTitle(currentPage.title || '');
          setLocalSurveyPageDescription(currentPage.description || '');
        }
      }
    }
  }, [surveyPages, surveyPageId]);

  // useEffect(() => {
  //   // 5. Filter questions when they change or the page changes
  //   if (surveyPageId) {
  //     const filteredQuestions = surveyQuestions.filter(
  //       question => question.survey_page_id === surveyPageId,
  //     );
  //     setCurrentPageQuestions(filteredQuestions);
  //   }
  // }, [surveyQuestions, surveyPageId, refreshKey]);

  useEffect(() => {
    // 6. Redirect if user is not logged in
    if (!user?.id) {
      navigate('/login');
    }
  }, [user, navigate]);

const debouncedUpdateSurveyTitle = useCallback(
    debounce(async (newSurveyTitle) => {
      if (newSurveyTitle.trim()) {
        try {
          await dispatch(updateSurveyTitleAction(surveyId, newSurveyTitle));
          setNotification({
            open: true,
            message: 'Survey title updated!',
            severity: 'success',
          });
        } catch (error) {
          console.error('Failed to update survey title:', error);
          setNotification({
            open: true,
            message: 'Failed to update title.',
            severity: 'error',
          });
        }
      }
    }, 1500),
    [dispatch, surveyId],
  );

  const debouncedUpdateSurveyDescription = useCallback(
    debounce(async (newSurveyDescription) => {
      if (newSurveyDescription.trim()) {
        try {
          await dispatch(updateSurveyDescriptionAction(surveyId, newSurveyDescription));
          setNotification({
            open: true,
            message: 'Survey description updated!',
            severity: 'success',
          });
        } catch (error) {
          console.error('Failed to update survey description:', error);
           setNotification({
            open: true,
            message: 'Failed to update description.',
            severity: 'error',
          });
        }
      }
    }, 1500),
    [dispatch, surveyId],
  );

  const debouncedUpdateSurveyPageTitle = useCallback(
    debounce(async (newSurveyPageTitle) => {
      if (newSurveyPageTitle.trim()) {
        try {
          await dispatch(updateSurveyPageTitleAction(surveyPageId, newSurveyPageTitle));
          setNotification({
            open: true,
            message: 'Page title updated!',
            severity: 'success',
          });
        } catch (error) {
          console.error('Failed to update page title:', error);
          setNotification({
            open: true,
            message: 'Failed to update page title.',
            severity: 'error',
          });
        }
      }
    }, 1500),
    [dispatch, surveyPageId],
  );

  const debouncedUpdateSurveyPageDescription = useCallback(
    debounce(async (newSurveyPageDescription) => {
      if (newSurveyPageDescription.trim()) {
        try {
          await dispatch(updateSurveyPageDescriptionAction(surveyPageId, newSurveyPageDescription));
          setNotification({
            open: true,
            message: 'Page description updated!',
            severity: 'success',
          });
        } catch (error) {
          console.error('Failed to update page description:', error);
          setNotification({
            open: true,
            message: 'Failed to update page description.',
            severity: 'error',
          });
        }
      }
    }, 1500),
    [dispatch, surveyPageId],
  );

  const openDeletePageModal = () => {
    if (surveyPages.length === 1) {
      alert('Cannot delete the last survey page.');
      return;
    }
    setDeletePageModalOpen(true);
  };

  const handleConfirmDeletePage = async () => {
    // First, determine what the list of pages will be after deletion.
    const remainingPages = surveyPages.filter(p => p.id !== surveyPageId);

    setDeletePageModalOpen(false); // Close the modal immediately

    try {
      // Dispatch the action to delete the page AND re-fetch the survey data
      await dispatch(deleteSurveyPageAction(surveyId, surveyPageId));

      // After the action is complete, navigate to the new last page
      if (remainingPages.length > 0) {
        const lastPage = remainingPages.reduce(
          (maxPage, currentPage) => (currentPage.sort_index > maxPage.sort_index ? currentPage : maxPage),
          remainingPages[0],
        );
        navigate(`/surveys/${surveyId}/pages/${lastPage.id}`);
      } else {
        // Fallback if no pages are left
        navigate('/surveys');
      }
    } catch (error) {
      console.error('Error deleting page:', error);
      setNotification({
        open: true,
        message: 'Failed to delete page.',
        severity: 'error',
      });
    }
  };

const handleDeleteSurvey = async () => {
    const confirmation = window.confirm(
      'Are you sure you want to permanently delete this entire survey?',
    );
    if (confirmation) {
      try {
        await dispatch(deleteSurveyAction(surveyId));
        navigate('/surveys'); // Navigate away after deletion
      } catch (error) {
        console.error('Failed to delete survey:', error);
        setNotification({
          open: true,
          message: 'Failed to delete survey.',
          severity: 'error',
        });
      }
    }
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
   setNotification({
    open: true,
    message: 'Layout updated successfully!',
    severity: 'success',
   });
  } catch (error) {
   console.error('Failed to update layout:', error);
   setNotification({
    open: true,
    message: 'Failed to update layout.',
    severity: 'error',
   });
  }
 };
 
 const handleThemeChange = async (e) => {
  const newTheme = e.target.value;
  setTheme(newTheme);
  try {
   await dispatch(updateSurveyThemeAction(surveyId, newTheme, user.id));
   setNotification({
    open: true,
    message: 'Theme updated successfully!',
    severity: 'success',
   });
  } catch (error) {
   console.error('Failed to update theme:', error);
   setNotification({
    open: true,
    message: 'Failed to update theme.',
    severity: 'error',
   });
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
  if (surveyPages.length === 1) {
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
  //  setRefreshKey(prev => prev + 1);
   closeAddQuestionModal();
  } catch (error) {
   console.error('Error adding question:', error);
  }
 };

 const handleDeleteQuestion = async (questionId) => {
  try {
   await dispatch(deleteSurveyQuestionAction(questionId));
   await dispatch(fetchAllSurveyQuestionsWithChoices(surveyId));
  //  setRefreshKey(prev => prev + 1);
  } catch (error) {
   console.error('Error deleting question:', error);
  }
 };

 const handlePreviewSurvey = async () => {
  if (!localSurveyTitle.trim()) {
    console.error('Title is required');
    return;
  }
  try {
    await dispatch(previewSurveyAction(surveyId));
    navigate(`/surveys/${surveyId}/preview`);
  } catch (error) {
    console.error('Error previewing survey:', error);
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
 
 const handleCloseNotification = (event, reason) => {
  if (reason === 'clickaway') {
   return;
  }
  setNotification(prev => ({ ...prev, open: false }));
 };

  const handleOpenThemeEnhancement = () => {
    setIsThemeEnhancementModalOpen(true);
  };

  const handleCloseThemeEnhancement = () => {
    setIsThemeEnhancementModalOpen(false);
  };

  return (
    <>
      {surveyCategoryTitle && (
      <Chip
        icon={<CategoryIcon />}
        label={surveyCategoryTitle}
        variant="filled"
        size="medium"
        sx={{ mb: 4, color: 'text.secondary' }}
      />
      )}

      <MuiBox sx={{ mb: 1 }}>
        <MuiTypography variant="h5" component="h2" sx={{ fontWeight: 300 }}>
          {localSurveyTitle || 'Survey Title'}
        </MuiTypography>
      </MuiBox>
      <MuiBox sx={{ mb: 4 }}>
        <MuiTypography variant="body2" component="body2" sx={{ fontWeight: 300, color: 'text.secondary' }}>
          {localSurveyDescription || 'Survey Description'}
        </MuiTypography>
      </MuiBox>

      <MuiGrid container spacing={4}>
        <MuiGrid item xs={12} md={4}>
          {/* Left panel */}
          {/* START OF FIX */}
          <MuiBox>
            <MuiBox sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 2,
              mb: 2,
            }}
            >
              <SurveyTitleField
                value={localSurveyTitle}
                onChange={handleSurveyTitleChange}
                disabled={isPublished}
              />
              <SurveyDescriptionField
                value={localSurveyDescription}
                onChange={handleSurveyDescriptionChange}
                disabled={isPublished}
              />
              <SurveyPageTitleField
                value={localSurveyPageTitle}
                onChange={handleSurveyPageTitleChange}
                disabled={isPublished}
              />
              <SurveyPageDescriptionField
                value={localSurveyPageDescription}
                onChange={handleSurveyPageDescriptionChange}
                disabled={isPublished}
              />
            </MuiBox>
            <SurveyPageNavigation
              currentPageIndex={currentPageIndex}
              surveyPages={surveyPages}
              onPrev={handlePrevPage}
              onNext={handleNextPage}
              onSelectPage={handleSurveyPageSelection}
              onAddNewPage={handleAddNewPage}
              disabled={isPublished} 
            />
            <Tooltip title={surveyPages.length === 1 ? 'Cannot delete the last page' : 'Delete this page'}>
              <span>
                <MuiIconButton
                  color="secondary"
                  onClick={openDeletePageModal}
                  disabled={surveyPages.length === 1 || isPublished}
                >
                  <Delete />
                </MuiIconButton>
              </span>
            </Tooltip>
          </MuiBox>
          
          <MuiBox sx={{ pt: 4 }}>
            <MuiTypography variant="body2" sx={{ fontWeight: 300, mb: 1 }}>
              Select Layout
            </MuiTypography>
            <MuiSelect
              fullWidth
              value={layout}
              onChange={handleLayoutChange}
              disabled={isPublished}
            >
              <MuiMenuItem value="single">Single</MuiMenuItem>
              <MuiMenuItem value="multiple">Multiple</MuiMenuItem>
            </MuiSelect>
          </MuiBox>

          <MuiBox sx={{ pt: 2 }}>
            <MuiTypography variant="body2" sx={{ fontWeight: 300, mb: 1 }}>
              Select Theme
            </MuiTypography>
            <MuiSelect
              fullWidth
              value={theme}
              onChange={handleThemeChange}
              disabled={isPublished}
            >
              {Array.isArray(surveyThemes) && surveyThemes.map(themeOption => (
                <MuiMenuItem key={themeOption.id} value={themeOption.id}>
                  {themeOption.title}
                </MuiMenuItem>
              ))}
            </MuiSelect>
          </MuiBox>
          <MuiBox sx={{ pt: 2 }}>
            <MuiBox
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                columnGap: 2,
                rowGap: 2,
                alignItems: 'start',
                width: '100%',
              }}
            >
              {/* Left column: Customize + Preview */}
              <MuiBox
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  alignItems: 'flex-start',
                  flex: 1,
                }}
              >
                <Button
                  variant="outlined-primary"
                  size="large"
                  onClick={handleOpenThemeEnhancement}
                >
                  Customize Theme
                </Button>

                <Button
                  variant="primary"
                  size="large"
                  onClick={handlePreviewSurvey}
                >
                  Preview
                </Button>
              </MuiBox>

              {/* Right column: Publish + Delete (right aligned on wider screens) */}
              <MuiBox
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  alignItems: { xs: 'stretch', sm: 'flex-end' },
                  width: '100%',
                  // Override shared Button default right margin so both buttons flush-align right
                  '& .btn': {
                    marginRight: '0 !important',
                    marginLeft: '0 !important',
                  },
                }}
              >
                {!isPublished && (
                  <Button
                    variant="success"
                    onClick={openPublishModal}
                    // Let the container control alignment; avoid forcing width here
                    style={{ marginLeft: 'auto', marginRight: 0 }}
                  >
                    Publish
                  </Button>
                )}

                {!isPublished && (
                  <Button
                    variant="outline-danger"
                    squared
                    onClick={handleDeleteSurvey}
                    // Let the container control alignment; ensure flush-right
                    style={{ marginLeft: 'auto', marginRight: 0 }}
                  >
                    Delete Survey
                  </Button>
                )}
              </MuiBox>
            </MuiBox>

            {/* Public link when published */}
            {isPublished && surveyData.public_link && (
              <MuiLink
                href={`${window.location.origin}/surveys/ps/${surveyData.public_link}`}
                target="_blank"
                rel="noopener"
                underline="always"
                // Add a Tooltip to show the full URL on hover
                title={`${window.location.origin}/surveys/ps/${surveyData.public_link}`}
                sx={{
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  fontSize: '0.875rem',
                  color: 'primary.main',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '100%',
                  mt: 1.5,
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                <LaunchIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />
                {`${window.location.origin}/surveys/ps/${surveyData.public_link}`}
              </MuiLink>
            )}
          </MuiBox>
        </MuiGrid>
        
        {/* Right panel */}
        <MuiGrid item xs={12} md={8}>
          <MuiBox sx={{ marginLeft: { xs: 0, md: 4 } }}>
            <QuestionList
              questions={currentPageQuestions} 
              onDelete={handleDeleteQuestion} 
              onDragEnd={handleOnDragEnd}
              onResponseChange={() => {}}
            />
            {!isPublished && (
              <Button
                variant="outlined-primary"
                color="primary"
                sx={{ marginTop: 2 }}
                onClick={openAddQuestionModal}
              >
                Add Question
              </Button>
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
          <ConfirmDeleteModal
            open={isDeletePageModalOpen}
            onClose={() => setDeletePageModalOpen(false)}
            onConfirm={handleConfirmDeletePage}
            title="Delete Survey Page"
            message="Are you sure you want to delete this page? 
            This action will also delete all associated questions and cannot be undone."
          />
          <ConfirmPublishModal
            open={isPublishModalOpen}
            onClose={closePublishModal}
            onConfirm={() => {
              handlePublishSurvey();
              closePublishModal();
            }}
          />
          <ThemeEnhancementModal
            open={isThemeEnhancementModalOpen}
            onClose={handleCloseThemeEnhancement}
            survey={surveyData}
            theme={surveyData?.theme}
          />
        </MuiGrid>
        <Snackbar
          open={notification.open}
          autoHideDuration={6000}
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
            {notification.message}
          </Alert>
        </Snackbar>
      </MuiGrid>
    </>
  );
};

export default SurveyPage;
