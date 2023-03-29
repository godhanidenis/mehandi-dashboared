import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import * as fromUsers from './category.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryService } from '../../services/category.service';

@Injectable()
export class CategoryEffects {
  // GET User Type Effect
  getCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUsers.getCategoryStart),
      switchMap(() =>
        this.categoryService.getAllCategory().pipe(
          map((res: any) =>
            fromUsers.getCategorySuccess({
              payload: res?.data?.results,
            })
          ),
          catchError((err: HttpErrorResponse) =>
            of(
              fromUsers.getCategoryFail({
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
