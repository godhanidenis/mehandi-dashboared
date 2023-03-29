import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/reducers';

const productState = (state: AppState) => state.product;

export const productSelectors = createSelector(productState, (state) => state);
