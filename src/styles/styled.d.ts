import type { Theme } from "@/styles/theme";
import "styled-components";

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface DefaultTheme extends Theme {}
}
