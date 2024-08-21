import React, { useEffect, useState } from 'react';
import {
  Box as MuiBox,
  Typography as MuiTypography,
  Grid as MuiGrid,
  Paper as MuiPaper,
} from '@mui/material';
import { getSurveys } from '@/utils/api/survey-api';

const SurveyList = () => {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await getSurveys();
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
    <MuiBox p={3}>
      <MuiTypography variant="h4" gutterBottom>
        Surveys
      </MuiTypography>
      <MuiGrid container spacing={3}>
        {surveys.map(survey => (
          <MuiGrid item xs={12} md={6} lg={4} key={survey.id}>
            <MuiPaper elevation={3} style={{ padding: '16px' }}>
              <MuiTypography variant="h6">{survey.title}</MuiTypography>
              <MuiTypography variant="body2">Style: {survey.style}</MuiTypography>
              <MuiBox mt={2}>
                <MuiTypography variant="subtitle2">Number of Pages: {survey.pages.length}</MuiTypography>
              </MuiBox>
            </MuiPaper>
          </MuiGrid>
        ))}
      </MuiGrid>
    </MuiBox>
  );
};

export default SurveyList;

