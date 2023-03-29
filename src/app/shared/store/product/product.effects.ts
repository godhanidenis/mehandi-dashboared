import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import * as fromUsers from './product.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductService } from '../../services/product.service';

@Injectable()
export class ProductEffects {
  // GET User Type Effect
  getProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUsers.getProductStart),
      switchMap(() =>
        this.productService.getAllProduct().pipe(
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
