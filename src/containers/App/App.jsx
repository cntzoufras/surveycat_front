import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import i18n from 'i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LoadScript } from '@react-google-maps/api';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import TimepickerStyles from '@/shared/components/form/date-pickers/timepickerStyles';
import Loading from '@/shared/components/Loading';
import Router from './Router';
import store from './store';
import ScrollToTop from './ScrollToTop';
import GlobalStyles from './globalStyles';
import RechartStyles from './rechartStyles';
import NotificationStyles from './notificationStyles';
import CalendarStyles from './calendarStyles';

// Remove completely remove i18n & auth0 from initialization app.jsx file

const ThemeComponent = ({
  children,
}) => {
  const {
    mode, direction, shadow, border,
  } = useSelector(state => ({
    mode: state.theme.className,
    direction: state.rtl.direction,
    shadow: state.shadow.className,
    border: state.border.className,
  }));

  const theme = createTheme({
    palette: {
      type: mode,
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider
        theme={{
          mode,
          direction,
          shadow,
          border,
        }}
      >
        <GlobalStyles />
        <NotificationStyles />
        <RechartStyles />
        <TimepickerStyles />
        <CalendarStyles />
        {children}
      </ThemeProvider>
    </MuiThemeProvider>
  );
};

ThemeComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

const ConnectedThemeComponent = ThemeComponent;

const App = () => (
  <Provider store={store}>
    <BrowserRouter basename="/surveycat">
      <ConnectedThemeComponent>
        <LoadScript
          loadingElement={<Loading loading />}
          googleMapsApiKey=""
        >
          <ScrollToTop>
            <Router />
          </ScrollToTop>
        </LoadScript>
      </ConnectedThemeComponent>
    </BrowserRouter>
  </Provider>
);

export default App;

