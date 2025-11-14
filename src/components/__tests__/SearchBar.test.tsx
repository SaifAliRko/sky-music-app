import albumsReducer from '@/store/slices/albumsSlice';
import favoritesReducer from '@/store/slices/favoritesSlice';
import uiReducer from '@/store/slices/uiSlice';
import { lightTheme } from '@/styles/theme';
import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { SearchBar } from '../SearchBar';

// Create a test store
function createTestStore() {
  return configureStore({
    reducer: {
      favorites: favoritesReducer,
      ui: uiReducer,
      albums: albumsReducer,
    },
  });
}

describe('SearchBar', () => {
  it('renders search input', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <SearchBar />
        </ThemeProvider>
      </Provider>
    );

    const input = screen.getByPlaceholderText('Search albums by name, artist...');
    expect(input).toBeInTheDocument();
  });

  it('updates search query on input change', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <SearchBar />
        </ThemeProvider>
      </Provider>
    );

    const input = screen.getByPlaceholderText(
      'Search albums by name, artist...'
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'test album' } });

    expect(input.value).toBe('test album');
  });

  it('renders clear button when there is search text', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <SearchBar />
        </ThemeProvider>
      </Provider>
    );

    const input = screen.getByPlaceholderText('Search albums by name, artist...') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test' } });
    
    const clearButton = screen.getByText('✕');
    expect(clearButton).toBeInTheDocument();
  });

  it('clears search when clear button is clicked', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <SearchBar />
        </ThemeProvider>
      </Provider>
    );

    const input = screen.getByPlaceholderText(
      'Search albums by name, artist...'
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'test album' } });
    expect(input.value).toBe('test album');

    const clearButton = screen.getByText('✕');
    fireEvent.click(clearButton);
    expect(input.value).toBe('');
  });

  it('has correct input type', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <SearchBar />
        </ThemeProvider>
      </Provider>
    );

    const input = screen.getByPlaceholderText('Search albums by name, artist...');
    expect(input).toHaveAttribute('type', 'text');
  });

  it('renders with initial empty value', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <SearchBar />
        </ThemeProvider>
      </Provider>
    );

    const input = screen.getByPlaceholderText(
      'Search albums by name, artist...'
    ) as HTMLInputElement;
    expect(input.value).toBe('');
  });
});
