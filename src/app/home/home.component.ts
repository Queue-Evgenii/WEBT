import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient) { };
  ProductsByCategory1: Product[] = [];
  ProductsByCategory2: Product[] = [];
  ProductsByCategory3: Product[] = [];
  ngOnInit(): void {
    this.getProductsByCatId(1, this.ProductsByCategory1);
    this.getProductsByCatId(2, this.ProductsByCategory2);
    this.getProductsByCatId(3, this.ProductsByCategory3);
  };
  getProductsByCatId(id: number, array: Product[]): void {
    this.http.get(`http://localhost/phpdb/webt/api/products?category_id=${id}&per_page=4`)
      .subscribe((data) => {
        for (const item of Object.values(data)) {
          data = item;
        }
        if (data !== null) {
          array.length = 0;
          array.push(...(data as Product[]));
        }
      });
  }
}