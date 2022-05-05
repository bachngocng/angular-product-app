import { Component, OnInit } from '@angular/core';
import {Product} from '../../model/product';
import {Category} from '../../model/category';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../service/product/product.service';
import {CategoryService} from '../../service/category/category.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  product: Product = {};
  categories: Category[] = [];
  // image: File;
  productForm: FormGroup = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    image: new FormControl(''),
    price: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    category: new FormControl('')
  });

  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('id');
      this.getProductById(id);
    })
  }

  get nameControl() {
    return this.productForm.get('name');
  }

  get idControl() {
    return this.productForm.get('id');
  }

  get priceControl() {
    return this.productForm.get('price');
  }

  get descriptionControl() {
    return this.productForm.get('description');
  }

  get imageControl(){
    return this.productForm.get('image');
  }

  get categoryControl() {
    return this.productForm.get('category');
  }

  getProductById(id) {
    this.productService.getProductById(id).subscribe(productBE => {
      this.product = productBE;
      this.idControl.setValue(this.product.id);
      this.nameControl.setValue(this.product.name);
      this.imageControl.setValue(this.product.image)
      this.priceControl.setValue(this.product.price);
      this.descriptionControl.setValue(this.product.description);
      this.categoryControl.setValue(this.product.category);
    });
  }

  getAllCategory() {
    this.categoryService.getAll().subscribe((categoriesBE) => {
      this.categories = categoriesBE;
    });
  }

  ngOnInit() {
    this.getAllCategory();
  }

  submit() {
    let product = this.productForm.value;
    const formData: any = new FormData();
    formData.append('name',this.product.name);
    formData.append('image', (<HTMLInputElement> document.getElementById('image')).files[0]);
    formData.append('price',this.product.price);
    formData.append('description',this.product.description);
    formData.append('category',this.product.category.id);
    this.productService.editProduct(this.product.id, formData).subscribe(() => {
      alert('edit successfully');
      this.router.navigateByUrl('/products');
    });
  }


  // handleImageFile(event){
  //   this.image = event.target.files[0];
  // }
}
