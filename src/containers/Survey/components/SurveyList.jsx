import React, { useEffect, useState } from 'react';
import {
  Box as MuiBox,
  Typography as MuiTypography,
  Grid as MuiGrid,
  Paper as MuiPaper,
  Button as MuiButton,
  Link as MuiLink,
} from '@mui/material';
import { getUserSurveys } from '@/utils/api/survey-api';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Create a theme with Roboto font
const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

const SurveyList = () => {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await getUserSurveys();
        if (response.ok) {
          setSurveys(response.data);
        } else {
          console.error('Error fetching surveys:', response.status);
        }
      } catch (error) {
        console.error('Error fetching surveys:', error);
      }
    };
    fetchSurveys();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <MuiBox p={3} textAlign="center">
        <MuiTypography variant="h4" gutterBottom>
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
          <MuiGrid container spacing={3}>
            {surveys.map(survey => (
              <MuiGrid item xs={12} md={6} lg={4} key={survey.id}>
                <MuiPaper elevation={3} style={{ padding: '16px' }}>
                  <MuiTypography variant="h6">{survey.title}</MuiTypography>
                  <MuiTypography variant="body2">
                    Style: {survey.style}
                  </MuiTypography>
                  <MuiBox mt={2}>
                    <MuiTypography variant="subtitle2">
                      Number of Pages: {survey.pages.length}
                    </MuiTypography>
                  </MuiBox>
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
