import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { 
  Box as MuiBox, 
  Typography as MuiTypography, 
  List as MuiList, 
} from '@mui/material';
import QuestionItem from './QuestionItem';

const QuestionList = ({ 
  questions,
  onDelete,
  onResponseChange,
  onDragEnd,
}) => {
  if (!questions || questions.length === 0) {
    return (
      <div>
        <h2>Questions</h2>
        <p>No questions available.</p>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <MuiBox sx={{ marginBottom: 4 }}>
        <MuiTypography variant="h6" sx={{ fontWeight: 300 }} gutterBottom>
          Survey Questions
        </MuiTypography>
        <Droppable droppableId="questions">
          {provided => (
            <MuiList {...provided.droppableProps} ref={provided.innerRef}>
              {questions.map((question, index) => (
                <Draggable key={question.id} draggableId={question.id} index={index}>
                  {draggableProvided => (
                    <div ref={draggableProvided.innerRef} {...draggableProvided.draggableProps}>
                      <QuestionItem
                        question={question}
                        index={index}
                        onDelete={onDelete}
                        onResponseChange={onResponseChange}
                        dragHandleProps={draggableProvided.dragHandleProps}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </MuiList>
          )}
        </Droppable>
      </MuiBox>
    </DragDropContext>
  );
};

QuestionList.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    question_type_id: PropTypes.number.isRequired,
    surveyPage: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
    selectedOption: PropTypes.string,
  })).isRequired,
  onDelete: PropTypes.func,
  onResponseChange: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
};

QuestionList.defaultProps = {
  onDelete: null,
};

export default QuestionList;
