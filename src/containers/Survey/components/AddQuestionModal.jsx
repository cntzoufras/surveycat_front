import React, { useState } from 'react';
import OptionInputList from './OptionInputList';

function AddQuestionModal({ isOpen, onClose, onSubmit, validationErrors = {} }) {
  const [newQuestion, setNewQuestion] = useState('');
  const [surveyPage, setSurveyPage] = useState('');
  const [questionType, setQuestionType] = useState('textarea');
  const [numOptions, setNumOptions] = useState(2);
  const [optionInputs, setOptionInputs] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedQuestionTags, setSelectedQuestionTags] = useState([]);

  const handleQuestionInputChange = (e) => {
    setNewQuestion(e.target.value);
  };

  const handleSurveyPageInputChange = (e) => {
    setSurveyPage(e.target.value);
  };

  const handleQuestionTypeChange = (e) => {
    setQuestionType(e.target.value);

    // Reset options if question type changes
    if (e.target.value !== 'radio' && e.target.value !== 'checkbox') {
      setNumOptions(0);
      setOptionInputs([]);
      setSelectedOptions([]);
    } else if (e.target.value === 'radio' || e.target.value === 'checkbox') {
      setNumOptions(2); // Reset to 2 options for radio/checkbox
      setOptionInputs(['', '']); // Reset option inputs
    }
  };

  const handleNumOptionsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    const newNumOptions = value > 0 ? value : 1;
    setNumOptions(newNumOptions);

    // Update optionInputs based on numOptions change
    const updatedOptionInputs = [...optionInputs];
    while (updatedOptionInputs.length < newNumOptions) {
      updatedOptionInputs.push('');
    }
    setOptionInputs(updatedOptionInputs.slice(0, newNumOptions));
  };

  const handleOptionInputChange = (e, index) => {
    const updatedInputs = [...optionInputs];
    updatedInputs[index] = e.target.value;
    setOptionInputs(updatedInputs);
  };

  const handleNewQuestionOptionSelection  = (e, option) => {
    const selectedOptionsSet = new Set(selectedOptions);
    if (selectedOptionsSet.has(option)) {
      selectedOptionsSet.delete(option);
    } else {
      selectedOptionsSet.add(option);
    }
    setSelectedOptions(Array.from(selectedOptionsSet));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const questionData = {
      title: newQuestion,
      surveyPage,
      type: questionType,
      options: (questionType === 'radio' || questionType === 'checkbox')
        ? optionInputs.slice(0, numOptions).filter(Boolean) // Filter out empty options
        : [],
      selectedOptions,
      question_tags: selectedQuestionTags,
      is_required: false, // FIX
      question_type_id: 2, // FIX
      survey_page_id: 1,
      additional_settings: { color: 'blue',  align: "center",
        font_style: "bold",
        font_family:"Calibri",
        font_size:"4"}
    };

    onSubmit(questionData);
  };
  
return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <h3>Add Question</h3>
        <form onSubmit={handleSubmit}> {/* Wrap the content in a form */}
          <select value={questionType} onChange={handleQuestionTypeChange}>
            <option value="text">Text</option>
            <option value="radio">Radio Button</option>
            <option value="checkbox">Checkbox</option>
          </select>
          <input
            type="text"
            value={newQuestion}
            onChange={handleQuestionInputChange}
            placeholder="Question"
          />
          <input
            type="text"
            value={surveyPage}
            onChange={handleSurveyPageInputChange}
            placeholder="Survey Page"
          />

          {/* Conditional rendering of options input based on question type */}
          {(questionType === 'radio' || questionType === 'checkbox') && (
            <div>
              {questionType === 'radio' && (
                <div>
                  <label htmlFor="numOptions">Number of Options:</label>
                  <input
                    type="number"
                    id="numOptions"
                    value={numOptions}
                    onChange={handleNumOptionsChange}
                  />
                </div>
              )}
              <OptionInputList
                questionType={questionType}
                numOptions={numOptions}
                optionInputs={optionInputs}
                selectedOptions={selectedOptions}
                handleOptionInputChange={handleOptionInputChange}
                handleOptionSelection={handleNewQuestionOptionSelection }
              />
            </div>
          )}

          {/* Display validation errors if any */}
          {Object.keys(validationErrors).length > 0 && (
            <div className="validation-errors">
              {Object.keys(validationErrors).map((key) => (
                <p key={key}>{validationErrors[key]}</p>
              ))}
            </div>
          )}

          <div>
            <button type="submit">Submit</button> 
            <button onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddQuestionModal;
