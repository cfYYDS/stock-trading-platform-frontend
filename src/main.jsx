import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import { PrimeReactProvider } from 'primereact/api';

import 'primereact/resources/themes/lara-light-amber/theme.css';
import 'primeicons/primeicons.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <App />
    </PrimeReactProvider>
  </React.StrictMode>,
);
