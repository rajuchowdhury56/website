import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Workaround for "Cannot set property fetch of #<Window> which has only a getter"
// This happens when some library tries to polyfill fetch globally in a read-only environment.
if (typeof window !== 'undefined') {
  try {
    const originalFetch = window.fetch;
    Object.defineProperty(window, 'fetch', {
      value: originalFetch,
      writable: false,
      configurable: true
    });
  } catch (e) {
    console.warn('Could not lock window.fetch:', e);
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
