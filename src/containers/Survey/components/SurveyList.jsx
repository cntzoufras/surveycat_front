import React, { useEffect } from 'react';
import {
  Button as MuiButton,
  Box as MuiBox,
  Typography as MuiTypography,
  Grid as MuiGrid,
  Paper as MuiPaper,
  Link as MuiLink,
  Chip as MuiChip,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSurveyThemesAction,
  fetchSurveysAction,
} from '@/redux/actions/surveyActions';

const customTheme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

const SurveyList = () => {
  const dispatch = useDispatch();
  const surveys = useSelector(state => state.survey.surveys);
  const themes = useSelector(state => state.survey.surveyThemes);

  useEffect(() => {
    dispatch(fetchSurveyThemesAction());
    dispatch(fetchSurveysAction());
  }, [dispatch]);

  const getThemeTitle = (themeId) => {
    const found = themes.find(t => t.id === themeId);
    return found ? found.title : '-';
  };

  const getFirstSurveyPageId = survey => (survey.survey_pages && survey.survey_pages.length > 0
      ? survey.survey_pages[0].id
      : '');

  return (
    <ThemeProvider theme={customTheme}>
      <MuiBox p={2} textAlign="center">
        <MuiTypography textAlign="left" variant="h2" gutterBottom>
          Surveys
        </MuiTypography>

        {surveys.length === 0 ? (
          <MuiBox mt={4}>
            <MuiTypography variant="h6" gutterBottom>
              No surveys yet.
            </MuiTypography>
            <MuiLink
              component={Link}
              to="/survey-design"
              sx={{ textDecoration: 'none' }}
            >
              <MuiButton variant="contained" color="primary">
                Create a new survey
              </MuiButton>
            </MuiLink>
          </MuiBox>
        ) : (
          <MuiGrid container spacing={3} justifyContent="center">
            {surveys.map((survey) => {
              const isPublished = Boolean(survey.public_link);

              return (
                <MuiGrid item xs={12} sm={8} md={6} lg={4} key={survey.id}>
                  <MuiPaper
                    elevation={24}
                    sx={{
                      position: 'relative',
                      padding: 2,
                      minHeight: '150px',
                      maxWidth: '100%',
                      margin: '0 auto',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      textAlign: 'left',
                      justifyContent: 'space-between',
                    }}
                  >
                    {isPublished && (
                      <MuiChip
                        label="Published"
                        size="small"
                        color="success"
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          fontWeight: 'bold',
                        }}
                      />
                    )}

                    <Link
                      to={`/surveys/${survey.id}/pages/${getFirstSurveyPageId(
                        survey,
                      )}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <MuiTypography
                        variant="h2"
                        sx={{ color: '#505050' }}
                        gutterBottom
                      >
                        {survey.title}
                      </MuiTypography>
                      <MuiTypography
                        variant="body2"
                        sx={{ color: '#505050' }}
                        gutterBottom
                      >
                        Theme: {getThemeTitle(survey.theme_id)}
                      </MuiTypography>
                      <MuiBox mt={2}>
                        <MuiTypography
                          variant="subtitle2"
                          sx={{ color: '#757575' }}
                          gutterBottom
                        >
                          Pages: {survey.survey_pages?.length ?? 0}
                        </MuiTypography>
                      </MuiBox>
                    </Link>
                  </MuiPaper>
                </MuiGrid>
              );
            })}
          </MuiGrid>
        )}
      </MuiBox>
    </ThemeProvider>
  );
};

export default SurveyList;
