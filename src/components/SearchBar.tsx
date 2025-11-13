'use client';

import type { RootState } from '@/store';
import { setSearchQuery } from '@/store/slices/uiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ClearButton, InputWrapper, SearchInput, SearchWrapper } from './SearchBar.styles';

export function SearchBar() {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.ui.searchQuery);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleClear = () => {
    dispatch(setSearchQuery(''));
  };

  return (
    <SearchWrapper>
      <InputWrapper>
        <SearchInput
          type="text"
          placeholder="Search albums by name, artist..."
          value={searchQuery}
          onChange={handleChange}
        />
        {searchQuery && <ClearButton onClick={handleClear}>✕</ClearButton>}
      </InputWrapper>
    </SearchWrapper>
  );
}
