import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import theme from './Styles/theme';
import GlobalStyles from "./Styles/global"

import { AuthProvider } from './hooks/auth';

import { Routes } from './routes';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
        <GlobalStyles/>
          <AuthProvider>
            <Routes /> 
          </AuthProvider>
      </ThemeProvider>
    </React.StrictMode>,
)
