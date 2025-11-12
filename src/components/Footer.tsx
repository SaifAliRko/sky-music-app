'use client';

import { FooterContent, FooterWrapper } from './Footer.styles';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <FooterWrapper>
      <FooterContent>
        <p>
          🎵 Sky Music © {currentYear} |{' '}
          <a href="https://itunes.apple.com" target="_blank" rel="noopener noreferrer">
            Powered by iTunes API
          </a>
        </p>
      </FooterContent>
    </FooterWrapper>
  );
}
