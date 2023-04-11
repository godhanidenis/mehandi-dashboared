import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { AppState } from 'src/app/reducers';
import { CategoryService } from 'src/app/shared/services/category.service';
import { getCategoryStart } from 'src/app/shared/store/category/category.actions';
import { categorySelectors } from 'src/app/shared/store/category/category.selectors';
import { Category, Response } from 'src/app/shared/utils/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  listOfData: Category[] = [];
  listOfDisplayData = [...this.listOfData];
  isLoading: boolean = false;
  total = 1;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions = [5, 10, 15, 20];
  editCategory: boolean = false;
  confirmModal?: NzModalRef;
  editDate: Category | undefined;

  constructor(
    private modal: NzModalService,
    private store: Store<AppState>,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadCategory();
  }

  pageSizeChange(params: number): void {
    this.pageSize = params;
    this.getRequest();
  }

  pageIndexChange(params: number): void {
    this.pageIndex = params;
    this.getRequest();
  }

  loadCategory() {
    this.store.select(categorySelectors).subscribe((res: Response) => {
      console.log('getAllCategories:::', res);
      this.isLoading = res.isLoading;
      this.pageIndex = res?.filter?.page ? res?.filter?.page : 1;
      this.pageSize = res?.filter?.page_size ? res?.filter?.page_size : 10;
      this.total = res?.data?.count;
      if (!res.errorMessage) {
        if (!res.isLoading) {
          this.listOfData = res?.data?.results;
          this.listOfDisplayData = [...this.listOfData];
        }
      }
    });
  }

  dataAction(actionType: string, record: Category) {
    if (actionType === 'edit') {
      this.editDate = record;
      this.editCategory = true;
    } else {
      this.confirmModal = this.modal.confirm({
        nzTitle: 'Do you Want to delete these items?',
        nzContent: 'When clicked the OK button, this item was delete.',
        nzOnOk: async () =>
          await new Promise<void>((resolve, reject) => {
            resolve();
            this.categoryService
              .deleteCategory(record?.id)
              .subscribe((res: any) => {
                console.log('deleteCategory::::', res);
                this.getRequest();
              });
          }).catch(() => console.log('Oops errors!')),
      });
    }
  }

  getRequest() {
    this.store.dispatch(
      getCategoryStart({
        payload: {
          page: this.pageIndex,
          page_size: this.pageSize,
        },
      })
    );
  }

  handleCancel() {
    this.editCategory = false;
  }
}
