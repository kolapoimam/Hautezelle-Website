import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Old links used hash URLs like /#/shop. Move them to the clean /shop address.
if (window.location.hash.startsWith('#/')) {
  const clean = window.location.hash.slice(1);
  window.history.replaceState(null, '', clean);
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);