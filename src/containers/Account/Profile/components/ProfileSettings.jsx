import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormButtonToolbar } from '@/shared/components/form/FormElements';
import { Button } from '@/shared/components/Button';
import {
  MaterialFormContainer,
  MaterialTextField,
  MaterialFormLabel,
} from '@/shared/components/form/MaterialFormElements';

const renderTextField = ({
  input, label, meta: { touched, error }, type, InputProps,
}) => (
  <MaterialTextField
    label={label}
    error={touched && error}
    type={type}
    InputProps={InputProps}
    {...input}
  />
);

renderTextField.propTypes = {
  input: PropTypes.shape().isRequired,
  label: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
  type: PropTypes.string,
  InputProps: PropTypes.shape(),
};

renderTextField.defaultProps = {
  meta: null,
  label: '',
  type: 'text',
  InputProps: null,
};


const ProfileSettings = ({ onSubmit, initialValues }) => {
  // 1. Add state and handlers for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(show => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
    >
      {({ handleSubmit, form, submitting }) => (
        <MaterialFormContainer onSubmit={handleSubmit}>
          <div>
            <MaterialFormLabel>First Name</MaterialFormLabel>
            <Field
              name="first_name"
              component={renderTextField}
              placeholder="First Name"
            />
          </div>
          <div>
            <MaterialFormLabel>Last Name</MaterialFormLabel>
            <Field
              name="last_name"
              component={renderTextField}
              placeholder="Last name"
            />
          </div>
          <div>
            <MaterialFormLabel>Email</MaterialFormLabel>
            <Field
              name="email"
              component={renderTextField}
              placeholder="example@mail.com"
              type="email"
            />
          </div>
          <div>
            <MaterialFormLabel>Password</MaterialFormLabel>
            <Field
              name="password"
              component={renderTextField}
              placeholder="Enter new password (optional)"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div>
            <MaterialFormLabel>Confirm Password</MaterialFormLabel>
            <Field
              name="password_confirmation"
              component={renderTextField}
              placeholder="Confirm new password"
              type={showPassword ? 'text' : 'password'}
            />
          </div>
          <FormButtonToolbar>
            <Button variant="primary" type="submit" disabled={submitting}>Update profile</Button>
          </FormButtonToolbar>
        </MaterialFormContainer>
      )}
    </Form>
  );
};

ProfileSettings.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    username: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
  }),
};

ProfileSettings.defaultProps = {
  initialValues: null,
};

export default ProfileSettings;
