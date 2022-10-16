import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Field, Form } from 'react-final-form';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import { Alert } from 'react-bootstrap';
import renderCheckBoxField from '@/shared/components/form/CheckBox';
import PasswordField from '@/shared/components/form/Password';
import {
  FormGroup,
  FormGroupField,
  FormGroupIcon,
  FormGroupLabel,
} from '@/shared/components/form/FormElements';
import { AccountButton, AccountForgotPassword, LoginForm } from '@/shared/components/account/AccountElements';

const LogInForm = ({ onSubmit, error }) => (
  <Form onSubmit={onSubmit}>
    {({ handleSubmit }) => (
      <LoginForm onSubmit={handleSubmit}>
        <Alert
          className="w-100"
          variant="danger"
          show={!!error}
        >
          {error}
        </Alert>

        <FormGroup>
          <FormGroupLabel>Username</FormGroupLabel>
          <FormGroupField>
            <FormGroupIcon>
              <AccountOutlineIcon />
            </FormGroupIcon>
            <Field
              name="name"
              component="input"
              type="text"
              placeholder="Name"
            />
          </FormGroupField>
        </FormGroup>
        <FormGroup>
          <FormGroupLabel>Password</FormGroupLabel>
          <FormGroupField>
            <Field
              name="password"
              component={PasswordField}
              placeholder="Password"
              className="input-without-border-radius"
              keyIcon
            />
            <AccountForgotPassword>
              <NavLink to="/">Forgot a password?</NavLink>
            </AccountForgotPassword>
          </FormGroupField>
        </FormGroup>
        <FormGroup>
          <FormGroupField>
            <Field
              name="remember_me"
              component={renderCheckBoxField}
              label="Remember me"
              type="checkbox"
            />
          </FormGroupField>
        </FormGroup>
        <AccountButton
          as={NavLink}
          variant="primary"
          to="/pages/one"
        >
          Sign In
        </AccountButton>
        <AccountButton
          as={NavLink}
          variant="outline-primary"
          to="/pages/one"
        >
          Create Account
        </AccountButton>
      </LoginForm>
    )}
  </Form>
);

LogInForm.propTypes = {
  error: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

LogInForm.defaultProps = {
  error: '',
};

export default LogInForm;
