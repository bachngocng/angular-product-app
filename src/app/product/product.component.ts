import { Component, OnInit } from '@angular/core';
import {Product} from '../model/product';
import {ProductService} from '../service/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
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
