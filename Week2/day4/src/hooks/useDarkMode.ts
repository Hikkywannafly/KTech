import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

export function useDarkMode() {
    const [theme, setTheme] = useState<Theme>('system');
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {

        const savedTheme = localStorage.getItem('theme') as Theme;
        if (savedTheme) {
            setTheme(savedTheme);
        }

        applyTheme(savedTheme || 'system');
    }, []);

    useEffect(() => {

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = (e: MediaQueryListEvent) => {
            if (theme === 'system') {
                setIsDark(e.matches);
                applyTheme('system');
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [theme]);

    const applyTheme = (newTheme: Theme) => {
        const root = document.documentElement;

        if (newTheme === 'dark' || (newTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            root.classList.add('dark');
            setIsDark(true);
        } else {
            root.classList.remove('dark');
            setIsDark(false);
        }
    };

    const setThemeMode = (newTheme: Theme) => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    };

    const toggleTheme = () => {
        const newTheme = isDark ? 'light' : 'dark';
        setThemeMode(newTheme);
    };

    return {
        theme,
        isDark,
        setTheme: setThemeMode,
        toggleTheme
    };
} 