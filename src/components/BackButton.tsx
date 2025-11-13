import { HeaderButton } from "@/app/favorites/favorites.styles";
import Image from "next/image";
export default function BackButton() {
  return (
    <HeaderButton href="/albums" title="Back to Albums">
      <Image src="/return-button.png" alt="Back" width={30} height={30} />
      Back to Albums
    </HeaderButton>
  );
}
