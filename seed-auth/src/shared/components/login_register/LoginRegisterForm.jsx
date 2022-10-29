import React from 'react';
import PropTypes from 'prop-types';
import { Field, Form } from 'react-final-form';
import styled from 'styled-components';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import AlternateEmailIcon from 'mdi-react/AlternateEmailIcon';
import { Alert } from 'react-bootstrap';
import FormField from '@/shared/components/form/FormField';
import PasswordField from '@/shared/components/form/Password';
import {
  FormContainer,
  FormGroup,
  FormGroupField,
  FormGroupIcon,
  FormGroupLabel,
} from '@/shared/components/form/FormElements';
import { marginLeft } from '@/utils/directions';
import { AccountButton, AccountButtons, ForgotFormGroup } from '@/shared/components/account/AccountElements';

const validate = value => (value ? null : 'This field is required!');

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
        <FormGroup>
          <FormGroupLabel>Username</FormGroupLabel>
          <FormGroupField>
            <FormGroupIcon>
              <AccountOutlineIcon />
            </FormGroupIcon>
            <Field
              name="username"
              component={FormField}
              type="text"
              placeholder="Name"
              className="input-without-border-radius"
              validate={validate}
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
              component={FormField}
              type="email"
              placeholder="example@mail.com"
              className="input-without-border-radius"
              validate={validate}
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
              validate={validate}
              keyIcon
            />
          </FormGroupField>
        </ForgotFormGroup>
        <RegisterButtons>
          <AccountButton type="submit" variant="primary">
            Sign Up
          </AccountButton>
        </RegisterButtons>
      </FormContainer>
    )}
  </Form>
);

RegisterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
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
