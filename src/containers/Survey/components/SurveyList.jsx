import React, { useEffect, useState, useMemo } from 'react';
import Loading from '@/shared/components/Loading';
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
  Select, 
  FormControl, 
  InputLabel,
} from '@mui/material';
import PageHeader from '@/shared/components/PageHeader';
import LinkIcon from '@mui/icons-material/Link';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSurveyThemesAction,
  fetchSurveysAction,
  deleteSurveyAction,
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
  const loading = useSelector(state => state.survey.loading);
  
  const [sortBy, setSortBy] = useState(
    () => localStorage.getItem('surveySortBy') || 'newest',
  );
  
  useEffect(() => {
    localStorage.setItem('surveySortBy', sortBy);
  }, [sortBy]);

  const themes = useSelector(state => state.survey.surveyThemes);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSurveyId, setSelectedSurveyId] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const [selectedIsPublished, setSelectedIsPublished] = useState(false);

  useEffect(() => {
    dispatch(fetchSurveyThemesAction());
    dispatch(fetchSurveysAction());
  }, [dispatch]);

  const sortedSurveys = useMemo(
    () => [...surveys].sort(
      (a, b) => (
        sortBy === 'alpha'
          ? a.title.localeCompare(b.title)
          : new Date(b.created_at) - new Date(a.created_at)
      ),
    ),
    [surveys, sortBy],
  );

  const handleMenuClick = (event, surveyId, isPublished) => {
    setAnchorEl(event.currentTarget);
    setSelectedSurveyId(surveyId);
    setSelectedIsPublished(isPublished);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedSurveyId(null);
  };

  const handleDelete = async () => {
    if (!selectedSurveyId) return;

    const confirmation = window.confirm(
      'Are you sure you want to permanently delete this entire survey?',
    );

    if (confirmation) {
      try {
        await dispatch(deleteSurveyAction(selectedSurveyId));
      } catch (error) {
        console.error('Failed to delete survey:', error);
      }
    }
    
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
        <PageHeader
          title="Surveys"
          actions={(
            <Button
              component={RouterLink}
              to="/survey-design"
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ textTransform: 'none', borderRadius: '8px' }}
            >
              Create Survey
            </Button>
          )}
          mb={4}
        />

        <FormControl size="medium" sx={{ mb: 2, minWidth: 170 }}>
          <InputLabel>Sort by</InputLabel>
          <Select
            label="Sort by"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            MenuProps={{
              PaperProps: {
                sx: {
                  '& .MuiMenuItem-root': {
                    minHeight: 40,
                    py: 0.75,
                    fontSize: '0.95rem',
                  },
                },
              },
            }}
          >
            <MenuItem value="newest">Newest first</MenuItem>
            <MenuItem value="alpha">A → Z</MenuItem>
          </Select>
        </FormControl>

        {loading ? (
          <Loading loading fullScreen={false} label="Loading" minHeight="40vh" />
        ) : sortedSurveys.length === 0 ? (
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
            {sortedSurveys.map((survey) => {
              const isPublished = survey.survey_status_id === 2;
              const firstPageId = getFirstSurveyPageId(survey);
              const categoryTitle = survey.survey_category?.title;
              const publicLinkUrl = `${window.location.origin}/surveys/ps/${survey.public_link}`;

              return (
                <Grid item xs={12} sm={6} md={4} key={survey.id}>
                  <Card
                    sx={{
                      position: 'relative',
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
                    {isPublished && (
                      <Chip
                        label="Published"
                        color="success"
                        sx={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          height: '22px',
                          fontSize: '0.7rem',
                          '.MuiChip-label': {
                            padding: '0 8px',
                          },
                        }}
                      />
                    )}

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
                      
                      {isPublished && survey.public_link && (
                        <Box sx={{ mt: 1.5 }}>
                          <MuiLink
                            href={publicLinkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={publicLinkUrl}
                            sx={{
                              display: 'inline-block',
                              alignItems: 'center',
                              fontSize: '0.8rem',
                              color: 'text.secondary',
                              textDecoration: 'underline',
                              maxWidth: '100%',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              '&:hover': {
                                color: 'primary.main',
                              },
                            }}
                          >
                            <LinkIcon sx={{ mr: 0.75, fontSize: '1rem', verticalAlign: 'middle' }} />
                            <span style={{ verticalAlign: 'middle' }}>{publicLinkUrl}</span>
                          </MuiLink>
                        </Box>
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
                          onClick={e => handleMenuClick(e, survey.id, isPublished)}
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
        <MenuItem 
          onClick={handleDelete} 
          disabled={selectedIsPublished}
          sx={{ 
            color: 'error.main',
          }}
        >
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
