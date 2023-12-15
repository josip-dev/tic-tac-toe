import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { UserStateProvider } from './state/UserState.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <UserStateProvider>
            <App />
        </UserStateProvider>
    </React.StrictMode>
);
