/** @format */

import { Action, createReducer, on } from '@ngrx/store';

import * as fromCategory from './category.actions';

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
  on(fromCategory.getCategoryStart, (state: any, { payload }) => ({
    filter: { ...state.filter, ...payload },
    ...state,
    isLoading: true,
    errorMessage: null,
  })),
  on(fromCategory.getCategorySuccess, (state: any, { payload }) => ({
    ...state,
    isLoading: false,
    errorMessage: null,
    data: payload,
  })),
  on(fromCategory.getCategoryFail, (state: any, { errorMessage }) => ({
    ...state,
    isLoading: false,
    errorMessage: errorMessage,
  })),

  // ! Update
  on(fromCategory.updateCategoryStart, (state: CategoryState) => ({
    ...state,
    isLoading: true,
    errorMessage: '',
  })),
  on(
    fromCategory.updateCategorySuccess,
    (state: CategoryState, { payload }) => {
      const CategoryUpdated = [...state.data.results];
      const CategoryToUpdateIndex = CategoryUpdated?.findIndex(
        (el: any) => el.id === payload.id
      );
      CategoryUpdated[CategoryToUpdateIndex] = payload;
      const updatedDta = { ...state.data, results: CategoryUpdated };
      return {
        ...state,
        data: updatedDta,
        errorMessage: '',
        isLoading: false,
      };
    }
  ),
  on(
    fromCategory.updateCategoryFail,
    (state: CategoryState, { errorMessage }) => ({
      ...state,
      isLoading: false,
      errorMessage: errorMessage,
    })
  )
);

export function reducer(state: any | undefined, action: Action) {
  return CategoryReducer(state, action);
}
