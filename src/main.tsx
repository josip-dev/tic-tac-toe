import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { UserStateProvider } from './state/UserState.tsx';
import { TablesStateProvider } from './state/TablesState.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <UserStateProvider>
            <TablesStateProvider>
                <App />
            </TablesStateProvider>
        </UserStateProvider>
    </React.StrictMode>
);
