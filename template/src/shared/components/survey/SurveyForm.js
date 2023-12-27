import React, { useState } from 'react';

function SurveyForm({ addSurvey }) {
  const [title, setTitle] = useState('');
  const [style, setStyle] = useState('');
  const [questions, setQuestions] = useState([]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleStyleChange = (e) => {
    setStyle(e.target.value);
  };

  const handleQuestionChange = (e, index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = { ...updatedQuestions[index], question: e.target.value };
    setQuestions(updatedQuestions);
  };

  const handleTypeChange = (e, index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = { ...updatedQuestions[index], type: e.target.value };
    setQuestions(updatedQuestions);
  };

  const handleQuestionStyleChange = (e, index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = { ...updatedQuestions[index], style: e.target.value };
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', type: '', style: '' }]);
  };

  const handleSubmit = () => {
    const survey = { title, style, questions };
    addSurvey(survey);
    setTitle('');
    setStyle('');
    setQuestions([]);
  };

  return (
    <div>
      <h2>Create Survey</h2>
      <div>
        <label htmlFor="title">Title: </label>
        <input id="title" type="text" value={title} onChange={handleTitleChange} />
      </div>
      <div>
        <label htmlFor="style">Style: </label>
        <input id="style" type="text" value={style} onChange={handleStyleChange} />
      </div>
      <h3>Questions:</h3>
      {questions.map((question, index) => (
        <div key={index}>
          <input
            type="text"
            value={question.question}
            onChange={(e) => handleQuestionChange(e, index)}
            placeholder="Question"
          />
          <select value={question.type} onChange={(e) => handleTypeChange(e, index)}>
            <option value="">Select type</option>
            <option value="text">Text</option>
            <option value="checkbox">Checkbox</option>
            <option value="radio">Radio</option>
          </select>
          <input
            type="text"
            value={question.style}
            onChange={(e) => handleQuestionStyleChange(e, index)}
            placeholder="Style"
          />
        </div>
      ))}
      <button onClick={addQuestion}>Add Question</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default SurveyForm;
