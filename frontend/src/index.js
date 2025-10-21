import React from 'react';
import { Analytics } from "@vercel/analytics/react"
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './contexts/ThemeContext';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <App />
        <Analytics />
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
);
