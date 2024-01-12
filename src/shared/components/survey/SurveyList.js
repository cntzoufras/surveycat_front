import React from 'react';

function SurveyList({ surveys }) {
  return (
    <div>
      <h2>Surveys</h2>
      {surveys.map((survey, index) => (  
        <div key={index}>
          <h3>{survey.title}</h3>
          <p>Style: {survey.style}</p>
          <h4>Questions:</h4>
          {survey.questions.map((question, questionIndex) => (
            <div key={questionIndex}>
              <p>Question: {question.question}</p>
              <p>Type: {question.type}</p>
              <p>Style: {question.style}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default SurveyList;
