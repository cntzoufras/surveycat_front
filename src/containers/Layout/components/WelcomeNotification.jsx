import React from 'react';
import PropTypes from 'prop-types';
import Notification from 'rc-notification';
import { ThemeProps } from '@/shared/prop-types/ReducerProps';
import { BasicNotification } from '@/shared/components/Notification';

let welcomeNotification = null;
// eslint-disable-next-line no-return-assign
Notification.newInstance({ style: { top: 65 } }, n => welcomeNotification = n);

const WelcomeNotification = (theme, rtl, setIsNotificationShown, isNotificationShown) => {
  const title = 'Welcome to the Surveycat!';
  const message = 'You have successfully logged in Surveycat. Now you can start exploring! ';
  const initialProps = {
    content: <BasicNotification
      title={title}
      message={message}
      theme={theme}
    />,
    key: 'welcome-notification',
    closable: true,
    duration: 5,
    style: {
      top: 0,
      left: 'calc(100vw - 100%)',
    },
    className: 'right-up ltr-support',
    onClose() {
      setIsNotificationShown(true);
    },
  };
  if (!isNotificationShown) {
    welcomeNotification.notice(initialProps);
  }
};

WelcomeNotification.propTypes = {
  theme: ThemeProps.isRequired,
  setIsNotificationShown: PropTypes.func.isRequired,
  isNotificationShown: PropTypes.bool,
};

WelcomeNotification.defaultProps = {
  isNotificationShown: false,
};

export default WelcomeNotification;
