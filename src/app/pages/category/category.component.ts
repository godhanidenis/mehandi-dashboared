import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { AppState } from 'src/app/reducers';
import { CategoryService } from 'src/app/shared/services/category.service';
import { getCategoryStart } from 'src/app/shared/store/category/category.actions';
import { categorySelectors } from 'src/app/shared/store/category/category.selectors';
import { Category } from 'src/app/shared/utils/category';

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
  }

  pageIndexChange(params: number): void {
    this.pageIndex = params;
  }

  loadCategory() {
    this.store.select(categorySelectors).subscribe((res: any) => {
      // console.log('getAllCategories:::', res);
      this.isLoading = res.isLoading;
      // this.pageSize = res?.record;
      // this.pageIndex = res?.page;
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
                this.store.dispatch(getCategoryStart());
              });
          }).catch(() => console.log('Oops errors!')),
      });
    }
  }

  handleCancel() {
    this.editCategory = false;
  }
}
