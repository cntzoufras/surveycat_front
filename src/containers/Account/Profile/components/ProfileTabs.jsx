import React, { useState } from 'react';
import {
  Col,
  Nav,
  Tab,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfileAction } from '@/redux/actions/userActions';
import {
  TabsWrap, NavLink, NavItem, BorderedBottomTabs,
} from '@/shared/components/Tabs';
import { Snackbar, Alert } from '@mui/material';
import { Card } from '@/shared/components/Card';
import ProfileSettings from './ProfileSettings';
import { ProfileCard } from '../ProfileBasicComponents';

const ProfileTabs = () => {
  const dispatch = useDispatch();
  // We only need loading and profile for the initial render logic.
  // The 'updating' and 'error' states will be handled by the form and snackbar.
  const {
    profile, loading,
  } = useSelector(state => state.user);

  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleSubmit = async (formValues) => {
    const updates = {};
    Object.keys(formValues).forEach((key) => {
      const value = formValues[key] || '';
      if (value !== profile.user[key]) {
        updates[key] = value;
      }
    });

    if (updates.password === '') {
      delete updates.password;
    }

    if (Object.keys(updates).length > 0) {
      try {
        await dispatch(updateUserProfileAction(updates));
        setNotification({ open: true, message: 'Profile updated successfully!', severity: 'success' });
      } catch (err) {
        // This 'catch' block will now execute instead of crashing
        let errorMessage = 'An unexpected error occurred.';
        if (err.response && err.response.data && err.response.data.errors) {
          errorMessage = Object.values(err.response.data.errors).flat().join(' ');
        } else if (err.message) {
          errorMessage = err.message;
        }
        setNotification({ open: true, message: errorMessage, severity: 'error' });
      }
    } else {
      setNotification({ open: true, message: 'No changes to save.', severity: 'info' });
    }
  };


  const handleCloseNotification = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotification({ ...notification, open: false });
  };
  
  // This now only handles the INITIAL loading of the profile
  if (loading) return <p>Loading profile...</p>;
  if (!profile) return null;

  return (
    <>
      <Col md={12} lg={12} xl={8}>
        <Card>
          <BorderedBottomTabs as={ProfileCard}>
            <Tab.Container defaultActiveKey="settings">
              <TabsWrap>
                <Nav className="nav-tabs">
                  <NavItem>
                    <NavLink eventKey="settings">
                      Settings
                    </NavLink>
                  </NavItem>
                </Nav>
                <Tab.Content>
                  <Tab.Pane eventKey="settings">
                    <ProfileSettings
                      onSubmit={handleSubmit}
                      initialValues={profile.user}
                    />
                  </Tab.Pane>
                </Tab.Content>
              </TabsWrap>
            </Tab.Container>
          </BorderedBottomTabs>
        </Card>
      </Col>
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProfileTabs;
