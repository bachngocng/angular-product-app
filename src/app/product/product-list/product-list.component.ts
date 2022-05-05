import { Component, OnInit } from '@angular/core';
import {Product} from '../../model/product';
import {ProductService} from '../../service/product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {
  }

  getAllProduct() {
    this.productService.getAll().subscribe((productsFromBE) => {
      this.products = productsFromBE;
    }, error => {
      console.log(error);
    });
  }

  ngOnInit() {
    this.getAllProduct()  ;
  }
}
