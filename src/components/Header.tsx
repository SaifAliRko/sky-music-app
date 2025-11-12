import dynamic from "next/dynamic";
import Link from "next/link";
import { HeaderWrapper, LogoContainer } from "./Header.styles";

// Dynamically import Image component with SSR disabled to avoid hydration issues
const DynamicImage = dynamic(() => import("next/image"), { ssr: false });

export function Header() {
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
    </HeaderWrapper>
  );
}
