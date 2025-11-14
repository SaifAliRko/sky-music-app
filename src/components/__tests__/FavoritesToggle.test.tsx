import { lightTheme } from '@/styles/theme';
import { createTestStore } from '@/utils/test-store';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { FavoritesToggle } from '../FavoritesToggle/FavoritesToggle';

describe('FavoritesToggle', () => {
  it('renders the favorite button', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <FavoritesToggle albumId="test-album-1" />
        </ThemeProvider>
      </Provider>
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('shows heart emoji when not favorited', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <FavoritesToggle albumId="test-album-1" showLabel={false} />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText('🤍')).toBeInTheDocument();
  });

  it('toggles favorite on button click', async () => {
    const store = createTestStore();
    const { rerender } = render(
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <FavoritesToggle albumId="test-album-1" />
        </ThemeProvider>
      </Provider>
    );

    const button = screen.getByRole('button');

    // Click to add to favorites
    fireEvent.click(button);

    // Rerender with updated store
    rerender(
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <FavoritesToggle albumId="test-album-1" />
        </ThemeProvider>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/❤️.*Favorited/)).toBeInTheDocument();
    });
  });

  it('shows label when showLabel prop is true', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <FavoritesToggle albumId="test-album-1" showLabel={true} />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText(/Add to Favorites/i)).toBeInTheDocument();
  });

  it('hides label when showLabel prop is false', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <FavoritesToggle albumId="test-album-1" showLabel={false} />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.queryByText(/Add to Favorites/i)).not.toBeInTheDocument();
  });

  it('shows Favorited text when album is in favorites', () => {
    const store = createTestStore();

    // Add to favorites first
    store.dispatch({ type: 'favorites/addFavorite', payload: 'test-album-1' });

    render(
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <FavoritesToggle albumId="test-album-1" showLabel={true} />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText(/Favorited/i)).toBeInTheDocument();
  });

  it('has correct title attribute', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <FavoritesToggle albumId="test-album-1" />
        </ThemeProvider>
      </Provider>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('title', 'Toggle favorite');
  });
});
