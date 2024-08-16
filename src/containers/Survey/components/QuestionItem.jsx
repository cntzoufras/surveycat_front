import React from 'react';

function QuestionItem({ question, index, onDelete, onOptionSelection }) {
  return (
    <div key={question.id}> 
      <p>{`${index + 1}. ${question.text} (${question.type}) (${question.surveyPage})`}</p>
      {['radio', 'checkbox'].includes(question.type) && (
        <div>
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex}>
              <input
                type={question.type}
                name={`question-${index}`}
                value={option}
                checked={question.selectedOption === option} 
                onChange={() => onOptionSelection(question.id, option)} // Pass both question ID and option
              />
              {option}
            </div>
          ))}
        </div>
      )}
      {onDelete && ( 
        <button onClick={() => onDelete(question.id)}>Delete</button> // Pass the question id to delete
      )}
    </div>
  );
}

export default QuestionItem;
