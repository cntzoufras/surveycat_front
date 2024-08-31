import React from 'react';
import PropTypes from 'prop-types';
import PublicQuestionItem from './PublicQuestionItem'; // Import the correct component

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
          onResponseChange={onResponseChange} // Pass the onResponseChange prop
        />
      ))}
    </div>
  );
};

PublicQuestionList.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    question_type_id: PropTypes.number.isRequired,
    survey_question_choices: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      sort_index: PropTypes.number.isRequired,
    })),
  })).isRequired,
  onResponseChange: PropTypes.func.isRequired,
};

export default PublicQuestionList;
