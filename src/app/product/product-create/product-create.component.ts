import {Component, OnInit} from '@angular/core';
import {Product} from '../../model/product';
import {Category} from '../../model/category';
import {FormControl, FormGroup} from '@angular/forms';
import {CategoryService} from '../../service/category/category.service';
import {Router} from '@angular/router';
import {ProductService} from '../../service/product/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  product: Product = {
    category: null
  };
  categories: Category[] = [];

  productForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    image: new FormControl(''),
    price: new FormControl(''),
    description: new FormControl(''),
    categoryId: new FormControl(''),
    category: new FormControl(''),
  })

  constructor(private productService: ProductService, private categoryService: CategoryService,
              private router: Router) {
  }

  ngOnInit() {
    this.getAllCategory();
  }

  createProduct() {
    const product = new FormData();
    product.append('name',this.productForm.value.name);
    product.append('category',this.productForm.value.category);
    product.append('price',this.productForm.value.price);
    product.append('image', (<HTMLInputElement> document.getElementById('image')).files[0]);
    product.append('description',this.productForm.value.description);
    if (this.productForm.valid) {
      this.productService.createProduct(product).subscribe(() => {
        alert('tạo mới thành công')
        this.router.navigateByUrl('/products');
      })
    }
  }

  getAllCategory()
  {
    this.categoryService.getAll().subscribe((categoriesBE) => {
      this.categories = categoriesBE;
    });
  }

  // createImage($event){
  //   this.selectedImage = $event.target.files[0];
  // }
}
