"use client";

import type { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import {
  ClearButton,
  InputWrapper,
  SearchInput,
  SearchWrapper,
} from "./SearchBar.styles";

export function SearchBar() {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.ui.searchQuery);

  return (
    <SearchWrapper>
      <InputWrapper>
        <SearchInput
          type="text"
          placeholder="Search albums by name, artist..."
          value={searchQuery}
          onChange={() => {}}
        />
        {searchQuery && <ClearButton onClick={() => {}}>✕</ClearButton>}
      </InputWrapper>
    </SearchWrapper>
  );
}
