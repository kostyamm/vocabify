import { ThemeMode } from '../contexts';
import { useEffect, useState } from 'react';

type DetectedTheme = ThemeMode.Dark | ThemeMode.Light
type UseSystemTheme = () => { detectedTheme: DetectedTheme }

const { Dark, Light } = ThemeMode

export const useSystemTheme: UseSystemTheme = () => {
    const darkMQ = window.matchMedia('(prefers-color-scheme: dark)')

    const [detectedTheme, setDetectedTheme] = useState((): DetectedTheme => {
        return darkMQ.matches ? Dark : Light
    })

    const mqListener = ({ matches }: MediaQueryListEvent) => setDetectedTheme(matches ? Dark : Light)

    useEffect(() => {
        darkMQ.addEventListener('change', mqListener)

        return () => darkMQ.removeEventListener('change', mqListener)
    }, []);

    return { detectedTheme }
}