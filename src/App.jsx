import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from './components/ui/Toast';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { UserProvider } from './context/UserContext';
import AppRoutes from './routes/AppRoutes';
import { getHealthStatus } from './services/api';

export default function App() {
  // Silent initial backend health check on application boot
  useEffect(() => {
    getHealthStatus()
      .then((data) => {
        if (import.meta.env.DEV) {
          console.log('[MindMapr API] Backend connection established:', data);
        }
      })
      .catch((err) => {
        if (import.meta.env.DEV) {
          console.warn('[MindMapr API] Backend connection check:', err.message);
        }
      });
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <UserProvider>
            <ToastProvider>
              <AppRoutes />
            </ToastProvider>
          </UserProvider>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
