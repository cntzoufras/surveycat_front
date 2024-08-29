import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import QuestionItem from './QuestionItem';
import { 
  Box as MuiBox, 
  Typography as MuiTypography, 
  List as MuiList 
} from '@mui/material';
import { fetchAllSurveyQuestionsWithChoices } from '@/redux/actions/surveyActions';


const QuestionList = ({ questions, onDelete, onOptionSelection }) => {
  console.log(`Questions in prop of QuestionList: ${questions}`);
  
  const dispatch = useDispatch();
  const { surveyId } = useParams();
  
  useEffect(() => {
    if (surveyId) {
      dispatch(fetchAllSurveyQuestionsWithChoices(surveyId));
    }
  }, [ dispatch, surveyId ]);

  if (!questions || questions.length === 0) {
    return (
      <div>
        <h2>Questions</h2>
        <p>No questions available.</p>
      </div>
    );
  }

    return (
    <MuiBox sx={{ marginBottom: 4 }}>
      <MuiTypography variant="h6" sx={{ fontWeight:300 }} gutterBottom>
        Questions
      </MuiTypography>
      <MuiList>
        {questions.map((question, index) => (
          <QuestionItem
            key={question.id}
            question={question}
            index={index}
            onDelete={onDelete}
          />
        ))}
      </MuiList>
    </MuiBox>
  );


};

QuestionList.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    question_type_id: PropTypes.number.isRequired,
    surveyPage: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
    selectedOption: PropTypes.string,
  })).isRequired,
  onDelete: PropTypes.func,
  onOptionSelection: PropTypes.func.isRequired,
};

QuestionList.defaultProps = {
  onDelete: null,
};

export default QuestionList;
