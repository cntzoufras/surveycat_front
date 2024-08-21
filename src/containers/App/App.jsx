import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createTheme as createMuiTheme, ThemeProvider as MuiV5ThemeProvider, CssBaseline } from '@mui/material/styles';
import { createTheme as createMaterialTheme, ThemeProvider as MaterialV4ThemeProvider } from '@material-ui/core/styles';
import { LoadScript } from '@react-google-maps/api';
import TimepickerStyles from '@/shared/components/form/date-pickers/timepickerStyles';
import Loading from '@/shared/components/Loading';

import Router from './Router';
import store from './store';
import ScrollToTop from './ScrollToTop';
import { config as i18nextConfig } from '../../translations';
import GlobalStyles from './globalStyles';
import RechartStyles from './rechartStyles';
import NotificationStyles from './notificationStyles';
import CalendarStyles from './calendarStyles';

i18n.init(i18nextConfig);

const ThemeComponent = ({ children }) => {
  const {
   mode, direction, shadow, border, 
   } = useSelector(state => ({
    mode: state.theme.className,
    direction: state.rtl.direction,
    shadow: state.shadow.className,
    border: state.border.className,
  }));
  
  const muiV5Theme = createMuiTheme({
    palette: {
      mode,
    },
  });

  const materialV4Theme = createMaterialTheme({
    palette: {
      type: mode,
    },
  });

  return (
    <MuiV5ThemeProvider theme={muiV5Theme}>
      <MaterialV4ThemeProvider theme={materialV4Theme}>
        <StyledThemeProvider
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
        </StyledThemeProvider>
      </MaterialV4ThemeProvider>
    </MuiV5ThemeProvider>
  );
};

ThemeComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

const ConnectedThemeComponent = ThemeComponent;

const App = () => (
  <Provider store={store}>
    <BrowserRouter basename="/">
      <I18nextProvider i18n={i18n}>
        <ConnectedThemeComponent>
          <LoadScript loadingElement={<Loading loading />} googleMapsApiKey="">
            <ScrollToTop>
              <Router />
            </ScrollToTop>
          </LoadScript>
        </ConnectedThemeComponent>
      </I18nextProvider>
    </BrowserRouter>
  </Provider>
);
export default App;
