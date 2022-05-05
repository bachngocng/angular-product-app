import { Component, OnInit } from '@angular/core';
import {Category} from '../../model/category';
import {FormControl, FormGroup} from '@angular/forms';
import {CategoryService} from '../../service/category/category.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {
  category: Category = {};
  categoryForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
  }) ;
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
  }

  createCategory(categoryForm) {
    if(this.categoryForm.valid) {
      this.categoryService.createCategory(categoryForm.value).subscribe((categoryBE) => {
        this.category = categoryBE;
      });
      alert('tạo thành công!');
      this.categoryForm.reset();
    } else {
      alert('xảy ra lỗi');
    }
  }
}
