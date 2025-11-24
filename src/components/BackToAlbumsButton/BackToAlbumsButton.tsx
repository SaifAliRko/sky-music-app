import Image from 'next/image';
import { HeaderButton } from './BackToAlbumsButton.styles';

export function BackToAlbumsButton() {
  return (
    <HeaderButton href="/albums" title="Back to Albums">
      <Image src="/return-button.png" alt="Back" width={30} height={30} />
      Back to Albums
    </HeaderButton>
  );
}
