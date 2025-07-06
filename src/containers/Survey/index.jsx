import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
 Box as MuiBox, Typography as MuiTypography, Typography, Switch, FormControlLabel, 
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector hook

import SurveyForm from './components/SurveyForm';
import SurveyPageLoader from './components/SurveyPageLoader';
import PublicSurveyPreview from './components/PublicSurveyPreview';

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
  const [showPreview, setShowPreview] = useState(true);

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

      {/* toggle to show/hide preview */}
      <FormControlLabel
        control={(
          <Switch
            checked={showPreview}
            onChange={e => setShowPreview(e.target.checked)}
          />
        )}
        label="Live Preview"
        sx={{ mt: 3 }}
      />

      {/* live preview pane */}
      {showPreview && pageData && (
        <MuiBox
          sx={{
            width: '100%',
            mt: 2,
            p: 2,
            border: '1px solid #eee',
            borderRadius: 1,
            overflow: 'auto',
            maxHeight: '60vh',
          }}
        >
          <PublicSurveyPreview
            title={pageData.page_title}
            questions={pageData.questions}
            settings={{
              showPageTitle: pageData.show_page_title,
              showNumbers: pageData.show_question_numbers,
              showProgress: pageData.show_progress_bar,
              /* …etc… */
            }}
            theme={pageData.theme}
          />
        </MuiBox>
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
