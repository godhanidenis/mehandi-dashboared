import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './reducers';
import { getCategoryStart } from './shared/store/category/category.actions';
import { getAllProductStart } from './shared/store/product/product.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isCollapsed = false;

  constructor(private store: Store<AppState>) {
    store.dispatch(
      getCategoryStart({
        payload: {
          page: 1,
          page_size: 10,
        },
      })
    );
    store.dispatch(
      getAllProductStart({
        payload: {
          page: 1,
          page_size: 12,
          filter: 0,
        },
      })
    );
  }
}
