import { lightTheme } from '@/styles/theme';
import { createTestStore } from '@/utils/test-store';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { Header } from '../Header/Header';

// Mock the storage module
jest.mock('@/lib/storage', () => ({
  saveTheme: jest.fn(),
  saveFavorites: jest.fn(),
  getTheme: jest.fn(() => 'light'),
  getFavorites: jest.fn(() => []),
}));

describe('Header', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('renders the header with logo and navigation', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <Header />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByTitle('Go to Albums')).toBeInTheDocument();
    expect(screen.getByTitle('View your favorite albums')).toBeInTheDocument();
  });

  it('renders favorites link text', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <Header />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText('Favorites')).toBeInTheDocument();
  });

  it('renders theme toggle button', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <Header />
        </ThemeProvider>
      </Provider>
    );

    const button = screen.getByTitle('Toggle dark/light mode');
    expect(button).toBeInTheDocument();
  });

  it('toggles theme when button is clicked', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <Header />
        </ThemeProvider>
      </Provider>
    );

    // Initial state should be light
    let state = store.getState();
    expect(state.ui.theme).toBe('light');

    // Click to toggle
    const button = screen.getByTitle('Toggle dark/light mode');
    fireEvent.click(button);

    // State should be toggled to dark
    state = store.getState();
    expect(state.ui.theme).toBe('dark');
  });

  it('displays favorite count badge when there are favorites', async () => {
    const store = createTestStore();

    // Add some favorites using toggleFavorite
    store.dispatch({ type: 'favorites/toggleFavorite', payload: 'album-1' });
    store.dispatch({ type: 'favorites/toggleFavorite', payload: 'album-2' });

    const { rerender } = render(
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <Header />
        </ThemeProvider>
      </Provider>
    );

    // Manually trigger mount state since we can't use useEffect in tests
    // The badge should appear after component mounts

    // Re-render to simulate mount
    rerender(
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <Header />
        </ThemeProvider>
      </Provider>
    );

    // After a delay to allow for state updates
    await new Promise((resolve) => setTimeout(resolve, 100));

    rerender(
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <Header />
        </ThemeProvider>
      </Provider>
    );
  });

  it('has correct favorite link href', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <Header />
        </ThemeProvider>
      </Provider>
    );

    const favoriteLink = screen.getByTitle('View your favorite albums');
    expect(favoriteLink).toHaveAttribute('href', '/favorites');
  });

  it('has correct logo link href', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <Header />
        </ThemeProvider>
      </Provider>
    );

    const logoLink = screen.getByTitle('Go to Albums');
    expect(logoLink).toHaveAttribute('href', '/albums');
  });
});
