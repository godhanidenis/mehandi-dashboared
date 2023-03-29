/** @format */

import { Action, createReducer, on } from '@ngrx/store';

import * as fromUsers from './product.actions';

export interface ProductState {
  data: any;
  errorMessage: string;
  isLoading: boolean;
}

const initialProfileState: ProductState = {
  data: [],
  errorMessage: '',
  isLoading: false,
};

export const ProductReducer = createReducer(
  initialProfileState,

  // ! GET User Type
  on(fromUsers.getProductStart, (state: any) => ({
    ...state,
    isLoading: true,
    errorMessage: null,
  })),
  on(fromUsers.getProductSuccess, (state: any, { payload }) => ({
    ...state,
    isLoading: false,
    errorMessage: null,
    data: payload,
  })),
  on(fromUsers.getProductFail, (state: any, { errorMessage }) => ({
    ...state,
    isLoading: false,
    errorMessage: errorMessage,
  }))
);

export function reducer(state: any | undefined, action: Action) {
  return ProductReducer(state, action);
}
