import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
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
  Button
} from '@mui/material';
import { fetchSurveyQuestionChoicesAction, fetchSurveyQuestionsWithChoices } from '@/redux/actions/surveyActions'; // Import your action
import DeleteIcon from '@mui/icons-material/Delete';
import questionTypeNames from '../../../utils/api/questionTypes';
import QuestionRenderer from './QuestionRenderer';

const QuestionItem = ({
  question, index, onDelete, onOptionSelection
}) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const dispatch = useDispatch();

  const questionTypeName = questionTypeNames[question.question_type_id] || 'Unknown Type';

  useEffect(() => {
    dispatch(fetchSurveyQuestionsWithChoices)
    if (
      question.question_type_id === 1 || 
      question.question_type_id === 2 || 
      question.question_type_id === 10
      ) {
      dispatch(fetchSurveyQuestionChoicesAction(question.id));
      console.log()
    }
  }, [dispatch, question.id, question.question_type_id]);

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
    <Box key={question.id} sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
      <Typography variant="h6">
        {`${index + 1}. ${question.title} (${questionTypeName})`}
      </Typography>
      
      <QuestionRenderer question={question} />

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
            <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
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
    options: PropTypes.arrayOf(PropTypes.string),
    selectedOptions: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  index: PropTypes.number.isRequired,
  onDelete: PropTypes.func,
};

QuestionItem.defaultProps = {
  onDelete: null,
};

export default QuestionItem;
