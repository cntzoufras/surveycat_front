import React, { useEffect, useState } from 'react';

const SurveyList = () => {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await fetch('http://surveycat.test/api/surveys');
        if (response.ok) {
          const surveyData = await response.json();
          setSurveys(surveyData);
        } else {
          console.error('Error fetching surveys:', response.status);
        }
      } catch (error) {
        console.error('Error fetching surveys:', error);
      }
    };

    fetchSurveys();
  }, []);

  return (
    <div>
      <h2>Surveys</h2>
      {surveys.map((survey) => (
        <div key={survey.id} style={}>
          <h3>{survey.title}</h3>
          <p>Style: {survey.style}</p>
          <h4>Questions:</h4>
          {survey.questions.map((question, index) => (
            <div key={index}>
              <p>Question: {question.question}</p>
              <p>Type: {question.type}</p>
              <p>Style: {question.style}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SurveyList;
