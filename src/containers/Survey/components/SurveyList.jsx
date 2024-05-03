import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SimpleLoader from '@/shared/components/SimpleLoader';
import { left } from '@/utils/directions';
import SurveyItem from './SurveyItem';
import surveyCard from '../types';

const SurveyList = ({
  surveyElements,
  changeShowEditModal,
  editSurveyElementAction,
  deleteSurveyElementAction,
}) => (
    surveyElements && surveyElements.length > 0 && (
      surveyElements.map(survey => (
        <div key={survey.data.id}>
          <SurveyItem
            surveyItemData={survey}
            changeShowEditModal={changeShowEditModal}
            editSurveyElement={editSurveyElementAction}
            deleteSurveyElement={deleteSurveyElementAction}
            isCompleted={survey.data.isCompleted}
          />
        </div>
      ))
    )
);

SurveyList.propTypes = {
  surveyElements: PropTypes.arrayOf(surveyCard),
  changeShowEditModal: PropTypes.func.isRequired,
  editSurveyElementAction: PropTypes.func.isRequired,
  deleteSurveyElementAction: PropTypes.func.isRequired,
};

SurveyList.defaultProps = {
  surveyElements: null,
};

const SurveyListWrapper = ({
  surveyElements,
  changeShowEditModal, editSurveyElementAction, deleteSurveyElementAction,
  isFetching, isArchived,
}) => (
  isFetching ? (
    <SurveyPanelRefresh>
      <SimpleLoader />
    </SurveyPanelRefresh>
    ) : (
      <SurveyList
        surveyElements={surveyElements}
        changeShowEditModal={changeShowEditModal}
        editSurveyElementAction={editSurveyElementAction}
        deleteSurveyElementAction={deleteSurveyElementAction}
        isArchived={isArchived}
      />
    )
);

SurveyListWrapper.propTypes = {
  surveyElements: PropTypes.arrayOf(surveyCard),
  changeShowEditModal: PropTypes.func,
  editSurveyElementAction: PropTypes.func,
  deleteSurveyElementAction: PropTypes.func,
  isFetching: PropTypes.bool,
  isArchived: PropTypes.bool,
};

SurveyListWrapper.defaultProps = {
  surveyElements: [],
  deleteSurveyElementAction: () => {},
  changeShowEditModal: () => {},
  editSurveyElementAction: () => {},
  isFetching: false,
  isArchived: false,
};

export default SurveyListWrapper;

// region STYLES

export const SurveyPanelRefresh = styled.div`
  max-width: 100%;
  height: 100%;
  max-height: 80px;
  text-align: center;
  ${left}: 0;

  svg {
    ${left}: calc(50% - 24px);
  }
`;

// endregion
