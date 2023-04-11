import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import * as fromCategory from './category.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryService } from '../../services/category.service';

@Injectable()
export class CategoryEffects {
  // GET User Type Effect
  getCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCategory.getCategoryStart),
      switchMap(() =>
        this.categoryService.getAllCategory().pipe(
          map((res: any) =>
            fromCategory.getCategorySuccess({
              payload: res?.data?.results,
            })
          ),
          catchError((err: HttpErrorResponse) =>
            of(
              fromCategory.getCategoryFail({
                errorMessage: err.error.message,
              })
            )
          )
        )
      )
    )
  );

  // UPDATE Effect

  updateCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCategory.updateCategoryStart),
      switchMap(({ requestParams, requestBody }) =>
        this.categoryService.updateCategory(requestParams, requestBody).pipe(
          map((res: any) =>
            fromCategory.updateCategorySuccess({
              payload: res.data,
            })
          ),
          catchError((err: HttpErrorResponse) =>
            of(
              fromCategory.updateCategoryFail({
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
    private categoryService: CategoryService
  ) {}
}
