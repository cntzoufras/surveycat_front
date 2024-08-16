import React from 'react';
import QuestionItem from './QuestionItem';

const QuestionList = ({ questions, onDelete, onOptionSelection }) => {
  console.log(questions);
  return (
    <div>
      <h2>Questions</h2>
      {questions.map((question, index) => (
        <QuestionItem
          key={question.id} // Use question ID as the key
          question={question}
          index={index}
          onDelete={onDelete}
          onOptionSelection={onOptionSelection}
        />
      ))}
    </div>
  );
}

export default QuestionList;
