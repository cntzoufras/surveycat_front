import React from 'react';
import PropTypes from 'prop-types';

const QuestionItem = ({
  question, index, onDelete, onOptionSelection, 
}) => (
  <div key={question.id}> 
    <p>{`${index + 1}. ${question.text} (${question.type}) (${question.surveyPage})`}</p>
    {['radio', 'checkbox'].includes(question.type) && (
    <div>
      {question.options.map(option => (
        <div key={`${question.id}-${option}`}>
          <input
            type={question.type}
            name={`question-${index}`}
            value={option}
            checked={question.selectedOption === option} 
            onChange={() => onOptionSelection(question.id, option)}
          />
          {option}
        </div>
      ))}
    </div>
    )}
    {onDelete && ( 
    <button type="button" onClick={() => onDelete(question.id)}>Delete</button> 
    )}
  </div>
);

QuestionItem.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    surveyPage: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
    selectedOption: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onDelete: PropTypes.func,
  onOptionSelection: PropTypes.func.isRequired,
};

QuestionItem.defaultProps = {
  onDelete: null,
};

export default QuestionItem;
