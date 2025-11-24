/**
 * LocalStorage utility functions for persisting data
 */

const FAVORITES_KEY = 'sky_music_favorites';
const THEME_KEY = 'sky_music_theme';

const isClient = () => typeof window !== 'undefined';

const getItem = (key: string): string | null => {
  if (!isClient()) return null;
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error('Error reading from storage:', error);
    return null;
  }
};

const setItem = (key: string, value: string): void => {
  if (!isClient()) return;
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error('Error saving to storage:', error);
  }
};

const removeItem = (key: string): void => {
  if (!isClient()) return;
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from storage:', error);
  }
};

/** Get favorite album IDs from localStorage, deduplicated */
export const getFavorites = (): string[] => {
  try {
    const data = getItem(FAVORITES_KEY);
    if (!data?.trim()) return [];

    const parsed = JSON.parse(data);
    const favorites = Array.isArray(parsed)
      ? parsed.filter((id): id is string => typeof id === 'string' && id.length > 0)
      : [];

    // Deduplicate and save if changed
    const deduplicated = Array.from(new Set(favorites));
    if (deduplicated.length !== favorites.length) {
      setItem(FAVORITES_KEY, JSON.stringify(deduplicated));
    }
    return deduplicated;
  } catch {
    removeItem(FAVORITES_KEY);
    return [];
  }
};

/** Save favorite album IDs to localStorage */
export const saveFavorites = (favorites: string[]): void => {
  const deduplicated = Array.from(new Set(favorites));
  setItem(FAVORITES_KEY, JSON.stringify(deduplicated));
};

/** Get theme preference from localStorage */
export const getTheme = (): 'light' | 'dark' => {
  try {
    const theme = getItem(THEME_KEY);
    return theme === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
};

/** Save theme preference to localStorage */
export const saveTheme = (theme: 'light' | 'dark'): void => {
  setItem(THEME_KEY, theme);
};