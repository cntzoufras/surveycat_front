// SurveyApp.js
import React from 'react';
import styled from '@emotion/styled';
import { Box as MuiBox, Typography as MuiTypography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';  // Import useSelector hook

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

  const { user, error, loggedIn } = useSelector((state) => state.auth);
  const user_id = user?.id;

  return (
    <StyledBox>
      <StyledTypography variant="h3" component="h1" gutterBottom>
        Survey Design
      </StyledTypography>
      {!surveyId && !surveyPageId && <SurveyForm user_id={user_id}/>}
      {surveyId && surveyPageId && (
        <SurveyPageLoader surveyId={surveyId} surveyPageId={surveyPageId} />
      )}
    </StyledBox>
  );
};

const SurveyDesign = () => {
  return (
    <div>
      <SurveyPageWrapper/>
    </div>
  );
};

export default SurveyDesign;
