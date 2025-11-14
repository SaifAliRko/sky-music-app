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
│   ├── api/
│   │   └── albums/               # API routes (CORS proxy for iTunes)
│   │       ├── route.ts          # GET /api/albums - Fetch top 100 albums
│   │       └── [id]/route.ts     # GET /api/albums/[id] - Fetch album details & tracks
│   ├── albums/page.tsx           # Browse albums (uses useFilteredAndSortedAlbums hook)
│   ├── album/[id]/page.tsx       # Album details with tracks (Redux-based)
│   ├── favorites/page.tsx        # Favorites list (persisted in localStorage)
│   └── layout.tsx                # Root layout + Redux Provider
│
├── components/                   # React components (all with separated styles)
│   ├── Header.tsx / Header.styles.ts
│   ├── Footer.tsx / Footer.styles.ts
│   ├── AlbumCard.tsx / AlbumCard.styles.ts
│   ├── AlbumGrid.tsx / AlbumGrid.styles.ts
│   ├── SearchBar.tsx / SearchBar.styles.ts
│   ├── SortBar.tsx / SortBar.styles.ts
│   ├── FavoritesToggle.tsx / FavoritesToggle.styles.ts
│   ├── LoadingSkeletons.tsx
│   ├── LoadingSpinner.tsx / LoadingSpinner.styles.ts
│   ├── AlbumDetail.styles.ts     # Album detail page styles
│   └── __tests__/                # Component tests
│
├── hooks/                        # Custom React hooks
│   ├── useAlbums.ts              # useFilteredAndSortedAlbums, useFavoriteAlbums, useIsFavorite, theme/ui hooks
│   └── index.ts                  # Hook exports
│
├── lib/                          # Utilities & API functions
│   ├── api.ts                    # iTunes API calls + wrapper for API routes
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
│       ├── uiSlice.ts            # UI state (theme, search, sort)
│       └── __tests__/            # Redux tests
│
├── styles/                       # Styling (100% styled-components)
│   ├── GlobalStyle.ts            # Global styles & reset
│   ├── styled.d.ts               # TypeScript definitions for styled-components
│   └── theme.ts                  # Light/dark theme definitions
│
├── utils/                        # Pure utility functions
│   ├── index.ts                  # Barrel export
│   └── search.ts                 # filterBySearchQuery, sortAlbums, filterAndSortAlbums
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

The project has been refactored for maintainability, scalability, and proper Redux Toolkit integration:

### ✨ Key Improvements
- **100% styled-components**: All CSS moved from components to dedicated `.styles.ts` files
- **Custom Hooks**: Extracted `useFilteredAndSortedAlbums`, `useFavoriteAlbums`, `useIsFavorite` for reusability
- **Utility Functions**: Centralized filtering, sorting, and common helpers in `/utils`

- **Redux State Management**: Properly integrated Redux Toolkit with async thunks for all API calls
- **API Routes**: Created Next.js API routes at `/api/albums` and `/api/albums/[id]` to proxy iTunes API (avoiding CORS on client)
- **Album Details**: Dedicated Redux slice (`albumDetailsSlice`) for track management with `fetchAlbumTracks` async thunk
- **Cleaner Components**: Components focused on logic, styles extracted to dedicated files
- **Better Organization**: Hooks, utilities, styles, and API routes properly separated and indexed

### 📦 Redux Integration
- **`albumsSlice`**: Manages top 100 albums with `fetchAlbums` async thunk
- **`albumDetailsSlice`**: Manages album tracks with `fetchAlbumTracks` async thunk
- **`favoritesSlice`**: Manages saved albums with localStorage persistence
- **`uiSlice`**: Manages UI state (theme, search, sort)

### 📂 New Files & Directories
- `src/hooks/` - Custom React hooks
- `src/utils/` - Pure utility functions
- `src/styles/ui/` - Reusable UI component styles
- `src/app/api/albums/route.ts` - API endpoint for top albums
- `src/app/api/albums/[id]/route.ts` - API endpoint for album details
- `src/store/slices/albumDetailsSlice.ts` - Redux slice for tracks

### 📄 Files Removed
- `src/app/page.module.css` - Replaced with styled-components

### 📄 Files Removed
- `src/app/page.module.css` - No longer needed, replaced with styled-components
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
