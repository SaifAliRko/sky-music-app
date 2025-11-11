require('@testing-library/jest-dom');

// Suppress expected console errors from test cases
const originalError = console.error;
console.error = (...args) => {
  const errorMessage = typeof args[0] === 'string' ? args[0] : '';
  
  // Suppress Next.js dynamic component warning
  if (errorMessage.includes('An update to ForwardRef(LoadableComponent) inside a test was not wrapped in act')) {
    return;
  }
  
  // Suppress expected error messages from test cases that intentionally test error handling
  if (errorMessage.includes('Error reading') || 
      errorMessage.includes('Error saving') ||
      errorMessage.includes('Storage error')) {
    return;
  }
  
  originalError.call(console, ...args);
};

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: () => null,
}));

// Need React for JSX
const React = require('react');

// Mock next/link
jest.mock('next/link', () => {
  const MockLink = ({ children, href, title, ...props }) => 
    React.createElement('a', { href, title, ...props }, children);
  MockLink.displayName = 'MockLink';
  return MockLink;
});

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}));

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
});
