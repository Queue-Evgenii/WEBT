import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { headers } from '../http/headers';
import { User } from 'src/models/user.model';
import { CartProduct, CartItem } from 'src/models/product.model';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: [
    './me.component.css',
    '../account/account.component.css',
  ]
})
export class MeComponent {
  constructor(private http: HttpClient) {
    this.http.get('http://localhost/phpdb/webt/api/me', {headers: headers()})
      .subscribe((data) => {
        const user = Object.assign(data).data;
        localStorage.removeItem("token");
        localStorage.setItem("token", JSON.stringify(user.token))
        this.isAdmin = user.admin;
        this.user = new User(user.username, user.email, '');
      });
    this.getCartItems();
    if (this.cartItems.length > 0) return;
    this.http.get(`http://localhost/phpdb/webt/api/cart`, { headers: headers()})
      .subscribe(res => {
        const data = Object.assign(res).data;
        this.setCart(data)
        this.setCartItemsToLocalStorage(data);
      });
  }

  getCartItems() {
    const json = localStorage.getItem("cart_items") as string;
    this.cartItems = JSON.parse(json) || [];
  }

  setCart(res: CartProduct[]) {
    this.cartItems.length = 0;
    for (let i = 0; i < res.length; i++) {
      this.cartItems[i] = res[i];
    }
  }

  setCartItemsToLocalStorage(data: CartProduct[]) {
    localStorage.setItem("cart_items", JSON.stringify(data));
  }

  user : User = new User('', '', '');
  isAdmin: boolean = false;
  cartItems: CartProduct[] = [];

}
