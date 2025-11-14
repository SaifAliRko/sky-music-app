import { HeaderButton } from "@/app/favorites/styles/favorites.styles";
import Image from "next/image";

export function BackToAlbumsButton() {
  return (
    <HeaderButton href="/albums" title="Back to Albums">
      <Image src="/return-button.png" alt="Back" width={30} height={30} />
      Back to Albums
    </HeaderButton>
  );
}
