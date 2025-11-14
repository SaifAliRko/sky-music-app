import { Album } from '@/lib/itunes.types';
import { lightTheme } from '@/styles/theme';
import { createTestStore } from '@/test-utils/store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { AlbumCard } from '../AlbumCard';

const mockAlbum: Album = {
  id: 'test-album-1',
  name: 'Test Album',
  artist: 'Test Artist',
  image: 'https://example.com/image.jpg',
  price: '$9.99',
  genre: 'Alternative',
  url: 'https://music.apple.com/album',
  releaseDate: '2024-01-01',
};

describe('AlbumCard', () => {
  it('renders album card with album information', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <AlbumCard album={mockAlbum} />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText('Test Album')).toBeInTheDocument();
    expect(screen.getByText('Test Artist')).toBeInTheDocument();
  });

  it('displays album image', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <AlbumCard album={mockAlbum} />
        </ThemeProvider>
      </Provider>
    );

    const image = screen.getByAltText('Test Album');
    expect(image).toBeInTheDocument();
  });

  it('displays genre category', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <AlbumCard album={mockAlbum} />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText('Alternative')).toBeInTheDocument();
  });

  it('displays price', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <AlbumCard album={mockAlbum} />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText('$9.99')).toBeInTheDocument();
  });

  it('renders favorites toggle button', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <AlbumCard album={mockAlbum} />
        </ThemeProvider>
      </Provider>
    );

    const button = screen.getByTitle('Toggle favorite');
    expect(button).toBeInTheDocument();
  });

  it('renders link to album detail page', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <AlbumCard album={mockAlbum} />
        </ThemeProvider>
      </Provider>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/album/test-album-1');
  });

  it('displays all required metadata', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <AlbumCard album={mockAlbum} />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText('Test Album')).toBeInTheDocument();
    expect(screen.getByText('Test Artist')).toBeInTheDocument();
    expect(screen.getByText('Alternative')).toBeInTheDocument();
    expect(screen.getByText('$9.99')).toBeInTheDocument();
  });
});
