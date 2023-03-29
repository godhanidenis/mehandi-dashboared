import { ActionReducerMap } from '@ngrx/store';
import * as fromCategory from '../shared/store/category/category.reducer';
import * as fromProduct from '../shared/store/product/product.reducer';

export interface AppState {
  category: fromCategory.CategoryState;
  product: fromProduct.ProductState;
}

export const reducers: ActionReducerMap<AppState> = {
  category: fromCategory.reducer,
  product: fromProduct.reducer,
};
