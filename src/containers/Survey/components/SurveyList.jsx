import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip,
  IconButton,
  Stack,
  Link as MuiLink,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSurveyThemesAction,
  fetchSurveysAction,
  deleteSurveyAction, // 1. IMPORT THE DELETE ACTION
} from '@/redux/actions/surveyActions';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';

const SurveyList = () => {
  const dispatch = useDispatch();
  const surveys = useSelector(state => state.survey.surveys);
  const themes = useSelector(state => state.survey.surveyThemes);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSurveyId, setSelectedSurveyId] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  useEffect(() => {
    dispatch(fetchSurveyThemesAction());
    dispatch(fetchSurveysAction());
  }, [dispatch]);

  const handleMenuClick = (event, surveyId) => {
    setAnchorEl(event.currentTarget);
    setSelectedSurveyId(surveyId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedSurveyId(null);
  };

  // 2. EXTRACT AND ADAPT THE DELETE LOGIC
  const handleDelete = async () => {
    if (!selectedSurveyId) return;

    const confirmation = window.confirm(
      'Are you sure you want to permanently delete this entire survey?',
    );

    if (confirmation) {
      try {
        // Dispatch the same action used in SurveyPage
        await dispatch(deleteSurveyAction(selectedSurveyId));
        // After deletion, the fetchSurveysAction will be re-run by a parent component
        // or a useEffect hook to update the list automatically.
      } catch (error) {
        console.error('Failed to delete survey:', error);
        // You could add a snackbar notification here for errors
      }
    }
    
    // Close the menu regardless of the outcome
    handleMenuClose();
  };


  const getThemeTitle = (themeId) => {
    const found = themes.find(t => t.id === themeId);
    return found ? found.title : '-';
  };

  const getFirstSurveyPageId = survey => (survey.survey_pages?.length > 0 ? survey.survey_pages[0].id : '');

  return (
    <>
      <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
            Surveys
          </Typography>
          <Button
            component={RouterLink}
            to="/survey-design"
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ textTransform: 'none', borderRadius: '8px', fontWeight: 'bold' }}
          >
            Create Survey
          </Button>
        </Stack>

        {surveys.length === 0 ? (
          <Box textAlign="center" mt={8}>
            <Typography variant="h6" gutterBottom>
              No surveys yet.
            </Typography>
            <MuiLink
              component={RouterLink}
              to="/survey-design"
              sx={{ textDecoration: 'none' }}
            >
              <Button variant="outlined" sx={{ mt: 2 }}>
                Create your first survey
              </Button>
            </MuiLink>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {surveys.map((survey) => {
              const isPublished = survey.survey_status_id === 2;
              const firstPageId = getFirstSurveyPageId(survey);
              const categoryTitle = survey.survey_category?.title;

              return (
                <Grid item xs={12} sm={6} md={4} key={survey.id}>
                  <Card
                    sx={{
                      backgroundColor: 'action.hover',
                      color: 'text.primary',
                      borderRadius: '12px',
                      border: '1px solid',
                      borderColor: 'divider',
                      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: theme => `0 8px 16px ${theme.palette.mode === 'dark' 
                        ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'}`,
                      },
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      height: '100%',
                    }}
                  >
                    <CardContent>
                      {categoryTitle && (
                        <Chip
                          icon={<CategoryOutlinedIcon />}
                          label={categoryTitle}
                          variant="outlined"
                          size="small"
                          sx={{ mb: 1.5, color: 'text.secondary', borderColor: 'divider' }}
                        />
                      )}
                      <Typography
                        variant="h4"
                        component="div"
                        gutterBottom
                        sx={{ fontWeight: 'bold', fontSize: '1.75rem' }}
                      >
                        {survey.title}
                      </Typography>
                      <Stack direction="row" spacing={2} sx={{ color: 'text.secondary', mb: 2 }}>
                        <Typography variant="body2">
                          Theme: {getThemeTitle(survey.theme_id)}
                        </Typography>
                        <Typography variant="body2">
                          Pages: {survey.survey_pages?.length ?? 0}
                        </Typography>
                      </Stack>
                      {isPublished && (
                        <Chip
                          label="Published"
                          size="small"
                          color="success"
                        />
                      )}
                    </CardContent>
                    <CardActions sx={{ backgroundColor: 'action.focus' }}>
                      <Stack direction="row" spacing={1} sx={{ width: '100%', justifyContent: 'flex-end' }}>
                        <Button
                          size="small"
                          startIcon={<EditOutlinedIcon />}
                          component={RouterLink}
                          to={`/surveys/${survey.id}/pages/${firstPageId}`}
                          sx={{ color: 'text.primary' }}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          startIcon={<VisibilityOutlinedIcon />}
                          component={RouterLink}
                          to={`/surveys/${survey.id}/preview`}
                          sx={{ color: 'text.primary' }}
                        >
                          Preview
                        </Button>
                        <IconButton
                          size="small"
                          onClick={e => handleMenuClick(e, survey.id)}
                          sx={{ color: 'text.secondary' }}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </Stack>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 3,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* 3. The MenuItem now calls the updated handleDelete function */}
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <DeleteOutlineIcon fontSize="small" color="error" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

export default SurveyList;
