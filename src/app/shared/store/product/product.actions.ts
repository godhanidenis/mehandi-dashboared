import { createAction, props } from '@ngrx/store';

//! GET All Product
export const getAllProductStart = createAction(
  '[GET All Product] Start',
  props<{ payload: any }>()
);
export const getAllProductSuccess = createAction(
  '[GET All Product] Success',
  props<{ payload: any }>()
);
export const getAllProductFail = createAction(
  '[GET All Product] Fail',
  props<{ errorMessage: string }>()
);

//! GET Product
export const getProductStart = createAction(
  '[GET Product] Start',
  props<{ payload: any }>()
);
export const getProductSuccess = createAction(
  '[GET Product] Success',
  props<{ payload: any }>()
);
export const getProductFail = createAction(
  '[GET Product] Fail',
  props<{ errorMessage: string }>()
);
