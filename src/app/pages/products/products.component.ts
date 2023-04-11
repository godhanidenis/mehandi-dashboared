import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { AppState } from 'src/app/reducers';
import { ProductService } from 'src/app/shared/services/product.service';
import { categorySelectors } from 'src/app/shared/store/category/category.selectors';
import {
  getAllProductStart,
  getProductStart,
} from 'src/app/shared/store/product/product.actions';
import { productSelectors } from 'src/app/shared/store/product/product.selectors';
import { Category, Response } from 'src/app/shared/utils/category';
import { Products } from 'src/app/shared/utils/products';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  listOfProduct: Products[] = [];
  listOfDisplayProduct = [...this.listOfProduct];
  isLoading: boolean = false;
  total = 1;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions = [6, 12, 18, 24];
  editCategory: boolean = false;
  confirmModal?: NzModalRef;
  listOfCategory: Category[] = [];
  listOfCategoryData = [...this.listOfCategory];
  searchValue: number = 0;

  constructor(
    private modal: NzModalService,
    private store: Store<AppState>,
    private productService: ProductService
  ) {
    store.select(categorySelectors).subscribe((res: Response) => {
      if (!res.errorMessage) {
        if (!res.isLoading) {
          this.listOfCategory = res?.data?.results;
          this.listOfCategoryData = [...this.listOfCategory];
        }
      }
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.store.select(productSelectors).subscribe((res: any) => {
      this.isLoading = res.isLoading;
      this.pageSize = res?.filter?.page_size;
      this.pageIndex = res?.filter?.page;
      this.searchValue = res?.filter?.filter;
      this.total = res?.data?.count;
      if (!res.errorMessage) {
        if (!res.isLoading) {
          this.listOfProduct = res?.data?.results;
          this.listOfDisplayProduct = [...this.listOfProduct];
        }
      }
    });
  }

  pageIndexChange(params: number): void {
    this.pageIndex = params;
    this.dispatchFunction(this.searchValue);
  }

  pageSizeChange(params: number): void {
    this.pageSize = params;
    this.dispatchFunction(this.searchValue);
  }

  filterFunction() {
    this.pageIndex = 1;
    this.dispatchFunction(this.searchValue);
  }

  deleteImage(data: any) {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Do you Want to delete these items?',
      nzContent: 'When clicked the OK button, this item was delete.',
      nzOnOk: async () =>
        await new Promise<void>((resolve, reject) => {
          this.productService.deleteProduct(data?.id).subscribe((res: any) => {
            resolve();
            this.dispatchFunction(this.searchValue);
          });
        }).catch(() => {
          console.log('Oops errors!');
        }),
    });
  }

  dispatchFunction(id: number) {
    if (id === 0) {
      this.store.dispatch(
        getAllProductStart({
          payload: {
            page: this.pageIndex,
            page_size: this.pageSize,
            filter: id,
          },
        })
      );
    } else {
      this.store.dispatch(
        getProductStart({
          payload: {
            category_id: id,
            page: this.pageIndex,
            page_size: this.pageSize,
            filter: id,
          },
        })
      );
    }
  }
}
