import type { RootState } from "@/store";
import { toggleTheme } from "@/store/slices/uiSlice";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  FavoriteBadge,
  FavoritesText,
  HeaderWrapper,
  LogoContainer,
  Nav,
  NavLink,
  ThemeToggleButton,
} from "./Header.styles";

// Dynamically import Image component with SSR disabled to avoid hydration issues
const DynamicImage = dynamic(() => import("next/image"), { ssr: false });

export function Header() {
  const dispatch = useDispatch();
  const isDark = useSelector((state: RootState) => state.ui.theme === "dark");
  const favoriteIds = useSelector((state: RootState) => state.favorites.ids);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
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
          {favoriteIds.length > 0 && (
            <FavoriteBadge>{favoriteIds.length}</FavoriteBadge>
          )}
        </NavLink>
        <ThemeToggleButton
          onClick={() => dispatch(toggleTheme())}
          $isDark={isDark}
          title="Toggle dark/light mode"
        >
          <span />
        </ThemeToggleButton>
      </Nav>
    </HeaderWrapper>
  );
}
