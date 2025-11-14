'use client';

import { FooterContent, FooterWrapper, Link } from './Footer.styles';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <FooterWrapper>
      <FooterContent>
        <p>
          🎵 Sky Music © {currentYear} |{' '}
          <Link href="https://itunes.apple.com" target="_blank" rel="noopener noreferrer">
            Powered by iTunes API
          </Link>
        </p>
      </FooterContent>
    </FooterWrapper>
  );
}
