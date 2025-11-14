# 🎵 Sky Music - Album Browser

A modern, responsive music album discovery application built with Next.js, React, Redux, and TypeScript. Browse top albums from iTunes, save favorites, and toggle between dark/light modes.

**[🌐 Live Demo](https://sky-music-steel.vercel.app/albums)** | **[📖 Feature Documentation](FEATURE.md)** | Status: ✅ Production Ready

## ✨ Features Overview

| Feature | Description |
|---------|-------------|
| 🔍 **Search** | Real-time search by album name or artist |
| � **Browse** | Top 100 albums from iTunes API in responsive grid |
| � **Sort** | Sort by name/date/price |
| ❤️ **Favorites** | Save favorite albums with one click, persistent |
| 📱 **Album Details** | Complete track listing with durations |
| � **Dark/Light Mode** | Theme toggle with preference saved |
| � **Responsive** | Mobile-first design, works on all devices |
| ⚡ **Fast** | Client-side operations, instant feedback |


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

## 🎯 How to Use

### Browse Albums
1. Home page automatically loads top 100 albums
2. Scroll through responsive grid
3. Click any album to view tracks and details

### Search & Sort
- **Search**: Type album name or artist for instant results
- **Sort**: Change order by name, release date, or price

### Manage Favorites
- Click heart icon (❤️/🤍) on album cards to toggle
- Favorites persist across browser sessions
- View all favorites on `/favorites` page or click Favorites button in header.
- Favorite count shown in header

### View Album Details
- Click album card to see:
  - Complete track listing with durations
  - Album artwork, genre, artist, price
  - Track-by-track information

### Toggle Theme
- Click theme button in header
- Preference automatically saved
- Light mode: clean white background
- Dark mode: comfortable dark background

## 📁 Project Structure

```
./
├── src/
│   ├── app/                          # Next.js pages
│   │   ├── layout.tsx                # Root layout + providers
│   │   ├── page.tsx                  # Home redirect
│   │   ├── albums/page.tsx           # Browse albums
│   │   ├── album/[id]/page.tsx       # Album detail + tracks
│   │   ├── favorites/page.tsx        # Favorite albums
│   │   ├── global.ts                 # Global types
│   │   └── globals.css               # CSS reset
│   │
│   ├── components/                   # React components
│   │   ├── Header.tsx                # Navigation & theme toggle
│   │   ├── Footer.tsx                # Footer
│   │   ├── AlbumCard.tsx             # Album card component
│   │   ├── AlbumGrid.tsx             # Responsive grid
│   │   ├── SearchBar.tsx             # Search input
│   │   ├── SortBar.tsx               # Sort & filter
│   │   └── __tests__/                # Component tests
│   │
│   ├── lib/                          # Utilities
│   │   ├── api.ts                    # iTunes API calls
│   │   ├── itunes.types.ts           # Type definitions
│   │   ├── parse.ts                  # Data normalization
│   │   ├── storage.ts                # localStorage helpers
│   │   └── __tests__/                # Utility tests
│   │
│   ├── store/                        # Redux store
│   │   ├── index.ts                  # Store config
│   │   ├── slices/
│   │   │   ├── albumsSlice.ts        # Albums state
│   │   │   ├── favoritesSlice.ts     # Favorites state
│   │   │   ├── uiSlice.ts            # UI state (theme)
│   │   │   └── __tests__/            # Redux tests
│   │
│   └── styles/                       # Styling
│       ├── theme.ts                  # Color & spacing
│       ├── mixins.ts                 # Reusable styles
│       └── styled.d.ts               # Type extensions
│
├── public/                           # Static assets
├── package.json                      # Dependencies
├── tsconfig.json                     # TypeScript config
├── next.config.ts                    # Next.js config
├── jest.config.js                    # Jest config
└── README.md                         # This file
```

## 🚀 Available Commands

```bash
npm run dev              # Start development server (port 3000)
npm run build            # Production build
npm start                # Start production server
npm run lint             # Run ESLint
npm test                 # Run Jest tests once
npm run test:watch       # Watch mode for tests
npm run test:coverage    # Generate coverage report
```

## ✅ Testing

Comprehensive test suite with 60+ tests:

```
Test Suites: 7 passed
Tests:       60 passed
Coverage:    Core features fully tested
```

Run tests with:
```bash
npm test              # Run all tests once
npm run test:coverage    # Coverage report
```

## 🌐 Browser Support

✅ Chrome/Edge 90+  
✅ Firefox 88+  
✅ Safari 14+  
✅ Mobile browsers (iOS Safari, Chrome Mobile)  

## 🏗️ Architecture

### State Management
- **Redux Toolkit**: Global state for albums, favorites, UI
- **localStorage**: Persistence for favorites and theme preference
- **useMemo**: Optimized filtering and sorting

### Data Flow
```
Component Action
    ↓
Redux Dispatch
    ↓
State Update + localStorage Save
    ↓
Components Re-render
    ↓
UI Updates
```

### API Integration
- **iTunes API**: Top 100 albums endpoint (public, no key needed)
- **Lookup API**: Detailed album info and tracks
- **Error Handling**: Graceful error states with user feedback
- **CORS**: Handled via JSONP

## 🎨 Design System

### Colors (Light Mode)
- Primary: Indigo (#6366f1)
- Secondary: Pink (#ec4899)
- Background: White
- Text: Dark gray

### Colors (Dark Mode)
- Primary: Indigo (#6366f1)
- Secondary: Pink (#ec4899)
- Background: Dark gray/black
- Text: Light gray

### Responsive Layout
- **Mobile**: 1-2 columns
- **Tablet**: 2-3 columns
- **Desktop**: 4-6 columns
- **Ultra-wide**: Up to 12 columns

## 🔒 Privacy & Security

- ✅ No server-side data storage
- ✅ Favorites stored locally in browser only
- ✅ No authentication required
- ✅ No tracking or analytics
- ✅ Direct API calls to iTunes (no intermediary)

## 📱 Mobile Optimization

- Responsive grid layout (1-12 columns)
- Lazy loading images
- Mobile-first CSS design
- Proper viewport configuration

## 🐛 Troubleshooting

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

### Clear cache and reinstall
```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors
```bash
rm -rf .next
npm run dev
```

## � Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Redux Toolkit Docs](https://redux-toolkit.js.org)
- [Styled Components Docs](https://styled-components.com/docs)
- [iTunes Search API](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/)

## 📖 Documentation

- **[Feature Documentation](FEATURE.md)** - Detailed feature guide

## 🚀 Deployment

### Live Deployment
✅ **[Live Demo](https://sky-music-steel.vercel.app/albums)** - Currently deployed on Vercel


## 📝 License

This project is part of a technical interview assignment for Sky Germany.

## ✨ Summary

Sky Music provides a **clean, fast, and intuitive** music discovery experience with:
- ⚡ Instant search and filtering
- ❤️ One-click favorites with persistence
- 🌓 Beautiful dark/light themes
- 📱 Responsive design for all devices
- 🧪 Comprehensive test coverage (60+ tests)
- 🛡️ Type-safe with full TypeScript
- 📚 Well-documented and maintainable code

**Production ready, fully tested, and optimized for performance.**
