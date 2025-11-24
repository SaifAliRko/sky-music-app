import type { AppDispatch } from '@/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

/**
 * Custom hook to fetch data once on mount
 * Prevents unnecessary re-fetches using the hasLoaded flag
 */
export const useFetchOnMount = (
  hasLoaded: boolean,
  fetchAction: any
) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!hasLoaded) {
      dispatch(fetchAction());
    }
  }, [dispatch, hasLoaded, fetchAction]);
};
