import React from 'react';
import PropTypes from 'prop-types';
import QuestionItem from './QuestionItem';

const QuestionList = ({ questions, onDelete, onOptionSelection }) => {
  console.log(`Questions in prop of QuestionList: ${questions}`);
  // Check if questions is null, undefined, or an empty array
  if (!questions || questions.length === 0) {
    return (
      <div>
        <h2>Questions</h2>
        <p>No questions available.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Questions</h2>
      {questions.map((question, index) => (
        <QuestionItem
          key={question.id}
          question={question}
          index={index}
          onDelete={onDelete}
          onOptionSelection={onOptionSelection}
        />
      ))}
    </div>
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
