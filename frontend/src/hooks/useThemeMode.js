import { useState, useEffect } from 'react';

const THEME_KEY = 'app-theme-mode';
const listeners = new Set();

let currentTheme = localStorage.getItem(THEME_KEY) || 'dark'; // defaulting to dark

const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
};

const notify = () => {
    for (let listener of listeners) {
        listener(currentTheme);
    }
};

export const useThemeMode = () => {
    const [theme, setThemeState] = useState(currentTheme);

    useEffect(() => {
        const unsubscribe = subscribe(setThemeState);
        return () => unsubscribe();
    }, []);

    const setTheme = (newTheme) => {
        currentTheme = newTheme;
        localStorage.setItem(THEME_KEY, newTheme);
        notify();
    };

    const toggleTheme = () => {
        setTheme(currentTheme === 'light' ? 'dark' : 'light');
    };

    return { theme, setTheme, toggleTheme, isDarkMode: theme === 'dark' };
};
