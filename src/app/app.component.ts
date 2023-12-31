import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartProduct } from 'src/models/product.model';
import { headers } from './http/headers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'webt-proj';
  year: string = (new Date).getFullYear().toString();
  isMenuOpen = false;

  constructor(private http: HttpClient) {
    this.http.get(`http://localhost/phpdb/webt/api/cart`, { headers: headers()})
        .subscribe(res => {
          const data :CartProduct[] = [];
          for (let i = 0; i < Object.assign(res).data.length; i++) {
            data[i] = Object.assign(res).data[i];
          }
          this.setCartItemsToLocalStorage(data);
        });
  }

  setCartItemsToLocalStorage(data: CartProduct[]) {
    localStorage.setItem("cart_items", JSON.stringify(data));
  }

  toggleBurger() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeBurger() {
    this.isMenuOpen = false;
  }
}
