import React from 'react';
import PropTypes from 'prop-types';
import { 
  Box as MuiBox, 
  Typography as MuiTypography, 
  List as MuiList, 
} from '@mui/material';
import QuestionItem from './QuestionItem';

const QuestionList = ({ questions, onDelete, onResponseChange }) => {
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
      <MuiTypography variant="h6" sx={{ fontWeight: 300 }} gutterBottom>
        Questions
      </MuiTypography>
      <MuiList>
        {questions.map((question, index) => (
          <QuestionItem
            key={question.id} // Ensure `id` is unique
            question={question}
            index={index}
            onDelete={onDelete}
            onResponseChange={onResponseChange}
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
  onResponseChange: PropTypes.func.isRequired, 
};

QuestionList.defaultProps = {
  onDelete: null,
};

export default QuestionList;
