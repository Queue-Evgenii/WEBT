import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartItem, Commodity } from 'src/models/product.model';
import { headers } from '../http/headers';

@Component({
  selector: 'app-commodity',
  templateUrl: './commodity.component.html',
  styleUrls: ['./commodity.component.css']
})
export class CommodityComponent {

  productId: number | undefined;
  product: Commodity;
  quantity: number = 1;
  message: string;

  constructor(private activateRoute: ActivatedRoute, private http: HttpClient){
      this.activateRoute.params.subscribe(params => this.productId = params['id']);
      this.http.get(`http://localhost/phpdb/webt/api/product?product_id=${this.productId}`)
        .subscribe(res => {
          this.product = Object.assign(res).data;
        });
      this.http.get(`http://localhost/phpdb/webt/api/cart?product_id=${this.productId}`, { headers: headers()})
        .subscribe(res => {
          const item = Object.assign(res).data;
          this.quantity = item.length > 0 ? item[0].quantity : 1;
        });
  };

  decrement() {
    if (this.quantity <= 1) return;
    this.quantity--;
  };

  increment() {
    if (this.quantity >= this.product.stock) return;
    this.quantity++;
  };

  addToCart() {
    const data : CartItem = {
      id: Number(this.productId),
      quantity: this.quantity,
    }
    this.addToCartRequest(data);
  };

  setCartItemsToLocalStorage(data: CartItem[]) {
    localStorage.setItem("cart_items", JSON.stringify(data));
  }

  addToCartRequest(data: CartItem) {
    this.http.post(`http://localhost/phpdb/webt/api/cart`, data, {
      headers: headers(),
    })
      .subscribe(res => {
        const data :CartItem[] = [];
        for (let i = 0; i < Object.assign(res).data.length; i++) {
          data[i] = Object.assign(res).data[i];
        }
        this.setCartItemsToLocalStorage(data)
        this.showMessageBox();
      },
      err => {
        this.showErrorBox();
      });
  }

  showMessageBox() {
    this.message = "success";
    const box = document.querySelector(".message-box")
    box?.classList.add("_active");
    setTimeout(() => {
      box?.classList.remove("_active");
    }, 1000);
  }
  showErrorBox() {
    const box = document.querySelector(".error-box")
    box?.classList.add("_active");
  }
}
