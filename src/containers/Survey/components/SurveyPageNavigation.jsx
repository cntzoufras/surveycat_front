import React from 'react';
import PropTypes from 'prop-types';
import { 
  Button as MuiButton, 
  Box as MuiBox, 
  IconButton as MuiIconButton, 
  Select as MuiSelect, 
  MenuItem as MuiMenuItem, 
} from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const SurveyPageNavigation = ({
 currentPageIndex, surveyPages, onPrev, onNext, onSelectPage, onAddNewPage, 
}) => (
  <MuiBox sx={{ display: 'flex', justifyContent: 'space-between', paddingTop: 2 }}>
    <MuiIconButton onClick={onPrev} disabled={currentPageIndex <= 0}>
      <ArrowBackIos />
    </MuiIconButton>
    <MuiSelect
      value={surveyPages[currentPageIndex]?.id || ''}
      onChange={e => onSelectPage(e.target.value)}
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
    <MuiButton variant="contained" onClick={onAddNewPage}>
      Add New Page
    </MuiButton>
  </MuiBox>
);

SurveyPageNavigation.propTypes = {
  currentPageIndex: PropTypes.number.isRequired,
  surveyPages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string,
    }),
  ).isRequired,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onSelectPage: PropTypes.func.isRequired,
  onAddNewPage: PropTypes.func.isRequired,
};

export default SurveyPageNavigation;
