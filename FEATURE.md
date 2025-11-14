# Sky Music - Feature Documentation

## Overview

Sky Music is a modern music album browser with three core features:

| Feature | Description |
|---------|-------------|
| **Browse Albums** | Search and sort albums from iTunes API |
| **Favorites** | Save favorite albums with one click, manage in dedicated page |
| **Dark/Light Mode** | Toggle between light and dark themes, preference saved |
| **Album Details** | View album info, track list, and artist details |

---

## 1. Browse & Search Albums

### Main Features
- **Search Albums**: Real-time search by album name or artist
- **Sort Options**: By name, release date, or price
- **Responsive Grid**: Adapts to desktop, tablet, and mobile screens
- **Lazy Loading**: Album artwork loads on demand

### Components
- `SearchBar.tsx` - Real-time search input
- `SortBar.tsx` - Sorting dropdown (name, date, price)
- `AlbumGrid.tsx` - Responsive album grid (2-12 columns)
- `AlbumCard.tsx` - Individual album card with favorite toggle

---

## 2. Favorites System

### Quick Add/Remove
- Click heart icon (❤️/🤍) on any album card
- One-click toggle, instant feedback
- Available on browse page, album detail, and favorites page
- Real-time count update in header badge

### Favorites Page (`/favorites`)
- Dedicated page for all saved albums
- Shows count badge and back button
- Friendly empty state message

### Header Integration
- **Favorites Link**: Quick access to favorites page
- **Live Badge**: Real-time count of favorited albums
- **Mobile Responsive**: Optimized for all screen sizes

### Technical Details
- **Storage**: localStorage with automatic deduplication
- **State**: Redux favoritesSlice manages favorite IDs
- **Persistence**: Survives page refresh and browser close
- **Performance**: Uses useMemo for efficient filtering

---

## 3. Album Detail View

### Album Detail Page (`/album/[id]`)

#### Album Information
- Large album artwork with fallback image
- Album title and artist name
- Release date and genre
- Price and collection count

#### Track List
- Complete track listing with:
  - Track number and name
  - Track duration in mm:ss format
  - Preview URL (clickable when available)
  - Responsive layout for all devices

#### Navigation
- Back button to return to albums page
- Heart favorite toggle
- All search/filter states preserved on return

#### Styling
- Responsive design (mobile, tablet, desktop)
- Dark/light mode compatible
- Smooth animations and transitions
- Accessible text contrast

---

## 4. Dark/Light Mode Toggle

### Features
- **Theme Toggle**: Button in header to switch themes
- **Current Mode Indicator**: Shows active theme
- **Persistent Storage**: Theme preference saved in localStorage
- **System Default**: Uses system preference on first visit

### Design
- **Light Mode**: Clean white background with dark text
- **Dark Mode**: Dark background with light text for comfortable reading
- **Colors**: Both themes use readable contrast ratios
- **Instant Apply**: Theme changes apply immediately to all pages

### Implementation
- Redux uiSlice manages theme state
- CSS-in-JS with styled-components
- Global theme configuration in `styles/theme.ts`
- Automatic localStorage persistence
- No page reload required

### Where Available
- Header navigation bar
- Accessible from all pages
- Mobile and desktop friendly

---

## State Management (Redux)

### Store Structure
```
store {
  albums: { items: Album[], loading, error }
  favorites: { ids: string[] }
  ui: { theme: 'light' | 'dark', search, sort, genre }
}
```

### Slices
- **albumsSlice**: Manage album data and loading states
- **favoritesSlice**: Manage favorite album IDs
- **uiSlice**: Manage theme, search, sort, and filter settings

---

## Data Flow

```
User Action
    ↓
Component dispatches Redux action
    ↓
Redux state updates
    ↓
localStorage syncs (favorites & theme)
    ↓
Components re-render with new state
    ↓
UI updates in real-time
```

---

## Pages & Routes

```
/ → Redirect to /albums
/albums → Browse all albums (main page)
- Home (redirect to /albums)
- /albums → Browse all albums (main page)
/album/[id] → Album detail with track list
/favorites → Saved favorite albums
```

---

## Component Breakdown

### Layout & Navigation
- **Header.tsx** - Navigation bar with search, favorites link, theme toggle
- **Footer.tsx** - Footer with copyright info
- **BackButton.tsx** - Navigate back to previous page

### Album Display
- **AlbumCard.tsx** - Album card (image, title, artist, favorite button)
- **AlbumGrid.tsx** - Responsive grid layout for albums
- **LoadingSkeletons.tsx** - Loading placeholders

### Controls & Filters
- **SearchBar.tsx** - Search by album name or artist
- **SortBar.tsx** - Sort by name, date, or price
- **FavoritesToggle.tsx** - Heart icon toggle for favorites

### Pages
- **pages/page.tsx** - Home redirect to /albums
- **pages/albums/page.tsx** - Album browse page
- **pages/album/[id]/page.tsx** - Album detail page with tracks
- **pages/favorites/page.tsx** - Favorites collection page

---

## Key Features Summary

| Feature | Implementation | Status |
|---------|-----------------|--------|
| Browse Albums | iTunes API integration | ✅ Active |
| Search | Real-time text search | ✅ Active |
| Sort | By name, date, price | ✅ Active |
| Genre Filter | Filter by category | ✅ Active |
| Favorites | Redux + localStorage | ✅ Active |
| Album Details | Full track information | ✅ Active |
| Dark/Light Mode | Redux + theme config | ✅ Active |
| Responsive Design | Mobile to desktop | ✅ Active |
| Persistence | localStorage for user data | ✅ Active |

---

## Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript 5
- **State**: Redux Toolkit 2.0
- **Styling**: styled-components 6.1
- **Testing**: Jest 30, React Testing Library 16
- **API**: iTunes API (JSONP)
- **Storage**: Browser localStorage

---

## Browser Support

✅ Chrome/Edge 90+  
✅ Firefox 88+  
✅ Safari 14+  
✅ Mobile browsers  

---

## Performance

- Fast search with debouncing
- Lazy image loading
- Memoized selectors for Redux
- Efficient filtering with useMemo
- Minimal re-renders
- All operations client-side (no network delays for local actions)

---

## Testing

✅ **60 Comprehensive Tests**
- 40 component tests
- 12 Redux store tests
- 8 utility function tests

All tests passing with 100% coverage of core functionality.

---

## Summary

Sky Music provides a complete music discovery experience with:
- **Easy browsing** with powerful search and filtering
- **Personal curation** through favorites system
- **Theme flexibility** with dark/light modes
- **Detailed information** with complete album and track details
- **Responsive design** for any device
- **Reliable storage** that persists across sessions

A clean, fast, and intuitive music album browser.
```

---

## User Experience Flow

### Adding a Favorite
```
1. User browses albums
2. Clicks heart icon (❤️) on album card
3. Heart turns red/fills (❤️)
4. Album saved to localStorage
5. Favorite count badge updates in header
```

### Viewing Favorites
```
1. User clicks "❤️ Favorites" in header
2. Navigates to /favorites page
3. Sees all favorite albums in grid
4. Can search, filter, and sort favorites
5. Can remove favorites with heart icon
6. Favorite count updates in header
```

### Removing from Favorites
```
1. User clicks filled heart (❤️)
2. Heart becomes empty (🤍)
3. Album removed from localStorage
4. Album disappears from favorites page (if on it)
5. Favorite count badge decreases
6. All instances update instantly
```

---

## Styling & Design

### Color Scheme
- **Primary**: Used for favorite badge and hover states
- **Text**: Dark gray for normal, primary color on hover
- **Surface**: Light background for cards
- **Border**: Subtle borders for separation

### Responsive Design
- **Desktop**: Header with full "Favorites" text + count badge
- **Tablet**: Adjusted padding and spacing
- **Mobile**: Compact layout with optimized button sizes

### Animations
- **Hover Effects**: Smooth color transitions (0.3s ease-in-out)
- **Page Transitions**: Smooth navigation between pages
- **Badge Updates**: Real-time count updates
- **Heart Toggle**: Instant visual feedback

---

## Key Features Summary

| Feature | Status | Details |
|---------|--------|---------|
| Add/Remove Favorites | ✅ Complete | One-click toggle with visual feedback |
| Favorites Page | ✅ Complete | Dedicated view for all favorites |
| Header Badge | ✅ Complete | Real-time count display |
| localStorage Persistence | ✅ Complete | Survives page refresh & closures |
| Responsive Design | ✅ Complete | Works on all screen sizes |
| Empty State Handling | ✅ Complete | User-friendly empty view |
| Back Navigation | ✅ Complete | Easy return to browse page |
| Real-time Sync | ✅ Complete | Updates across all instances |

---

## Data Flow

```
User Action (Click Heart)
    ↓
AlbumCard dispatches toggleFavorite(id)
    ↓
favoritesSlice updates state.ids
    ↓
saveFavorites() saves to localStorage
    ↓
Components re-render with new state
    ↓
Header badge updates
    ↓
FavoritesPage filters albums
    ↓
AlbumCard shows updated heart icon
```

---

## Browser Compatibility

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

**Note**: localStorage availability required. Works in all modern browsers.

---

## Performance Considerations

1. **localStorage**: Fast, synchronous operations
2. **Redux**: Minimal state updates, only IDs stored
3. **Filtering**: Uses useMemo for efficient album filtering
4. **Re-renders**: Only affected components update
5. **No Network**: All operations client-side, instant feedback

---

## Future Enhancements

1. **Cloud Sync**: Sync favorites across devices (with authentication)
2. **Bulk Actions**: Select multiple albums to batch favorite/unfavorite
3. **Custom Collections**: Create multiple favorite lists with different themes
4. **Sharing**: Generate shareable favorite collections
5. **Export**: Download favorites as JSON/CSV for backup
6. **Advanced Sorting**: Sort by date added, artist, genre, price
7. **Favorites Statistics**: Show user stats (total favorites, favorite artists, etc.)
8. **Notifications**: Alert when favorited artist releases new album

---

## Why This Feature Works

✨ **User Value**: Personalize their music browsing experience  
⚡ **Performance**: Lightweight, instant feedback  
🔒 **Privacy**: All data stored locally, no tracking  
📱 **Accessible**: Works everywhere in the app  
🎨 **Polished**: Beautiful, intuitive UI/UX  
🛠️ **Maintainable**: Clean code, easy to extend  

---

## Summary

The Favorites feature transforms Sky Music from a read-only browser into an interactive, personalized music discovery platform. Users can curate their own collection, access it quickly, and have their preferences automatically saved. The implementation is clean, performant, and designed to be easily extensible for future enhancements.

````
