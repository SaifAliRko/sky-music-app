import { getFavorites, getTheme, saveFavorites, saveTheme } from '../storage';

// Clear mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
  (localStorage.getItem as jest.Mock).mockReturnValue(null);
});

describe('Storage Utilities', () => {
  describe('getFavorites', () => {
    it('should return empty array when no favorites are stored', () => {
      (localStorage.getItem as jest.Mock).mockReturnValue(null);
      const result = getFavorites();
      expect(result).toEqual([]);
    });

    it('should return parsed favorites from localStorage', () => {
      const mockFavorites = ['id1', 'id2', 'id3'];
      (localStorage.getItem as jest.Mock).mockReturnValue(
        JSON.stringify(mockFavorites)
      );
      const result = getFavorites();
      expect(result).toEqual(mockFavorites);
    });

    it('should return empty array when localStorage throws an error', () => {
      (localStorage.getItem as jest.Mock).mockImplementation(() => {
        throw new Error('Storage error');
      });
      const result = getFavorites();
      expect(result).toEqual([]);
    });

    it('should return empty array when window is undefined', () => {
      const originalWindow = global.window;
      // @ts-expect-error - Intentionally deleting window for testing SSR behavior
      delete global.window;
      const result = getFavorites();
      expect(result).toEqual([]);
      global.window = originalWindow;
    });
  });

  describe('saveFavorites', () => {
    it('should save favorites to localStorage', () => {
      const mockFavorites = ['id1', 'id2', 'id3'];
      saveFavorites(mockFavorites);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'sky_music_favorites',
        JSON.stringify(mockFavorites)
      );
    });

    it('should handle localStorage errors gracefully', () => {
      (localStorage.setItem as jest.Mock).mockImplementation(() => {
        throw new Error('Storage error');
      });
      expect(() => saveFavorites(['id1'])).not.toThrow();
    });

    it('should not throw when window is undefined', () => {
      const originalWindow = global.window;
      // @ts-expect-error - Intentionally deleting window for testing SSR behavior
      delete global.window;
      expect(() => saveFavorites(['id1'])).not.toThrow();
      global.window = originalWindow;
    });
  });

  describe('getTheme', () => {
    it('should return light theme by default', () => {
      (localStorage.getItem as jest.Mock).mockReturnValue(null);
      const result = getTheme();
      expect(result).toBe('light');
    });

    it('should return dark theme when stored', () => {
      (localStorage.getItem as jest.Mock).mockReturnValue('dark');
      const result = getTheme();
      expect(result).toBe('dark');
    });

    it('should return light theme for any invalid value', () => {
      (localStorage.getItem as jest.Mock).mockReturnValue('invalid');
      const result = getTheme();
      expect(result).toBe('light');
    });

    it('should return light theme when localStorage throws an error', () => {
      (localStorage.getItem as jest.Mock).mockImplementation(() => {
        throw new Error('Storage error');
      });
      const result = getTheme();
      expect(result).toBe('light');
    });
  });

  describe('saveTheme', () => {
    it('should save light theme to localStorage', () => {
      saveTheme('light');
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'sky_music_theme',
        'light'
      );
    });

    it('should save dark theme to localStorage', () => {
      saveTheme('dark');
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'sky_music_theme',
        'dark'
      );
    });

    it('should handle localStorage errors gracefully', () => {
      (localStorage.setItem as jest.Mock).mockImplementation(() => {
        throw new Error('Storage error');
      });
      expect(() => saveTheme('dark')).not.toThrow();
    });

    it('should not throw when window is undefined', () => {
      const originalWindow = global.window;
      // @ts-expect-error - Intentionally deleting window for testing SSR behavior
      delete global.window;
      expect(() => saveTheme('dark')).not.toThrow();
      global.window = originalWindow;
    });
  });
});
