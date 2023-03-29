import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { AppState } from 'src/app/reducers';
import { ProductService } from 'src/app/shared/services/product.service';
import { productSelectors } from 'src/app/shared/store/product/product.selectors';
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
  pageSizeOptions = [5, 10, 15, 20];
  editCategory: boolean = false;
  confirmModal?: NzModalRef;

  constructor(private modal: NzModalService, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.store.select(productSelectors).subscribe((res: any) => {
      console.log('productSelectors:::', res);
      this.isLoading = res.isLoading;
      // this.pageSize = res?.record;
      // this.pageIndex = res?.page;
      if (!res.errorMessage) {
        if (!res.isLoading) {
          this.listOfProduct = res?.data?.results;
          this.listOfDisplayProduct = [...this.listOfProduct];
        }
      }
    });
  }

  deleteImage(data: any) {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Do you Want to delete these items?',
      nzContent: 'When clicked the OK button, this item was delete.',
      nzOnOk: async () =>
        await new Promise<void>((resolve, reject) => {}).catch(() =>
          console.log('Oops errors!')
        ),
    });
  }
}
