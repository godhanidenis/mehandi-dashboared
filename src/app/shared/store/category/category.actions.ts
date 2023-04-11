import { createAction, props } from '@ngrx/store';

//! GET Category
export const getCategoryStart = createAction(
  '[GET Category] Start',
  props<{ payload: any }>()
);
export const getCategorySuccess = createAction(
  '[GET Category] Success',
  props<{ payload: any }>()
);
export const getCategoryFail = createAction(
  '[GET Category] Fail',
  props<{ errorMessage: string }>()
);

//! EDIT Category
export const updateCategoryStart = createAction(
  '[EDIT Category] Start',
  props<{
    requestParams: any;
    requestBody: any;
  }>()
);
export const updateCategorySuccess = createAction(
  '[EDIT Category] Success',
  props<{ payload: any }>()
);
export const updateCategoryFail = createAction(
  '[EDIT Category] Fail',
  props<{ errorMessage: string }>()
);
