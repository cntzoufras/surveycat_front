import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
 Box as MuiBox, Typography as MuiTypography, Typography, Switch, FormControlLabel, 
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector hook

import SurveyForm from './components/SurveyForm';
import SurveyPageLoader from './components/SurveyPageLoader';


const StyledBox = styled(MuiBox)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2rem;
`;

const StyledTypography = styled(MuiTypography)`
  margin-bottom: 1rem;
`;

const SurveyPageWrapper = () => {
  const { surveyId, surveyPageId } = useParams();
  const { user } = useSelector(state => state.auth);
  const userId = user?.id;
  console.log(`Survey/index Survey ID: ${surveyId}, surveyPageID: ${surveyPageId}`);
  
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    if (!userId) {
      console.warn('... refreshing page.');
      window.location.reload();
    }
  }, [userId]);

  if (!userId) {
    return <Typography variant="h6" gutterBottom>Loading page...</Typography>;
  }
  
  return (
    <StyledBox>
      <StyledTypography variant="h2" component="h1" sx={{ align: 'center', paddingBottom: 'rem' }} gutterBottom>
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
