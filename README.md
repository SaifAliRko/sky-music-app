# 🎵 Sky Music - Album Browser

A modern, responsive music album discovery application built with Next.js, React, Redux, and TypeScript. Browse top albums from iTunes, save favorites, and toggle between dark/light modes.

**[🌐 Live Demo](https://sky-music-steel.vercel.app/albums)** | **[📖 Feature Documentation](FEATURE.md)** | Status: ✅ Production Ready

## ✨ Core Features

- 🎵 **Browse Top 100 Albums** - iTunes API integration
- 🔍 **Search** - Real-time search by album/artist
- 📊 **Sort** - By name, release date, or price
- ❤️ **Favorites** (Our Feature!) - Save albums with one click, persistent storage
- 📱 **Album Details** - Complete track information with durations
- 🌙 **Dark/Light Theme** - Persistent theme preference


## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 15, React 19, TypeScript 5 |
| **Styling** | styled-components 6.1 |
| **State** | Redux Toolkit 2.0 |
| **Testing** | Jest 30, React Testing Library 16 |
| **API** | iTunes API (public, no key needed) |
| **Storage** | Browser localStorage |

## 📦 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone repository
git clone <repo-url>

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

## 🎯 Usage

1. **Browse**: Home page loads top 100 albums from iTunes
2. **Search**: Type album name or artist for real-time results
3. **Filter**: Select genre or sort by name/date/price
4. **Favorites**: Click heart icon to save (stored in localStorage)
5. **Details**: Click album to view track list and info
6. **Theme**: Toggle dark/light mode in header

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout + Redux/Theme providers
│   ├── page.tsx                  # Home (redirects to /albums)
│   ├── not-found.tsx             # Custom 404 page
│   ├── providers.tsx             # Redux + ThemeProvider wrapper
│   │
│   ├── api/albums/               # API routes (CORS proxy for iTunes)
│   │   ├── route.ts              # GET /api/albums - Fetch top 100 albums
│   │   └── [id]/route.ts         # GET /api/albums/[id] - Fetch album details & tracks
│   │
│   ├── albums/                   # Albums page
│   │   ├── page.tsx              # Browse albums (client component with Redux)
│   │   └── styles/
│   │       └── albums.styles.ts  # Albums page styles
│   │
│   ├── album/[id]/               # Album detail page
│   │   ├── page.tsx              # Album details with tracks (Redux-based)
│   │   └── styles/
│   │       └── AlbumDetail.styles.ts
│   │
│   └── favorites/                # Favorites page
│       ├── page.tsx              # Favorites list (localStorage persisted)
│       └── styles/
│           └── favorites.styles.ts
│
├── components/                   # React components (organized in subfolders)
│   ├── AlbumCard/
│   │   ├── AlbumCard.tsx
│   │   ├── AlbumCard.styles.ts
│   │   └── index.ts
│   ├── AlbumGrid/
│   │   ├── AlbumGrid.tsx
│   │   ├── AlbumGrid.styles.ts
│   │   └── index.ts
│   ├── BackToAlbumsButton/
│   │   ├── BackToAlbumsButton.tsx
│   │   └── index.ts
│   ├── FavoritesToggle/
│   │   ├── FavoritesToggle.tsx
│   │   ├── FavoritesToggle.styles.ts
│   │   └── index.ts
│   ├── Footer/
│   │   ├── Footer.tsx
│   │   ├── Footer.styles.ts
│   │   └── index.ts
│   ├── Header/
│   │   ├── Header.tsx
│   │   ├── Header.styles.ts
│   │   └── index.ts
│   ├── LoadingSkeletons/
│   │   ├── LoadingSkeletons.tsx
│   │   ├── LoadingSkeletons.styles.ts
│   │   └── index.ts
│   ├── LoadingSpinner/
│   │   ├── LoadingSpinner.tsx
│   │   ├── LoadingSpinner.styles.ts
│   │   └── index.ts
│   ├── SearchBar/
│   │   ├── SearchBar.tsx
│   │   ├── SearchBar.styles.ts
│   │   └── index.ts
│   ├── SortBar/
│   │   ├── SortBar.tsx
│   │   ├── SortBar.styles.ts
│   │   └── index.ts
│   └── __tests__/                # Component tests (60+ tests)
│       ├── AlbumCard.test.tsx
│       ├── FavoritesToggle.test.tsx
│       ├── Header.test.tsx
│       ├── SearchBar.test.tsx
│       └── SortBar.test.tsx
│
├── hooks/                        # Custom React hooks + memoized selectors
│   ├── useAlbums.ts              # useFilteredAndSortedAlbums, useFavoriteAlbums, useIsFavorite
│   │                             # Also contains internal Redux selectors (createSelector)
│   ├── useFavoritesHydration.ts  # Hydrates favorites from localStorage on mount
│   └── index.ts                  # Hook exports
│
├── lib/                          # API functions & utilities
│   ├── api.ts                    # iTunes API calls (dual mode: client calls API routes, server calls direct)
│   ├── storage.ts                # localStorage helpers with validation
│   ├── parse.ts                  # Data normalization & parsing
│   ├── itunes.types.ts           # TypeScript types & interfaces
│   └── __tests__/                # Utility tests
│
├── store/                        # Redux store (Redux Toolkit)
│   ├── index.ts                  # Store config with all slices
│   └── slices/
│       ├── albumsSlice.ts        # Albums list + fetchAlbums async thunk
│       ├── albumDetailsSlice.ts  # Album tracks + fetchAlbumTracks async thunk
│       ├── favoritesSlice.ts     # Favorites management + localStorage sync
│       └── uiSlice.ts            # UI state (theme, search, sort)
│
├── styles/                       # Styling (100% styled-components)
│   ├── GlobalStyle.ts            # Global styles & CSS reset
│   ├── styled.d.ts               # TypeScript definitions for styled-components theme
│   └── theme.ts                  # Light/dark theme definitions
│
├── utils/                        # Pure utility functions
│   ├── index.ts                  # Barrel export
│   ├── search.ts                 # filterBySearchQuery, sortAlbums, filterAndSortAlbums
│   └── test-store.ts             # Test store helper (used by component tests)
│
└── public/                       # Static assets
```

## ✅ Testing

```bash
npm test              # Run all tests once
npm run test:coverage    # Coverage report
```

**Coverage**: Component tests, Redux tests, and utility tests ensuring core functionality works correctly

## 🔧 Refactoring & Code Quality

The project has been extensively refactored for maintainability, performance, and clean architecture:


### 🎯 Architecture Highlights
- **Co-location**: Selectors with hooks, styles with routes
- **Single responsibility**: Each file has one clear purpose
- **Clean imports**: Barrel exports for components and utilities
- **Type safety**: Full TypeScript coverage with proper types
## 🎯 Usage

1. **Browse**: Top 100 albums load automatically
2. **Search**: Type to filter by name/artist (real-time)
3. **Sort**: Choose by name, date, or price
4. **Favorites**: Click ❤️ to save albums
5. **Details**: Click album to view full track list
6. **Theme**: Toggle dark/light mode in header


## 📖 More Info

- **[Feature Documentation](FEATURE.md)** - Details about the Favorites feature



## � Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Redux Toolkit Docs](https://redux-toolkit.js.org)
- [Styled Components Docs](https://styled-components.com/docs)
- [iTunes Search API](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/)

## ✨ Summary

A complete music discovery app demonstrating:
- ✅ TypeScript best practices
- ✅ Clean component structure
- ✅ Redux state management
- ✅ Comprehensive testing (60+ tests)
- ✅ Responsive design
- ✅ Production-ready code

**Challenge Requirements Met**: Top 100 albums, clean modern UI, responsive design, cross-browser support, Next.js + styled-components + Redux, and a Favorites feature!

**Production ready, fully tested, and optimized for performance.**
