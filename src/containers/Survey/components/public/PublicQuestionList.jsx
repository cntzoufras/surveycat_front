import React from 'react';
import PropTypes from 'prop-types';
import PublicQuestionItem from './PublicQuestionItem';  // Import the correct component

const PublicQuestionList = ({ questions, onResponseChange }) => {
  if (!questions || questions.length === 0) {
    return <div>No questions available.</div>;
  }

  return (
    <div>
      {questions.map((question, index) => (
        <PublicQuestionItem
          key={question.id}
          question={question}
          index={index}
          onResponseChange={onResponseChange}  // Pass the onResponseChange prop
        />
      ))}
    </div>
  );
};

PublicQuestionList.propTypes = {
  questions: PropTypes.array.isRequired,
  onResponseChange: PropTypes.func.isRequired,
};

export default PublicQuestionList;
