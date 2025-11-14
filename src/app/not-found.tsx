"use client";

import {
  ErrorCode,
  ErrorMessage,
  ErrorTitle,
  HomeLink,
  NotFoundWrapper,
} from "./not-found.styles";

export default function NotFound() {
  return (
    <NotFoundWrapper>
      <ErrorCode>404</ErrorCode>
      <ErrorTitle>Page Not Found</ErrorTitle>
      <ErrorMessage>
        Oops! The page you&apos;re looking for doesn&apos;t exist. It might have been
        moved or deleted.
      </ErrorMessage>
      <HomeLink href="/albums">🎵 Browse Albums</HomeLink>
    </NotFoundWrapper>
  );
}
