import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import Loading from '@/shared/components/Loading';
import Router from './Router';
import store from './store';
import ScrollToTop from './ScrollToTop';
import GlobalStyles from './globalStyles';

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
          {!isLoaded && isLoading && (
            <Loading />
          )}
          <div>
            <ThemeProvider
              theme={{
                mode: 'light',
                direction: 'ltr',
              }}
            >
              <GlobalStyles />
              <Router />
            </ThemeProvider>
          </div>
        </ScrollToTop>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
