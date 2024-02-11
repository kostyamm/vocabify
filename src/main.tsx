import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
import './index.css';

async function enableMocking() {
    if (!import.meta.env.DEV) {
        return
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { worker } = await import('./mocks/browser.js')

    // `worker.start()` returns a Promise that resolves
    // once the Service Worker is up and ready to intercept requests.
    return worker.start({
        onUnhandledRequest(req: Request, print: any) {
            const ignoredPathnames = [
                'chrome-extension://gppongmhjkpfnbhagpmjfkannfbllamg/js/js.js',
                'chrome-extension://gppongmhjkpfnbhagpmjfkannfbllamg/js/dom.js',
            ];
            if (ignoredPathnames.some((pathname) => req.url === pathname)) {
                return;
            }
            print.warning()
        }
    })
}

enableMocking().then(() => {
    const root = createRoot(document.getElementById('root')!);
    root.render(
        <StrictMode>
            <App />
        </StrictMode>,
    );
})

