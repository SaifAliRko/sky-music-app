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
├── app/                    # Next.js pages
│   ├── albums/page.tsx     # Browse albums
│   ├── album/[id]/page.tsx # Album details
│   ├── favorites/page.tsx  # Favorites list
│   └── layout.tsx          # Root layout + providers
├── components/             # React components (Header, SearchBar, AlbumCard, etc.)
├── lib/                    # Utilities (api.ts, storage.ts, types)
├── store/                  # Redux slices (albums, favorites, ui)
└── styles/                 # Theme & styled-components
```

## ✅ Testing

```bash
npm test              # Run all tests once
npm run test:coverage    # Coverage report
```

**Coverage**: Component tests, Redux tests, and utility tests ensuring core functionality works correctly
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
