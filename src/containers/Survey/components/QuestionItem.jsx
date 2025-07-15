// src/containers/Survey/components/QuestionItem.jsx

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
import { useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import questionTypeNames from '../../../utils/api/questionTypes';
import QuestionRenderer from './QuestionRenderer';

const QuestionItem = ({
  question,
  index,
  onDelete,
  onResponseChange,
  dragHandleProps,
}) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  
  const isPublished = useSelector(state => state.survey?.survey?.survey_status_id === 2);

  const questionTypes = useSelector(state => state.survey.questionTypes || []);
  const typeObj = questionTypes.find(qt => qt.id === question.question_type_id);
  const questionTypeName = typeObj
    ? typeObj.title
    : (questionTypeNames[question.question_type_id] || 'Unknown Type');

  const handleAnswerChange = (questionId, value) => {
    if (onResponseChange) {
      onResponseChange(questionId, value);
    }
  };

  const handleDeleteClick = () => {
    if (!isPublished) setDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (onDelete) onDelete(question.id);
    setDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setDialogOpen(false);
  };

  return (
    <Box
      key={question.id}
      sx={{
        mb: 2,
        p: 2,
        border: '1px solid #444',
        borderRadius: 1,
        display: 'flex', // Use flexbox for alignment
        alignItems: 'flex-start',
      }}
    >
      
      {/* Drag handle */}
      {!isPublished && (
        <Box 
          {...dragHandleProps}
          sx={{ 
            cursor: 'grab', 
            mr: 1, 
            mt: 1.5, 
            color: 'text.secondary',
          }}
        >
          <DragIndicatorIcon />
        </Box>
      )}

      {/* Main question content */}
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 1, 
        }}
        >
          <Typography variant="h6">
            {`${index + 1}. ${question.title}`}
            {questionTypeName && ` (${questionTypeName})`}
          </Typography>

          {onDelete && (
            <IconButton
              aria-label="delete"
              onClick={handleDeleteClick}
              disabled={isPublished}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
        <QuestionRenderer
          question={question}
          onAnswerChange={handleAnswerChange}
          isPublished={isPublished}
        />
        <Dialog
          open={isDialogOpen}
          onClose={handleCancelDelete}
          aria-labelledby="confirm-delete-title"
          aria-describedby="confirm-delete-description"
        >
          <DialogTitle id="confirm-delete-title">
            Confirm Delete
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="confirm-delete-description">
              Are you sure you want to delete this question?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDelete} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirmDelete} color="error" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

QuestionItem.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    question_type_id: PropTypes.number.isRequired,
    survey_id: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onDelete: PropTypes.func,
  onResponseChange: PropTypes.func.isRequired,
  dragHandleProps: PropTypes.shape({}),
};

QuestionItem.defaultProps = {
  onDelete: null,
  dragHandleProps: null,
};

export default QuestionItem;

