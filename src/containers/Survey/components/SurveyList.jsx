import React, { useEffect, useState } from 'react';
import {
  Box as MuiBox,
  Typography as MuiTypography,
  Grid as MuiGrid,
  Paper as MuiPaper,
  Button as MuiButton,
  Link as MuiLink,
} from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getSurveysWithPagesAndThemes } from '@/utils/api/survey-api';

// Create a theme with Roboto font
const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

const SurveyList = () => {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    let isMounted = true; // Track if the component is mounted

    const fetchSurveysWithDetails = async () => {
      try {
        const response = await getSurveysWithPagesAndThemes(); // Updated API call

        if (isMounted) {
          if (response.status === 200) {
            setSurveys(response.data);
          } else {
            console.error('Error fetching surveys:', response.status);
          }
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching surveys:', error.message);
        }
      }
    };

    fetchSurveysWithDetails();

    // Cleanup function to set isMounted to false when the component unmounts
    return () => {
      isMounted = false;
    };
  }, []);


  return (
    <ThemeProvider theme={theme}>
      <MuiBox p={2} textAlign="center">
        <MuiTypography textAlign="left" variant="h2" gutterBottom>
          Surveys
        </MuiTypography>
        {surveys.length === 0 ? (
          <MuiBox mt={4}>
            <MuiTypography variant="h6" gutterBottom>
              No surveys yet.
            </MuiTypography>
            <MuiButton
              variant="contained"
              color="primary"
              component={MuiLink}
              href="/survey-design"
            >
              Create a new survey
            </MuiButton>
          </MuiBox>
        ) : (
          <MuiGrid container spacing={3} justifyContent="center">
            {surveys.map(survey => (
              <MuiGrid item xs={12} sm={8} md={6} lg={4} key={survey.id}>
                <MuiPaper
                  elevation={24}
                  sx={{
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
                  <Link
                    to={`/surveys/${survey.id}/pages/${survey.survey_pages[0]?.id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }} 
                  >
                    <MuiTypography 
                      variant="h2" 
                      sx={{
                        color: '#505050',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }} 
                      gutterBottom
                    >
                      {survey.title}
                    </MuiTypography>
                    <MuiTypography 
                      variant="body2"
                      sx={{
                        color: '#505050',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }} 
                      gutterBottom
                    >
                      Theme: {survey.theme ? survey.theme.title : '-'}
                    </MuiTypography>
                    <MuiBox mt={2}>
                      <MuiTypography 
                        variant="subtitle2"
                        sx={{
                          color: '#757575',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                        }}
                        gutterBottom
                      >
                        Pages: {survey.survey_pages ? survey.survey_pages.length : 0}
                      </MuiTypography>
                    </MuiBox>
                  </Link>
                </MuiPaper>
              </MuiGrid>
            ))}
          </MuiGrid>
        )}
      </MuiBox>
    </ThemeProvider>
  );
};

export default SurveyList;
