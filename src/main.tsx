import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// UIKit tokens/utilities first; the page CSS below only patches what
// the kit deliberately leaves to the app (code font).
import '@devstroop/react-uikit/style.css';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
