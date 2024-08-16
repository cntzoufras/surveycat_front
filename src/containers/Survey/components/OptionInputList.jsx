import React from 'react';

function OptionInputList({ questionType, numOptions, optionInputs, selectedOptions, questionIndex, handleOptionInputChange, handleNewQuestionOptionSelection }) { 
  const renderOptionInputs = () => {
    const inputs = [];
    for (let i = 0; i < numOptions; i++) {
      const value = optionInputs[i] || '';
      inputs.push(
        <div key={i}>
          {questionType === 'radio' && (
            <input
              type="radio"
              name={`options-${questionIndex}`} // Unique name for radio group
              value={value}
              checked={selectedOptions.includes(value)}
              onChange={(e) => handleNewQuestionOptionSelection(e, value)}
            />
          )}
          {questionType === 'checkbox' && (
            <input
              type="checkbox"
              name="options" 
              value={value}
              checked={selectedOptions.includes(value)}
              onChange={(e) => handleNewQuestionOptionSelection(e, value)}
            />
          )}
          <input
            type="text"
            value={value}
            onChange={(e) => handleOptionInputChange(e, i)}
            placeholder={`Option ${i + 1}`}
          />
        </div>
      );
    }
    return inputs;
  };

  return (
    <div>
      <label>Options:</label>
      {renderOptionInputs()}
    </div>
  );
}

export default OptionInputList;
