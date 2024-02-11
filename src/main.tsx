import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
import './index.css';
import { enableMocking } from './mocks/config.ts';

enableMocking().then(() => {
    const root = createRoot(document.getElementById('root')!);
    root.render(
        <StrictMode>
            <App />
        </StrictMode>,
    );
})

