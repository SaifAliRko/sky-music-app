import type { RootState } from "@/store";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  FavoriteBadge,
  FavoritesText,
  HeaderWrapper,
  LogoContainer,
  Nav,
  NavLink,
  ThemeToggleButton,
} from "./Header.styles";
/* eslint-disable react-hooks/set-state-in-effect */

// Dynamically import Image component with SSR disabled to avoid hydration issues
const DynamicImage = dynamic(() => import("next/image"), { ssr: false });

export function Header() {
  const [isDark, setIsDark] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const favoriteIds = useSelector((state: RootState) => state.favorites.ids);

  useEffect(() => {
    setIsMounted(true);
    const currentTheme = localStorage.getItem("sky_music_theme") || "light";
    setIsDark(currentTheme === "dark");

    const handleStorageChange = () => {
      const theme = localStorage.getItem("sky_music_theme") || "light";
      setIsDark(theme === "dark");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const toggleTheme = () => {
    const currentTheme = localStorage.getItem("sky_music_theme") || "light";
    const newTheme = currentTheme === "light" ? "dark" : "light";
    localStorage.setItem("sky_music_theme", newTheme);
    setIsDark(newTheme === "dark");
    // Trigger storage event to update all listeners
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <HeaderWrapper>
      <Link href="/albums" title="Go to Albums">
        <LogoContainer>
          <DynamicImage
            src="/sky-logo.png"
            alt="Sky Music Logo"
            width={70}
            height={40}
            style={{ objectFit: "contain" }}
          />
        </LogoContainer>
      </Link>
      <Nav>
        <NavLink href="/favorites" title="View your favorite albums">
          ❤️ <FavoritesText>Favorites</FavoritesText>
          {isMounted && favoriteIds.length > 0 && (
            <FavoriteBadge>{favoriteIds.length}</FavoriteBadge>
          )}
        </NavLink>
        <ThemeToggleButton
          onClick={toggleTheme}
          $isDark={isDark}
          title="Toggle dark/light mode"
        >
          <span />
        </ThemeToggleButton>
      </Nav>
    </HeaderWrapper>
  );
}
