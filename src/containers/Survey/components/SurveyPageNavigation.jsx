import React from 'react';
import { 
  Button as MuiButton, 
  Box as MuiBox, 
  IconButton as MuiIconButton, 
  Select as MuiSelect, 
  MenuItem as MuiMenuItem 
} from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const SurveyPageNavigation = ({ currentPageIndex, surveyPages, onPrev, onNext, onSelectPage, onAddNewPage }) => {
  return (
    <MuiBox sx={{ display: 'flex', justifyContent: 'space-between', paddingTop: 2 }}>
      <MuiIconButton onClick={onPrev} disabled={currentPageIndex <= 0}>
        <ArrowBackIos />
      </MuiIconButton>
      <MuiSelect
        value={surveyPages[currentPageIndex]?.id || ''}
        onChange={(e) => onSelectPage(e.target.value)}  // Corrected to pass only the value
        displayEmpty
        sx={{ width: '50%' }}
      >
        <MuiMenuItem value=""><em>Select Page</em></MuiMenuItem>
        {surveyPages.map(page => (
          <MuiMenuItem key={page.id} value={page.id}>
            {page.title || 'No page title yet'}
          </MuiMenuItem>
        ))}
      </MuiSelect>
      <MuiIconButton onClick={onNext} disabled={currentPageIndex >= surveyPages.length - 1}>
        <ArrowForwardIos />
      </MuiIconButton>
      <MuiButton variant="contained" color="secondary" onClick={onAddNewPage}>
        Add New Page
      </MuiButton>
    </MuiBox>
  );
};

export default SurveyPageNavigation;
