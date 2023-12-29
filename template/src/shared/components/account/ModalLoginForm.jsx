import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
} from 'react-bootstrap';

import LogInForm from './loginForm/LogInForm';

const ModalLoginForm = ({
  title, isOpen, error, closeModal, onLogin,  
}) => (
  <Modal onHide={closeModal} className="light ltr-support" show={isOpen}>
    <Modal.Header>{title}</Modal.Header>
    <Modal.Body>
      <LogInForm
        onSubmit={onLogin}
        errorMessage={error}
        form="modal_login"
        fieldUser="E-mail"
        typeFieldUser="email"
      />
    </Modal.Body>
  </Modal>
);

ModalLoginForm.propTypes = {
  title: PropTypes.string,
  error: PropTypes.string,
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
};

ModalLoginForm.defaultProps = {
  title: '',
  error: '',
  isOpen: false,
};

export default ModalLoginForm;
