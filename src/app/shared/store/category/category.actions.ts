import { createAction, props } from '@ngrx/store';

//! GET Category
export const getCategoryStart = createAction('[GET Category] Start');
export const getCategorySuccess = createAction(
  '[GET Category] Success',
  props<{ payload: any }>()
);
export const getCategoryFail = createAction(
  '[GET Category] Fail',
  props<{ errorMessage: string }>()
);
