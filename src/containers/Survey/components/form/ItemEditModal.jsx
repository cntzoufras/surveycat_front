import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ItemEditModalForm from './ItemEditModalForm';

const priorityOptions = [
  { value: 'high', label: 'high' },
  { value: 'medium', label: 'medium' },
  { value: 'low', label: 'low' },
];

const ItemEditModal = ({
  surveyElements,
  currentEditItem,
  changeShowEditModal,
  editSurveyElementAction,
  addSurveyElementAction,
  showEditModal,
}) => {
  const [priority, setPriority] = useState({ value: 'low', label: 'low' });
  const [dueDate, setDueDate] = useState(new Date());

  useEffect(() => {
    if (currentEditItem) {
      setPriority({ value: currentEditItem.priority, label: currentEditItem.priority });
      setDueDate(new Date(currentEditItem.date));
    } else {
      setPriority({ value: 'low', label: 'low' });
      setDueDate(new Date());
    }
  }, [currentEditItem, surveyElements]);

  const handleDateChange = (date) => {
    setDueDate(date);
  };

  const handlePriorityChange = (option) => {
    setPriority(option);
  };

  const handleSubmit = (formData) => {
    let tempDueData = new Date();
    if (dueDate) {
      tempDueData = dueDate;
    }
    const updatedSurveyData = {
      ...currentEditItem,
      title: formData.title,
      description: formData.description,
      priority: priority.value,
      date: new Intl.DateTimeFormat('en-US').format(tempDueData),
    };
    if (!currentEditItem) {
      updatedSurveyData.id = -(Date.now()); // new elements will have id < 0
      updatedSurveyData.isCompleted = false;
      updatedSurveyData.isArchived = false;
    }
    if (updatedSurveyData.title !== '') {
      if (!currentEditItem) {
        addSurveyElementAction(updatedSurveyData);
      } else {
        editSurveyElementAction(updatedSurveyData);
      }
      changeShowEditModal();
    }
  };

  return (
    <Modal
      show={showEditModal}
      onHide={changeShowEditModal}
    >
      <ItemEditModalForm
        initialValues={currentEditItem}
        onSubmit={handleSubmit}
        changeShowEditModal={changeShowEditModal}
        handleDateChange={handleDateChange}
        handlePriorityChange={handlePriorityChange}
        currentEditItem={currentEditItem}
        dueDate={dueDate}
        priority={priority}
        priorityOptions={priorityOptions}
      />
    </Modal>
  );
};

ItemEditModal.propTypes = {
  surveyElements: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  currentEditItem: PropTypes.shape(),
  changeShowEditModal: PropTypes.func.isRequired,
  editSurveyElementAction: PropTypes.func.isRequired,
  addSurveyElementAction: PropTypes.func.isRequired,
  showEditModal: PropTypes.bool.isRequired,
};

ItemEditModal.defaultProps = {
  currentEditItem: null,
};

export default ItemEditModal;
