import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { Box as MuiBox, Typography as MuiTypography, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector hook

import SurveyForm from './components/SurveyForm';
import SurveyPageLoader from './components/SurveyPageLoader';

const StyledBox = styled(MuiBox)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const StyledTypography = styled(MuiTypography)`
  margin-bottom: 1rem;
`;

const SurveyPageWrapper = () => {
  const { surveyId, surveyPageId } = useParams();
  const { user, error, loggedIn } = useSelector(state => state.auth);
  const userId = user?.id;
  console.log(`Survey/index Survey ID: ${surveyId}, surveyPageID: ${surveyPageId}`)
  
  if (!userId) {
    return <Typography variant="h6" gutterBottom>Loading page...</Typography>;
  }
  
  useEffect(() => {
    if (!userId) {
      console.warn('... refreshing page.');
      window.location.reload();
    }
  }, [userId]);

  return (
    <StyledBox>
      <StyledTypography variant="h3" component="h1" gutterBottom>
        Survey Design
      </StyledTypography>
      {!surveyId && !surveyPageId && <SurveyForm userId={userId} />}
      {surveyId && surveyPageId && (
        <SurveyPageLoader surveyId={surveyId} surveyPageId={surveyPageId} />
      )}
    </StyledBox>
  );
};

const SurveyDesign = () => (
  <div>
    <SurveyPageWrapper />
  </div>
);

export default SurveyDesign;
