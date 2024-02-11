export const enableMocking = async () => {
    if (!import.meta.env.DEV) {
        return
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { worker } = await import('./browser.js')

    // `worker.start()` returns a Promise that resolves
    // once the Service Worker is up and ready to intercept requests.
    return worker.start({
        onUnhandledRequest(req: Request, print: any) {
            const ignoredPathnames = [
                'chrome-extension',
                'node_modules'
            ];
            if (ignoredPathnames.some((pathname) => req.url === pathname || req.url.includes(pathname))) {
                return;
            }
            print.warning()
        }
    })
}