import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/reducers';

const categoryState = (state: AppState) => state.category;

export const categorySelectors = createSelector(
  categoryState,
  (state) => state
);
