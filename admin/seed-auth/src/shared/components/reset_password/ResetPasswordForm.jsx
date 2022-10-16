import React from 'react';
import PropTypes from 'prop-types';
import { Field, Form } from 'react-final-form';
import AlternateEmailIcon from 'mdi-react/AlternateEmailIcon';
import { Alert } from 'react-bootstrap';
import {
  FormContainer,
  FormGroup,
  FormGroupField,
  FormGroupIcon,
  FormGroupLabel,
} from '@/shared/components/form/FormElements';
import { AccountButton } from '@/shared/components/account/AccountElements';

const ResetPasswordForm = ({
  onSubmit, fieldUser, message, status,
}) => (
  <Form onSubmit={onSubmit}>
    {({ handleSubmit }) => (
      <FormContainer onSubmit={handleSubmit}>
        {message && <Alert variant={status ? 'success' : 'danger'} className="w-100">{message}</Alert>}
        <FormGroup>
          <div>
            <FormGroupLabel>{fieldUser}</FormGroupLabel>
          </div>
          <FormGroupField>
            <FormGroupIcon>
              <AlternateEmailIcon />
            </FormGroupIcon>
            <Field
              name="email"
              id="email"
              component="input"
              type="email"
              placeholder="example@mail.com"
              className="input-without-border-radius"
              required
            />
          </FormGroupField>
        </FormGroup>
        <AccountButton variant="primary">
          Reset Password
        </AccountButton>
      </FormContainer>
    )}
  </Form>
);

ResetPasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  fieldUser: PropTypes.shape(),
  message: PropTypes.string,
  status: PropTypes.bool,
};

ResetPasswordForm.defaultProps = {
  fieldUser: null,
  message: '',
  status: true,
};

export default ResetPasswordForm;
