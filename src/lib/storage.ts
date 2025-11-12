/**
 * LocalStorage utility functions for persisting data
 */

const FAVORITES_KEY = 'sky_music_favorites';
const THEME_KEY = 'sky_music_theme';

/**
 * Get favorite album IDs from localStorage
 * Automatically deduplicates to prevent count mismatch issues
 */
export function getFavorites(): string[] {
  try {
    if (typeof window === 'undefined') {
      return [];
    }
    const data = localStorage.getItem(FAVORITES_KEY);
    let favorites: string[] = [];
    
    // Only parse if data exists and is not empty
    if (data && data.trim() !== '') {
      try {
        const parsed = JSON.parse(data);
        // Ensure it's an array and filter out null/undefined values
        if (Array.isArray(parsed)) {
          favorites = parsed.filter((id): id is string => typeof id === 'string' && id.length > 0);
        }
      } catch {
        // If JSON parsing fails, clear the corrupted data
        localStorage.removeItem(FAVORITES_KEY);
        return [];
      }
    }
    
    // Deduplicate on read to fix any corrupted data
    const deduplicated = Array.from(new Set(favorites));
    
    // If we had to deduplicate or filter, save the cleaned version
    if (deduplicated.length !== favorites.length || (data && deduplicated.length === 0)) {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(deduplicated));
    }
    
    return deduplicated;
  } catch (error) {
    console.error('Error reading favorites from storage:', error);
    return [];
  }
}

/**
 * Save favorite album IDs to localStorage
 * Automatically deduplicates to prevent count mismatch issues
 */
export function saveFavorites(favorites: string[]): void {
  try {
    if (typeof window === 'undefined') {
      return;
    }
    // Deduplicate before saving
    const deduplicated = Array.from(new Set(favorites));
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(deduplicated));
  } catch (error) {
    console.error('Error saving favorites to storage:', error);
  }
}

/**
 * Get theme preference from localStorage
 */
export function getTheme(): 'light' | 'dark' {
  try {
    if (typeof window === 'undefined') {
      return 'light';
    }
    const theme = localStorage.getItem(THEME_KEY);
    return theme === 'dark' ? 'dark' : 'light';
  } catch (error) {
    console.error('Error reading theme from storage:', error);
    return 'light';
  }
}

/**
 * Save theme preference to localStorage
 */
export function saveTheme(theme: 'light' | 'dark'): void {
  try {
    if (typeof window === 'undefined') {
      return;
    }
    localStorage.setItem(THEME_KEY, theme);
  } catch (error) {
    console.error('Error saving theme to storage:', error);
  }
}