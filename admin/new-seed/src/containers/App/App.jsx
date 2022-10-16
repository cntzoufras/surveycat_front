import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import Loading from '@/shared/components/Loading';
import Router from './Router';
import store from './store';
import ScrollToTop from './ScrollToTop';
import GlobalStyles from './globalStyles';


const ThemeComponent = ({ children }) => {
  const {
    mode, direction,
  } = useSelector(state => ({
    mode: state.theme.className,
    direction: state.rtl.direction,
  }));

  return (
    <ThemeProvider
      theme={{
        mode,
        direction,
      }}
    >
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};

ThemeComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

const ConnectedThemeComponent = ThemeComponent;

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    window.addEventListener('load', () => {
      setIsLoading(false);
      setTimeout(() => setIsLoaded(true), 500);
    });
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop>
          <Fragment>
            {!isLoaded && isLoading && (
              <Loading />
            )}
            <ConnectedThemeComponent>
              <Router />
            </ConnectedThemeComponent>
          </Fragment>
        </ScrollToTop>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
