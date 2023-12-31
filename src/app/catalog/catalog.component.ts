import { Component } from '@angular/core';
import { Product } from 'src/models/product.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css', '../home/home.component.css']
})
export class CatalogComponent {
  products: Product[] = [];
  categoryId: number = 0;
  title: string;

  constructor(private activateRoute: ActivatedRoute, private http: HttpClient) {
    this.activateRoute.params.subscribe(params => {
      this.categoryId = params['id'];
      this.getProducts();
    });
    
  };
  getProducts() {
    const link = this.getLink();
    this.http.get(link)
      .subscribe(res => {
        this.products = Object.assign(res).data;
        this.title = (this.categoryId != 0 && this.products[0]) ? this.products[0].category_name : "All products";
      });
  };
  getLink() : string {
    let link = "http://localhost/phpdb/webt/api/products";
    if (this.categoryId != 0) {
      link = `http://localhost/phpdb/webt/api/products?category_id=${this.categoryId}`;
    }
    return link;
  };
}
