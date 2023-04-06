import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import * as fromUsers from './product.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductService } from '../../services/product.service';

@Injectable()
export class ProductEffects {
  // GETAll User Type Effect
  getAllProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUsers.getAllProductStart),
      switchMap((action) =>
        this.productService.getAllProduct(action.payload).pipe(
          map((res: any) =>
            fromUsers.getAllProductSuccess({
              payload: res?.data?.results,
            })
          ),
          catchError((err: HttpErrorResponse) =>
            of(
              fromUsers.getAllProductFail({
                errorMessage: err.error.message,
              })
            )
          )
        )
      )
    )
  );

  getProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUsers.getProductStart),
      switchMap((action) =>
        this.productService.getProduct(action.payload).pipe(
          map((res: any) =>
            fromUsers.getProductSuccess({
              payload: res?.data?.results,
            })
          ),
          catchError((err: HttpErrorResponse) =>
            of(
              fromUsers.getProductFail({
                errorMessage: err.error.message,
              })
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}
}
