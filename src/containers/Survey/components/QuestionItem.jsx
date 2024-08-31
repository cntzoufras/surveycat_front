import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import questionTypeNames from '../../../utils/api/questionTypes';
import QuestionRenderer from './QuestionRenderer';

const QuestionItem = ({
  question, index, onDelete, onResponseChange,
}) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  
  const questionTypeName = questionTypeNames[question.question_type_id] || 'Unknown Type';

  const handleAnswerChange = (value) => {
    onResponseChange(question.id, value);
  };
  
  const handleDeleteClick = () => {
    setDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete(question.id);
    setDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setDialogOpen(false);
  };

  return (
    <Box
      key={question.id}
      sx={{
 mb: 2, p: 2, border: '1px solid #ccc', borderRadius: '8px', 
}}
    >
      <Typography variant="h6">
        {`${index + 1}. ${question.title} (${questionTypeName})`}
      </Typography>
      
      {/* Render the question using the QuestionRenderer, passing the handleAnswerChange function */}
      <QuestionRenderer question={question} onAnswerChange={handleAnswerChange} />

      {/* Conditionally render the delete button and dialog if onDelete is provided */}
      {onDelete && (
        <>
          <IconButton edge="end" aria-label="delete" onClick={handleDeleteClick}>
            <DeleteIcon />
          </IconButton>

          <Dialog
            open={isDialogOpen}
            onClose={handleCancelDelete}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this question?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancelDelete} color="primary">
                Cancel
              </Button>
              <Button onClick={handleConfirmDelete} color="secondary" autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Box>
  );
};

QuestionItem.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    question_type_id: PropTypes.number.isRequired,
    survey_id: PropTypes.string.isRequired, // Add this line to pass survey_id
    options: PropTypes.arrayOf(PropTypes.string),
    selectedOptions: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  index: PropTypes.number.isRequired,
  onDelete: PropTypes.func,
  onResponseChange: PropTypes.func.isRequired,
};

QuestionItem.defaultProps = {
  onDelete: null,
};

export default QuestionItem;
