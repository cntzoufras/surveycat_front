// src/components/public/QuestionList.js

import React from 'react';
import PropTypes from 'prop-types';

const PublicQuestionList = ({ questions, onResponseChange }) => {
  if (!questions || questions.length === 0) {
    return <div>No questions available.</div>;
  }

  return (
    <div>
      {questions.map((question) => (
        <div key={question.id} className="question-item">
          <h3>{question.title}</h3>
          {/* Render question choices, assuming it's a multiple-choice question */}
          {question.survey_question_choices && (
            <ul>
              {question.survey_question_choices.map((choice) => (
                <li key={choice.id}>
                  <h6>{choice.content}</h6>
                  <input
                    type="radio"
                    name={question.id}
                    value={choice.id}
                    onChange={(e) => onResponseChange(question.id, e.target.value)}
                  />
                  {choice.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

PublicQuestionList.propTypes = {
  questions: PropTypes.array.isRequired,
  onResponseChange: PropTypes.func.isRequired,
};

export default PublicQuestionList;
