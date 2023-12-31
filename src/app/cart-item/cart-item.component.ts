import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartProduct, CartItem } from 'src/models/product.model';
import { headers } from '../http/headers';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css', '../me/me.component.css']
})
export class CartItemComponent {

  @Input() item: CartProduct;
  @Output() cartEvent = new EventEmitter<CartProduct[]>();


  constructor(private http: HttpClient) {}

  getQuantity() {
    return this.item.quantity;
  }

  removeItem() {
    const data : CartItem = {
      id: this.item.id,
      quantity: 0,
    }
    this.addToCartRequest(data);
  }

  addToCart() {
    const data : CartItem = {
      id: Number(this.item.id),
      quantity: this.item.quantity,
    }
    this.addToCartRequest(data);
  };

  decrement() {
    if (this.item.quantity <= 1) return;
    this.item.quantity--;
  };

  increment() {
    if (this.item.quantity >= this.item.stock) return;
    this.item.quantity++;
  };

  addToCartRequest(data: CartItem) {
    this.http.post(`http://localhost/phpdb/webt/api/cart`, data, {
      headers: headers(),
    })
      .subscribe(res => {
        const data :CartProduct[] = Object.assign(res).data;
        this.setCartItemsToLocalStorage(data)
        this.cartEvent.emit(data);
      });
  }

  setCartItemsToLocalStorage(data: CartItem[]) {
    localStorage.setItem("cart_items", JSON.stringify(data));
  }
}
