import { lightTheme } from '@/styles/theme';
import { createTestStore } from '@/test-utils/store';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { SortBar } from '../SortBar';

describe('SortBar', () => {
  it('renders sort dropdown', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <SortBar />
        </ThemeProvider>
      </Provider>
    );

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
  });

  it('has correct sort options', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <SortBar />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByRole('option', { name: 'Album Name' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Artist Name' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Genre' })).toBeInTheDocument();
  });

  it('changes sort option when selected', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <SortBar />
        </ThemeProvider>
      </Provider>
    );

    const select = screen.getByRole('combobox') as HTMLSelectElement;
    fireEvent.change(select, { target: { value: 'artist' } });

    expect((select as HTMLSelectElement).value).toBe('artist');
  });

  it('renders with Album Name as default option', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <SortBar />
        </ThemeProvider>
      </Provider>
    );

    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('name');
  });

  it('has proper select element attributes', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <SortBar />
        </ThemeProvider>
      </Provider>
    );

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(select).toHaveAttribute('id', 'sort');
  });
});
