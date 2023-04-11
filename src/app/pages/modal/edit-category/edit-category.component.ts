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
import {
  getCategoryStart,
  updateCategoryStart,
} from 'src/app/shared/store/category/category.actions';

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
      this.editCategoryForm.controls['name'].setValue(
        this.editDate?.alias_name
      );
      this.logoImages = this.editDate?.logos3;
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
    const formData = new FormData();
    formData.append('alias_name', this.editCategoryForm.value.name);
    if (this.imageFile) {
      formData.append('file', this.imageFile);
    }

    this.store.dispatch(
      updateCategoryStart({
        requestParams: this.editDate?.id,
        requestBody: formData,
      })
    );
    this.handleCancel();
  }

  handleCancel() {
    this.closeModel.emit();
  }
}
