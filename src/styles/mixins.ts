import { css } from "styled-components";

export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const flexBetween = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const flexColumn = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const truncate = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const lineClamp = (lines: number) => css`
  display: -webkit-box;
  -webkit-line-clamp: ${lines};
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const shadowSmall = css`
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

export const shadowMedium = css`
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

export const shadowLarge = css`
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

export const transitionSmooth = css`
  transition: all 0.3s ease-in-out;
`;

export const transitionFast = css`
  transition: all 0.15s ease-in-out;
`;

export const focusRing = css`
  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
`;
