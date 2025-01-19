import React from 'react';
import PropTypes from 'prop-types';
import { Field, Form } from 'react-final-form';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import AlternateEmailIcon from 'mdi-react/AlternateEmailIcon';
import { Alert } from 'react-bootstrap';
import styled from 'styled-components';
import PasswordField from '@/shared/components/form/Password';
import {
  FormContainer,
  FormGroup,
  FormGroupField,
  FormGroupIcon,
  FormGroupLabel,
} from '@/shared/components/form/FormElements';
import { marginLeft } from '@/utils/directions';

import { AccountButton, AccountButtons, ForgotFormGroup } from '../AccountElements';

const required = value => (value ? undefined : 'Required');

const mustBeEmail = value => (value && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) ? undefined : 'Invalid email');

const composeValidators = (...validators) => value => validators.reduce((error, validator) => error 
|| validator(value), undefined);

const validatePassword = (value) => {
  if (!value) {
    return 'Required';
  }
  if (value.length < 8) {
    return 'Password must be at least 8 characters';
  }
  if (!/[a-z]/.test(value)) {
    return 'Password must contain at least one lowercase letter';
  }
  if (!/[A-Z]/.test(value)) {
    return 'Password must contain at least one uppercase letter';
  }
  if (!/[0-9]/.test(value)) {
    return 'Password must contain at least one number';
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
    return 'Password must contain at least one symbol';
  }
  if (/[\s]/.test(value)) {
    return 'Password cannot contain spaces';
  }
  return undefined;
};

const validateConfirmPassword = (value, allValues) => {
  if (value !== allValues.password) {
    return 'Passwords must match';
  }
  return undefined;
};

const RegisterForm = ({ onSubmit, errorMessage }) => (
  <Form onSubmit={onSubmit}>
    {({ handleSubmit }) => (
      <FormContainer onSubmit={handleSubmit}>
        <Alert
          variant="danger"
          show={!!errorMessage}
        >
          {errorMessage}
        </Alert>
        {errorMessage.form && (
          <Alert className="w-100" variant="danger">
            {errorMessage.form}
          </Alert>
        )}
        <FormGroup>
          <FormGroupLabel>Username</FormGroupLabel>
          <FormGroupField>
            <FormGroupIcon>
              <AccountOutlineIcon />
            </FormGroupIcon>
            <Field
              name="username"
              component="input"
              type="text"
              required
              placeholder="Name"
              className="input-without-border-radius"
              data-cy="username"
            />
          </FormGroupField>
        </FormGroup>
        <FormGroup>
          <FormGroupLabel>E-mail</FormGroupLabel>
          <FormGroupField>
            <FormGroupIcon>
              <AlternateEmailIcon />
            </FormGroupIcon>
            <Field
              name="email"
              component="input"
              type="email"
              placeholder="example@mail.com"
              required
              validate={composeValidators(required, mustBeEmail)}
              className="input-without-border-radius"
              data-cy="email"
            />
          </FormGroupField>
        </FormGroup>
        <ForgotFormGroup>
          <FormGroupLabel>Password</FormGroupLabel>
          <FormGroupField>
            <Field
              name="password"
              component={PasswordField}
              placeholder="Password"
              className="input-without-border-radius"
              validate={validatePassword}
              required
              keyIcon
              data-cy="password"
            />
          </FormGroupField>
          <FormGroupLabel>Repeat password</FormGroupLabel>
          <FormGroupField>
            <Field
              name="passwordConfirmation"
              component={PasswordField}
              placeholder="Repeat password"
              className="input-without-border-radius"
              required
              validate={validateConfirmPassword}
              keyIcon
              data-cy="r_password"
            />
          </FormGroupField>
        </ForgotFormGroup>
        <RegisterButtons>
          <AccountButton 
            type="submit" 
            variant="success" 
          >
            Sign Up
          </AccountButton>
        </RegisterButtons>
      </FormContainer>
    )}
  </Form>
);

RegisterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  // errorMessage: PropTypes.string,
  errorMessage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  // showNotification: PropTypes.func.isRequired,
};

RegisterForm.defaultProps = {
  errorMessage: '',
};

export default RegisterForm;

// region STYLES

const RegisterButtons = styled(AccountButtons)`
  ${marginLeft}: 0!important;
  margin-bottom: 20px;
  
  button {
    margin-bottom: 0;
  }
`;

// endregion
