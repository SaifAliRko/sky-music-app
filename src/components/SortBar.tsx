'use client';

import type { RootState } from '@/store';
import { setSortBy } from '@/store/slices/uiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Label, Select, SelectGroup, SortWrapper } from './SortBar.styles';

export function SortBar() {
  const dispatch = useDispatch();
  const sortBy = useSelector((state: RootState) => state.ui.sortBy);

  return (
    <SortWrapper>
      <SelectGroup>
        <Label htmlFor="sort">Sort by:</Label>
        <Select
          id="sort"
          value={sortBy}
          onChange={(e) =>
            dispatch(setSortBy(e.target.value as 'name' | 'artist' | 'genre'))
          }
        >
          <option value="name">Album Name</option>
          <option value="artist">Artist Name</option>
          <option value="genre">Genre</option>
        </Select>
      </SelectGroup>
    </SortWrapper>
  );
}
