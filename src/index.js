import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';

const root = document.getElementById('root');

// Utiliza createRoot desde react-dom/client
const rootInstance = createRoot(root);
rootInstance.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



