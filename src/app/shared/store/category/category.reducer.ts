/** @format */

import { Action, createReducer, on } from '@ngrx/store';

import * as fromUsers from './category.actions';

export interface CategoryState {
  data: any;
  errorMessage: string;
  isLoading: boolean;
}

const initialProfileState: CategoryState = {
  data: [],
  errorMessage: '',
  isLoading: false,
};

export const CategoryReducer = createReducer(
  initialProfileState,

  // ! GET User Type
  on(fromUsers.getCategoryStart, (state: any) => ({
    ...state,
    isLoading: true,
    errorMessage: null,
  })),
  on(fromUsers.getCategorySuccess, (state: any, { payload }) => ({
    ...state,
    isLoading: false,
    errorMessage: null,
    data: payload,
  })),
  on(fromUsers.getCategoryFail, (state: any, { errorMessage }) => ({
    ...state,
    isLoading: false,
    errorMessage: errorMessage,
  }))
);

export function reducer(state: any | undefined, action: Action) {
  return CategoryReducer(state, action);
}
