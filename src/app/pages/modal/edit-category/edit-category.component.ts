import { CategoryService } from 'src/app/shared/services/category.service';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Category } from 'src/app/shared/utils/category';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { getCategoryStart } from 'src/app/shared/store/category/category.actions';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
})
export class EditCategoryComponent implements OnInit {
  @Output() closeModel = new EventEmitter();
  @Input() editDate: Category | undefined;

  isLoading: boolean = false;
  editCategoryForm!: FormGroup;
  fileData: any[] = [];
  logoImages: any;
  imageFile: any;

  constructor(
    private cd: ChangeDetectorRef,
    private categoryService: CategoryService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.editCategoryForm = new FormGroup({
      name: new FormControl(''),
    });
    setTimeout(() => {
      this.editCategoryForm.controls['name'].setValue(this.editDate?.name);
    }, 100);
  }

  filesChanged(event: any): void {
    this.imageFile = event?.target?.files[0];
    let reader = new FileReader();
    reader.onloadend = (e: any): void => {
      this.logoImages = e?.target?.result;
      this.cd.detectChanges();
    };
    reader.readAsDataURL(this.imageFile);
  }

  submitForm() {
    // this.isLoading = true;
    const updateDate: any = {
      name: this.editCategoryForm.value.name,
    };
    // if (this.imageFile) {
    //   updateDate['logo'] = this.imageFile;
    // }
    this.categoryService
      .updateCategory(this.editDate?.id, updateDate)
      .subscribe(
        (res: any) => {
          // this.isLoading = false;
          console.log('updateCategory:::::', res);
          this.store.dispatch(getCategoryStart());
          this.handleCancel();
        },
        (err) => {
          // this.isLoading = false;
          this.handleCancel();
        }
      );
  }

  handleCancel() {
    this.closeModel.emit();
  }
}
