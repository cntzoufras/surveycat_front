import React from 'react';
import { Field, Form } from 'react-final-form';
import EmailIcon from 'mdi-react/EmailIcon';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';
import PasswordField from '@/shared/components/form/Password';
import {
  FormGroup,
  FormGroupField,
  FormGroupIcon,
  FormGroupLabel,
} from '@/shared/components/form/FormElements';
import renderCheckBoxField from '../../form/CheckBox';
import {
 AccountButton, AccountForgotPassword, LoginForm, 
} from '../AccountElements';

const LogInForm = ({ 
    onSubmit, 
    error, 
}) => (
  <Form onSubmit={onSubmit}>
    {({ handleSubmit }) => (
      <LoginForm onSubmit={handleSubmit}>
        <Alert className="w-100" variant="danger" show={!!error}>
          {error}
        </Alert>

        <FormGroup>
          <FormGroupLabel>Email</FormGroupLabel>
          <FormGroupField>
            <FormGroupIcon>
              <EmailIcon />
            </FormGroupIcon>
            <Field 
              name="email" 
              component="input" 
              type="email" 
              placeholder="Email" 
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
              <NavLink to="/reset_password">Forgot a password?</NavLink>
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
        <AccountButton variant="primary" type="submit">
          Sign In
        </AccountButton>
        <AccountButton as={NavLink} variant="outline-primary" to="/auth/register">
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
