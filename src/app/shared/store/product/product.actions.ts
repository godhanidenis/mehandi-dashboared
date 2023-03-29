import { createAction, props } from '@ngrx/store';

//! GET Product
export const getProductStart = createAction('[GET Product] Start');
export const getProductSuccess = createAction(
  '[GET Product] Success',
  props<{ payload: any }>()
);
export const getProductFail = createAction(
  '[GET Product] Fail',
  props<{ errorMessage: string }>()
);
