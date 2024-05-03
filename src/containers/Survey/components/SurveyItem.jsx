/* eslint-disable import/extensions */
import React from 'react';
import PropTypes from 'prop-types';
import DeleteForeverIcon from 'mdi-react/DeleteForeverIcon';
import PencilOutlineIcon from 'mdi-react/PencilOutlineIcon';
import PackageVariant from 'mdi-react/PackageVariantIcon';
import PackageVariantClosed from 'mdi-react/PackageVariantClosedIcon';
import styled from 'styled-components';
import {
  Card, CardBody,
// eslint-disable-next-line import/extensions, import/no-unresolved
} from '@/shared/components/Card';
import {
  colorAccent, colorAdditional, colorHover, colorRed, colorRedHover, colorText, colorYellow,
} from '@/utils/palette';
import {
  marginLeft, marginRight,
} from '@/utils/directions';
import { CheckBoxField } from '@/shared/components/form/CheckBox';
import surveyCard from '../types';

const SurveyItem = ({
  surveyItemData, changeShowEditModal, editSurveyElement, deleteSurveyElement, isCompleted,
}) => {
  const editItem = (items) => {
    changeShowEditModal(items);
  };

  const editSurveyElementData = (items) => {
    if (!surveyItemData.isArchived) {
      const surveyItemDataCopy = { ...items };
      surveyItemDataCopy.isCompleted = !surveyItemData.data.isCompleted;
      editSurveyElement(surveyItemDataCopy);
    }
  };

  const archivedItem = (items) => {
    const surveyItemDataCopy = { ...items };
    surveyItemDataCopy.isArchived = !surveyItemDataCopy.isArchived;
    editSurveyElement(surveyItemDataCopy);
  };

  const deleteItem = () => {
    if (surveyItemData.data.isArchived) {
      deleteSurveyElement(surveyItemData.data.id);
    }
  };

  return (
    <Card>
      <SurveyItemContent>
        <CheckBoxField
          disabled={surveyItemData.data.isArchived}
          checked={surveyItemData.data.isCompleted}
          name={surveyItemData.data.title}
          onChange={(e) => {
            e.preventDefault();
            editSurveyElementData(surveyItemData.data);
          }}
          styleType="colored-click"
        />
        <SurveyInfo>
          <SurveyContent isCompleted={isCompleted}>
            <h3>{surveyItemData.data.title}</h3>
            <h3>{surveyItemData.data.country}</h3>
            <SurveyDescription>{surveyItemData.data.description}</SurveyDescription>
          </SurveyContent>
          <SurveyAdditionalWrapper>
            <SurveyAdditional>
              <SurveyDueDate>Due date: {surveyItemData.data.date}</SurveyDueDate>
              <SurveyPriority>
                <span>Priority:</span>
                <SurveyPriorityIndicator priority={surveyItemData.data.priority} />
              </SurveyPriority>
            </SurveyAdditional>
            <SurveyBtnWrapper>
              {!surveyItemData.data.isArchived ? (
                <div>
                  <SurveyDeleteButton
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      editItem(surveyItemData);
                    }}
                  >
                    <PencilOutlineIcon />
                  </SurveyDeleteButton>
                  <SurveyDeleteButton
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      archivedItem(surveyItemData.data);
                    }}
                  >
                    <PackageVariantClosed />
                  </SurveyDeleteButton>
                </div>
              ) : (
                <div>
                  <SurveyDeleteButton
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      archivedItem(surveyItemData.data);
                    }}
                  >
                    <PackageVariant />
                  </SurveyDeleteButton>
                  <SurveyDeleteButton
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      deleteItem(surveyItemData);
                    }}
                  >
                    <DeleteForeverIcon />
                  </SurveyDeleteButton>
                </div>
              )}
            </SurveyBtnWrapper>
          </SurveyAdditionalWrapper>
        </SurveyInfo>
      </SurveyItemContent>
    </Card>
  );
};

SurveyItem.propTypes = {
  surveyItemData: surveyCard.isRequired,
  changeShowEditModal: PropTypes.func.isRequired,
  editSurveyElement: PropTypes.func.isRequired,
  deleteSurveyElement: PropTypes.func.isRequired,
  isCompleted: PropTypes.bool.isRequired,
};

export default SurveyItem;

// region STYLES

const SurveyItemContent = styled(CardBody)`
  display: flex;
`;


const SurveyInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-flow: column;

  @media screen and (min-width: 1280px){
    flex-flow: row;
  }
`;

const SurveyContent = styled.div`
  margin-right: 10px;
  margin-bottom: 10px;
  width: 100%;
  word-break: break-all;

  @media screen and (min-width: 1280px) {
    max-width: 500px;
  }

  @media screen and (min-width: 1440px) {
    max-width: 850px;
  }

  h3 {
    width: 100%;
    max-width: 100%;
    font-size: 16px;
    line-height: 18px;
    font-weight: 700;
    margin-bottom: 10px;
  }

  ${props => props.isCompleted && `

    h3 {
      text-decoration: line-through;
    }

    h3, & {
      color: ${colorAdditional};
    }
  `}
`;

const SurveyAdditionalWrapper = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-self: baseline;
  width: 100%;
  height: 100%;

  @media screen and (min-width: 400px) {
    flex-flow: row;
  }

  @media screen and (min-width: 576px) {
    flex-flow: column;
  }

  @media screen and (min-width: 768px) {
    flex-flow: row;
  }

  @media screen and (min-width: 1280px) {
    flex-flow: column;
    align-items: flex-end;
    width: initial;
  }
`;

const SurveyAdditional = styled.div`
  display: flex;
  margin: 0 0 10px 0;
  white-space: nowrap;
  ${marginLeft}: 0;
`;

const SurveyDescription = styled.p`
  width: 100%;
  word-break: break-all;
  color: ${colorText};
`;

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'low':
      return colorAccent;
    case 'medium':
      return colorYellow;
    case 'high':
      return colorRed;
      
    default:
      return colorAccent;
  }
};

const SurveyPriorityIndicator = styled.span`
  background-color: ${props => getPriorityColor(props.priority)};
  height: 10px;
  width: 10px;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
  align-self: center;
  flex-shrink: 0;
`;

const SurveyDueDate = styled.p`
  background-color: ${colorHover};
  ${marginRight}: 15px;
  margin-top: 0;
  padding: 0 5px;
`;

const SurveyPriority = styled.div`
  display: flex;
  align-self: baseline;
  ${marginRight}: 0;
  padding: 0 5px;
  color: ${colorText};
  background-color: ${colorHover};
  
  span:not(:last-child) {
    margin-right: 10px;
  }
`;

const SurveyBtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  min-width: 68px;

  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const SurveyDeleteButton = styled.button`
  border: none;
  position: relative;
  color: ${colorAdditional};
  cursor: pointer;
  align-self: flex-end;
  background-color: ${colorHover};

  svg {
    height: 16px;
    width: 16px;
    fill: ${colorAdditional};
  }

  &:hover {
    color: ${colorAccent};

    svg {
      fill: ${colorAccent};
    }
  }
`;

const SurveyButtonDelete = styled(SurveyDeleteButton)`

  &:hover {
    color: ${colorRedHover};

    svg {
      fill: ${colorRedHover};
    }
  }
`;

// endregion
