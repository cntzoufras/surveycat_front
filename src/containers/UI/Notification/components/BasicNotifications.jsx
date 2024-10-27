import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Col } from 'react-bootstrap';
import { BasicNotification } from '@/shared/components/Notification';
import {
  Card, CardBody, CardTitleWrap, CardTitle, CardSubhead,
} from '@/shared/components/Card';
import { Button, ButtonToolbar } from '@/shared/components/Button';

// Function to show the notification with alpha transparency and theme-based colors
const show = (showNotification, position) => showNotification({
  notification(theme) {
    const backgroundColor = theme === 'dark' 
      ? 'rgba(38, 38, 38, 0.6)'
      : 'rgba(255, 255, 255, 0.6)';
    
    const textColor = theme === 'dark' ? '#ffffff' : '#ffffff'; // Ensure white text for readability

    return (
      <BasicNotification
        title="Remember!"
        message="Learning day desirous informed expenses 
        material returned six the. She enabled invited exposed him another."
        theme={theme}
        style={{
          backgroundColor,
          color: textColor,
          padding: '15px',
          borderRadius: '10px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
        }}
      />
    );
  },
  position,
});

const BasicNotifications = ({ showNotification }) => {
  const { t } = useTranslation('common');

  return (
    <Col md={12} lg={6} xs={12}>
      <Card>
        <CardBody>
          <CardTitleWrap>
            <CardTitle>{t('ui_elements.notifications.basic_notifications')}</CardTitle>
            <CardSubhead>Use BasicNotification with necessary value of property
              <span className="red-text"> position</span>
            </CardSubhead>
          </CardTitleWrap>
          <ButtonToolbar>
            <Button 
              variant="outline-secondary" 
              onClick={() => show(showNotification, 'left-up')}
            >
              Left Up
            </Button>
            <Button 
              variant="outline-secondary" 
              onClick={() => show(showNotification, 'right-up')}
            >
              Right Up
            </Button>
          </ButtonToolbar>
        </CardBody>
      </Card>
    </Col>
  );
};

BasicNotifications.propTypes = {
  showNotification: PropTypes.func.isRequired,
};

export default BasicNotifications;
