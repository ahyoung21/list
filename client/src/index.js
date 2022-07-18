import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './store';

import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/global-styles';

import theme from './common/theme';

const store = createStore(rootReducer);

ReactDOM.render(
  <>
    <Provider store={store}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </>,
  document.getElementById('root')
);
