import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/App.jsx';
import { AuthProvider } from './src/context/AuthContext.jsx';
import './app/globals.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>
  );
}
