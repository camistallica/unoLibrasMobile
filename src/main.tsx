// src/main.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css'; // <-- ADICIONE ESTA LINHA

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
// ... resto dos imports de CSS do Ionic
import './theme/variables.css';

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);