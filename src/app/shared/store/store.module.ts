import { ProductEffects } from './product/product.effects';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { CategoryEffects } from './category/category.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EffectsModule.forFeature([CategoryEffects, ProductEffects]),
  ],
})
export class StoresModule {}
