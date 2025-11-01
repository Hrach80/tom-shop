import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './assets/styles/global.scss'; // Կարևոր է գլոբալ սթայլերը ներմուծել

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);