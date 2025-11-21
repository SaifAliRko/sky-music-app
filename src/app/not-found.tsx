'use client';

import { Metadata } from 'next';
import {
    ErrorCode,
    ErrorMessage,
    ErrorTitle,
    HomeLink,
    NotFoundWrapper,
} from "./not-found.styles";

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: "The page you're looking for doesn't exist",
};

const NOT_FOUND_CONFIG = {
  code: '404',
  title: 'Page Not Found',
  message: "Oops! The page you're looking for doesn't exist. It might have been moved or deleted.",
  linkText: '🎵 Browse Albums',
  linkHref: '/albums',
};

export default function NotFound() {
  return (
    <NotFoundWrapper>
      <ErrorCode>{NOT_FOUND_CONFIG.code}</ErrorCode>
      <ErrorTitle>{NOT_FOUND_CONFIG.title}</ErrorTitle>
      <ErrorMessage>{NOT_FOUND_CONFIG.message}</ErrorMessage>
      <HomeLink href={NOT_FOUND_CONFIG.linkHref}>{NOT_FOUND_CONFIG.linkText}</HomeLink>
    </NotFoundWrapper>
  );
}
